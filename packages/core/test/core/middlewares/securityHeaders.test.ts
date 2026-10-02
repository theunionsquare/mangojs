import { test } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import express from "express";
import { createSecurityHeaders } from "../../../dist/core/middlewares/securityHeaders.js";

function startServer(middleware: express.RequestHandler) {
  const app = express();
  app.use(middleware);
  app.get("/", (_req, res) => res.json({ ok: true }));
  app.get("/docs/", (_req, res) => res.send("<html></html>"));
  return app.listen(0);
}

async function get(port: number, path: string) {
  return fetch(`http://127.0.0.1:${port}${path}`);
}

test("createSecurityHeaders applies a strict CSP to API routes by default", async () => {
  const server = startServer(createSecurityHeaders());
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const response = await get(port, "/");
    assert.equal(response.headers.get("content-security-policy"), "default-src 'none';base-uri 'none';form-action 'none';frame-ancestors 'none'");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  } finally {
    server.close();
  }
});

test("createSecurityHeaders relaxes CSP under docsPath so Swagger UI can render", async () => {
  const server = startServer(createSecurityHeaders());
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const response = await get(port, "/docs/");
    const csp = response.headers.get("content-security-policy") ?? "";
    assert.ok(csp.includes("'unsafe-inline'"));
    assert.ok(!csp.includes("default-src 'none'"));
  } finally {
    server.close();
  }
});

test("createSecurityHeaders respects a custom docsPath", async () => {
  const server = startServer(createSecurityHeaders({ docsPath: "/swagger" }));
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    // /docs/ is no longer special — it gets the strict API policy.
    const docsResponse = await get(port, "/docs/");
    assert.ok(
      (docsResponse.headers.get("content-security-policy") ?? "").includes(
        "default-src 'none'",
      ),
    );
  } finally {
    server.close();
  }
});

test("createSecurityHeaders accepts raw helmet options and allows opting a branch out entirely", async () => {
  const server = startServer(
    createSecurityHeaders({
      api: { contentSecurityPolicy: { directives: { "default-src": ["'self'"] } } },
      docs: false,
    }),
  );
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const apiResponse = await get(port, "/");
    assert.ok(
      (apiResponse.headers.get("content-security-policy") ?? "").includes(
        "default-src 'self'",
      ),
    );

    const docsResponse = await get(port, "/docs/");
    assert.equal(docsResponse.headers.get("content-security-policy"), null);
  } finally {
    server.close();
  }
});

test("createSecurityHeaders merges a partial override over the defaults instead of replacing them", async () => {
  const server = startServer(
    createSecurityHeaders({
      api: { hsts: false },
    }),
  );
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const response = await get(port, "/");
    // The override only touched hsts — the default strict CSP must survive.
    assert.ok(
      (response.headers.get("content-security-policy") ?? "").includes(
        "default-src 'none'",
      ),
    );
    assert.equal(response.headers.get("strict-transport-security"), null);
  } finally {
    server.close();
  }
});
