import { test } from "node:test";
import assert from "node:assert/strict";
import {
  patternToRegex,
  userPermissionMatchesRequired,
  matchesPermissions,
} from "./permissions.utils.ts";

test("patternToRegex matches wildcard segments literally between separators", () => {
  assert.equal(patternToRegex("idm:user:*", ":").test("idm:user:read"), true);
  assert.equal(patternToRegex("idm:user:*", ":").test("idm:user:sub:read"), false);
  assert.equal(patternToRegex("idm:*:read", ":").test("idm:group:read"), true);
  assert.equal(patternToRegex("*", ":").test("idm:group:read"), false);
});

test("userPermissionMatchesRequired: granted wildcard covers a concrete required permission", () => {
  assert.equal(
    userPermissionMatchesRequired("idm:*:*", "idm:admins:read", ":"),
    true,
  );
  assert.equal(
    userPermissionMatchesRequired("idm:applications:*", "idm:applications:read", ":"),
    true,
  );
  assert.equal(
    userPermissionMatchesRequired("idm:users:*", "idm:admins:read", ":"),
    false,
  );
  assert.equal(
    userPermissionMatchesRequired("idm:admins:read", "idm:admins:read", ":"),
    true,
  );
});

test("matchesPermissions: concrete grant vs concrete requirement", () => {
  assert.equal(
    matchesPermissions(["idm:applications:read"], ["idm:applications:read"], ":"),
    true,
  );
  assert.equal(
    matchesPermissions(["idm:applications:read"], ["idm:tenants:read"], ":"),
    false,
  );
});

test("matchesPermissions: wildcard in the required pattern (decorator side) matches a concrete grant", () => {
  assert.equal(
    matchesPermissions(["idm:applications:read"], ["idm:applications:*"], ":"),
    true,
  );
});

test("matchesPermissions: wildcard in the granted permission (role side) matches a concrete requirement", () => {
  assert.equal(
    matchesPermissions(["idm:*:*"], ["idm:applications:read"], ":"),
    true,
  );
  assert.equal(
    matchesPermissions(["idm:applications:*"], ["idm:applications:read"], ":"),
    true,
  );
});

test("matchesPermissions: an unrelated wildcard grant does not leak into other resources", () => {
  assert.equal(
    matchesPermissions(["idm:applications:*"], ["idm:tenants:read"], ":"),
    false,
  );
});
