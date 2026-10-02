import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import express from "express";
import type { Request, Response } from "express";
// Imports the built output (not the TS source) - see rateLimit.test.ts for
// why. Run `pnpm build` before `pnpm test` (wired via `pretest`).
import { Audit } from "../../../dist/core/decorators/audit/audit.decorator.js";
import { AuditConfig } from "../../../dist/core/decorators/audit/auditConfig.js";
import type { AuditEvent } from "../../../dist/core/decorators/audit/auditConfig.js";

// Node's --experimental-strip-types only strips type annotations - it
// doesn't transform decorator syntax - so `@Audit(...)` sugar can't be used
// directly in this test file. Apply the decorator as a plain function
// instead (exactly what the `@Audit(...)` syntax desugars to at build time).
class TestController {
  async updateWidget(req: Request, res: Response) {
    return res.status(200).json({ ok: true, data: { uid: req.params.uid } });
  }

  async deleteMissingWidget(req: Request, res: Response) {
    return res.status(404).json({ ok: false, errorCode: "NOT_FOUND" });
  }

  async createWidget(req: Request, res: Response) {
    return res.status(201).json({ ok: true, data: { uid: "new-widget-1" } });
  }
}

function applyAudit(
  methodName: keyof TestController,
  options: Parameters<typeof Audit>[0],
) {
  const descriptor = Object.getOwnPropertyDescriptor(
    TestController.prototype,
    methodName,
  )!;
  const decorator = Audit(options) as (
    target: unknown,
    key: string,
    descriptor: PropertyDescriptor,
  ) => PropertyDescriptor;
  Object.defineProperty(
    TestController.prototype,
    methodName,
    decorator(TestController.prototype, methodName as string, descriptor),
  );
}

applyAudit("updateWidget", { action: "widget.updated", resource: "widget" });
applyAudit("deleteMissingWidget", {
  action: "widget.deleted",
  resource: "widget",
});
applyAudit("createWidget", {
  action: "widget.created",
  resource: "widget",
  resourceUidFromResponse: (body: unknown) =>
    (body as { data?: { uid?: string } })?.data?.uid ?? null,
});

function startServer() {
  const controller = new TestController();
  const app = express();
  app.use((req, _res, next) => {
    // Simulate the strategy-based auth context MangoJS attaches post-auth.
    (req as unknown as { authContext?: unknown }).authContext = {
      isAuthenticated: true,
      user: { id: "actor-1", userType: "ADMIN" },
    };
    next();
  });
  app.put("/widgets/:uid", (req, res) => controller.updateWidget(req, res));
  app.delete("/widgets/:uid", (req, res) =>
    controller.deleteMissingWidget(req, res),
  );
  app.post("/widgets", (req, res) => controller.createWidget(req, res));
  return app.listen(0);
}

afterEach(() => {
  AuditConfig.reset();
});

test("Audit fires the configured tracker with actor/resource/status after a successful handler", async () => {
  const events: AuditEvent[] = [];
  AuditConfig.configure({ onAudit: (event) => void events.push(event) });

  const server = startServer();
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    await fetch(`http://127.0.0.1:${port}/widgets/widget-42`, {
      method: "PUT",
    });

    assert.equal(events.length, 1);
    assert.deepEqual(events[0], {
      action: "widget.updated",
      resource: "widget",
      resourceUid: "widget-42",
      actorId: "actor-1",
      actorUserType: "ADMIN",
      statusCode: 200,
      status: "success",
      ipAddress: events[0].ipAddress,
      userAgent: events[0].userAgent,
      metadata: undefined,
    });
  } finally {
    server.close();
  }
});

test("Audit records status 'failure' when the handler sends a 4xx/5xx response", async () => {
  const events: AuditEvent[] = [];
  AuditConfig.configure({ onAudit: (event) => void events.push(event) });

  const server = startServer();
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    await fetch(`http://127.0.0.1:${port}/widgets/missing`, {
      method: "DELETE",
    });

    assert.equal(events.length, 1);
    assert.equal(events[0].status, "failure");
    assert.equal(events[0].statusCode, 404);
  } finally {
    server.close();
  }
});

test("Audit resolves resourceUid from the response body via resourceUidFromResponse", async () => {
  const events: AuditEvent[] = [];
  AuditConfig.configure({ onAudit: (event) => void events.push(event) });

  const server = startServer();
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    await fetch(`http://127.0.0.1:${port}/widgets`, { method: "POST" });

    assert.equal(events.length, 1);
    assert.equal(events[0].resourceUid, "new-widget-1");
    assert.equal(events[0].status, "success");
  } finally {
    server.close();
  }
});

test("Audit is a no-op (never throws, response unaffected) when no tracker is configured", async () => {
  const server = startServer();
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const response = await fetch(`http://127.0.0.1:${port}/widgets/widget-42`, {
      method: "PUT",
    });

    assert.equal(response.status, 200);
  } finally {
    server.close();
  }
});

test("Audit swallows a throwing tracker without affecting the response", async () => {
  AuditConfig.configure({
    onAudit: () => {
      throw new Error("boom");
    },
  });

  const server = startServer();
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;

    const response = await fetch(`http://127.0.0.1:${port}/widgets/widget-42`, {
      method: "PUT",
    });

    assert.equal(response.status, 200);
  } finally {
    server.close();
  }
});
