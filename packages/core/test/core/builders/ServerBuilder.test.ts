import { test } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import http from "node:http";
import { ServerBuilder } from "../../../dist/core/builders/ServerBuilder.js";

function listen(server: http.Server) {
  return new Promise<number>((resolve) => {
    server.listen(0, () => resolve((server.address() as AddressInfo).port));
  });
}

test("ServerBuilder applies strict security headers by default, with no setSecurityHeaders call", async () => {
  const builder = await new ServerBuilder()
    .expressUse((_req, res) => res.json({ ok: true }))
    .build();
  const server = http.createServer(builder.express!.instance);
  try {
    const port = await listen(server);
    const response = await fetch(`http://127.0.0.1:${port}/`);
    assert.ok(
      (response.headers.get("content-security-policy") ?? "").includes(
        "default-src 'none'",
      ),
    );
  } finally {
    server.close();
  }
});

test("ServerBuilder.setSecurityHeaders(false) disables headers entirely", async () => {
  const builder = await new ServerBuilder()
    .setSecurityHeaders(false)
    .expressUse((_req, res) => res.json({ ok: true }))
    .build();
  const server = http.createServer(builder.express!.instance);
  try {
    const port = await listen(server);
    const response = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(response.headers.get("content-security-policy"), null);
  } finally {
    server.close();
  }
});

test("ServerBuilder relaxes CSP for Swagger UI at /docs automatically", async () => {
  const builder = await new ServerBuilder()
    .enableSwagger(true)
    .setSwaggerSpec({ info: { title: "test", version: "1.0.0" } })
    .build();
  const server = http.createServer(builder.express!.instance);
  try {
    const port = await listen(server);
    const response = await fetch(`http://127.0.0.1:${port}/docs/`);
    const csp = response.headers.get("content-security-policy") ?? "";
    assert.ok(csp.includes("'unsafe-inline'"));
    assert.ok(!csp.includes("default-src 'none'"));
  } finally {
    server.close();
  }
});

test("ServerBuilder.setSecurityHeaders(options) overrides the default API policy", async () => {
  const builder = await new ServerBuilder()
    .setSecurityHeaders({
      api: { contentSecurityPolicy: { directives: { "default-src": ["'self'"] } } },
    })
    .expressUse((_req, res) => res.json({ ok: true }))
    .build();
  const server = http.createServer(builder.express!.instance);
  try {
    const port = await listen(server);
    const response = await fetch(`http://127.0.0.1:${port}/`);
    assert.ok(
      (response.headers.get("content-security-policy") ?? "").includes(
        "default-src 'self'",
      ),
    );
  } finally {
    server.close();
  }
});
