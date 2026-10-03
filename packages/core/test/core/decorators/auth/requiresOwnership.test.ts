import "reflect-metadata";
import { test } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import express from "express";
import type { Request, Response } from "express";
// Imports the built output (not the TS source) - see audit.test.ts for why.
// Run `pnpm build` before `pnpm test` (wired via `pretest`).
import { RequiresOwnership } from "../../../../dist/core/decorators/auth/requiresOwnership.decorator.js";
import { HasUserType } from "../../../../dist/core/decorators/auth/hasUserType.decorator.js";
import { OrAuth } from "../../../../dist/core/decorators/auth/orAuth.decorator.js";
import { MetadataKeys } from "../../../../dist/core/utils/metadata.keys.js";

class TestController {
  async getTenant(req: Request, res: Response) {
    return res.status(200).json({ ok: true, data: { uid: req.params.uid } });
  }

  async getOrgData(req: Request, res: Response) {
    return res
      .status(200)
      .json({ ok: true, data: { organizationId: req.params.organizationId } });
  }
}

// Node's --experimental-strip-types only strips type annotations - it
// doesn't transform decorator syntax - so `@RequiresOwnership(...)` sugar
// can't be used directly in this test file. Apply decorators as plain
// functions instead (exactly what the decorator syntax desugars to at
// build time). Application order mirrors source order bottom-to-top:
// RequiresOwnership first, then HasUserType, then OrAuth last.
function applyDecorators(
  methodName: keyof TestController,
  decorators: Array<
    (
      target: unknown,
      key: string,
      descriptor: PropertyDescriptor,
    ) => PropertyDescriptor | void
  >,
) {
  let descriptor = Object.getOwnPropertyDescriptor(
    TestController.prototype,
    methodName,
  )!;
  for (const decorator of decorators) {
    descriptor =
      decorator(TestController.prototype, methodName as string, descriptor) ||
      descriptor;
  }
  Object.defineProperty(TestController.prototype, methodName, descriptor);
}

applyDecorators("getTenant", [
  RequiresOwnership("tenant", {
    userField: "memberships",
    paramName: "uid",
    arrayKey: "tenant_id",
  }) as any,
  HasUserType(["ADMIN"]) as any,
  OrAuth() as any,
]);

applyDecorators("getOrgData", [
  RequiresOwnership("organization", {
    userField: "organizationIds",
  }) as any,
]);

function startServer(user: Record<string, unknown> | null) {
  const controller = new TestController();
  const app = express();
  app.use((req, _res, next) => {
    (req as unknown as { authContext?: unknown }).authContext = user
      ? { isAuthenticated: true, user }
      : { isAuthenticated: false, user: null };
    next();
  });
  // The @Controller/@Get decorators normally read this AUTHORIZATION
  // metadata during route registration and wire it as Express middleware.
  // We're bypassing @Controller here, so wire it manually for the test.
  const authMiddleware = (methodName: keyof TestController) =>
    Reflect.getMetadata(
      MetadataKeys.AUTHORIZATION,
      TestController.prototype,
      methodName,
    ) || [];

  app.get(
    "/tenants/:uid",
    ...authMiddleware("getTenant"),
    (req: Request, res: Response) => controller.getTenant(req, res),
  );
  app.get(
    "/orgs/:organizationId",
    ...authMiddleware("getOrgData"),
    (req: Request, res: Response) => controller.getOrgData(req, res),
  );
  return app.listen(0);
}

async function get(server: ReturnType<typeof startServer>, path: string) {
  await new Promise<void>((resolve) => {
    if (server.listening) return resolve();
    server.once("listening", resolve);
  });
  const { port } = server.address() as AddressInfo;
  return fetch(`http://127.0.0.1:${port}${path}`);
}

test("RequiresOwnership: array of membership objects - arrayKey matches on the right tenant", async () => {
  const server = startServer({
    id: "user-1",
    userType: "MEMBER",
    memberships: [{ tenant_id: "t1" }, { tenant_id: "t2" }],
  });
  try {
    const res = await get(server, "/tenants/t2");
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("RequiresOwnership: array of membership objects - denies a tenant the user doesn't belong to", async () => {
  const server = startServer({
    id: "user-1",
    userType: "MEMBER",
    memberships: [{ tenant_id: "t1" }, { tenant_id: "t2" }],
  });
  try {
    const res = await get(server, "/tenants/t3");
    assert.equal(res.status, 400); // AuthorizationError does not extend APIError, so errorHandler falls back to its generic 400 branch (pre-existing library behavior, unrelated to this change)
  } finally {
    server.close();
  }
});

test("RequiresOwnership: @OrAuth + @HasUserType lets a platform admin bypass ownership entirely", async () => {
  const server = startServer({
    id: "admin-1",
    userType: "ADMIN",
    memberships: [], // admin owns no tenants directly
  });
  try {
    const res = await get(server, "/tenants/any-other-tenant");
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("RequiresOwnership: plain array of scalar IDs still works with no arrayKey (auto-detected)", async () => {
  const server = startServer({
    id: "user-1",
    userType: "MEMBER",
    organizationIds: ["org-1", "org-2"],
  });
  try {
    const okRes = await get(server, "/orgs/org-2");
    assert.equal(okRes.status, 200);

    const deniedRes = await get(server, "/orgs/org-99");
    assert.equal(deniedRes.status, 400);
  } finally {
    server.close();
  }
});
