import { test } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import express from "express";
// Imports the built output (not the TS source) because this file has
// extensionless relative imports several levels deep (shared with the rest
// of the framework), which Node's native --experimental-strip-types/ESM
// loader can't resolve. Run `pnpm build` before `pnpm test` (wired via the
// `pretest` script) to keep this in sync.
import { createRateLimiter } from "../../../dist/core/middlewares/rateLimit.js";

function startServer(limiter: express.RequestHandler) {
  const app = express();
  app.use(express.json());
  app.post("/login", limiter, (_req, res) => {
    res.status(401).json({ ok: false, errorCode: "INVALID_CREDENTIALS" });
  });
  return app.listen(0);
}

test("createRateLimiter allows requests under the limit", async () => {
  const server = startServer(
    createRateLimiter({ windowMs: 60_000, limit: 5 }),
  );
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const response = await fetch(`http://127.0.0.1:${port}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "user@example.com" }),
    });

    assert.equal(response.status, 401);
  } finally {
    server.close();
  }
});

test("createRateLimiter returns a MangoJS-shaped 429 once the limit is exceeded", async () => {
  const server = startServer(
    createRateLimiter({
      windowMs: 60_000,
      limit: 3,
      skipSuccessfulRequests: true,
    }),
  );
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const statuses: number[] = [];
    let lastBody: unknown;
    for (let i = 0; i < 6; i++) {
      const response = await fetch(`http://127.0.0.1:${port}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "attacker@example.com" }),
      });
      statuses.push(response.status);
      lastBody = await response.json();
      if (response.status === 429) break;
    }

    assert.ok(statuses.includes(401));
    assert.equal(statuses.at(-1), 429);
    assert.equal((lastBody as { errorCode: string }).errorCode, "RATE_LIMIT_EXCEEDED");
    assert.equal((lastBody as { ok: boolean }).ok, false);
  } finally {
    server.close();
  }
});

test("createRateLimiter respects a custom keyGenerator (per-account bucket, not just per-IP)", async () => {
  const limiter = createRateLimiter({
    windowMs: 60_000,
    limit: 1,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => `${req.ip}:${(req.body as { email?: string })?.email}`,
  });
  const server = startServer(limiter);
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const requestFor = (email: string) =>
      fetch(`http://127.0.0.1:${port}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

    // First account burns its single-request budget.
    const first = await requestFor("alice@example.com");
    assert.equal(first.status, 401);
    const second = await requestFor("alice@example.com");
    assert.equal(second.status, 429);

    // A different account from the same IP is a different bucket.
    const third = await requestFor("bob@example.com");
    assert.equal(third.status, 401);
  } finally {
    server.close();
  }
});
