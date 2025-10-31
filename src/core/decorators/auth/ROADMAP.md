# Authorization Decorators - Development Roadmap

## Table of Contents
1. [Overview](#overview)
2. [Current State](#current-state)
3. [Completed Implementations](#completed-implementations)
4. [Future Improvements](#future-improvements)
5. [Implementation Phases](#implementation-phases)
6. [Technical Details](#technical-details)

---

## Overview

This document outlines the current state and future development roadmap for the MangoJS authorization decorator system. It serves as a guide for future development sessions and AI-assisted implementations.

**Last Updated:** 2025-10-31
**Current Version:** Phase 1 Complete (Enhanced Error Reporting)

---

## Current State

### Available Decorators

#### Method-Level Decorators
- **`@HasUserType(userTypes: AuthUserType[])`** - Validates user type
- **`@HasGroups(groups: string[])`** - Validates user groups
- **`@RequiresAccess(accessMap: AccessRequirements)`** - Combined user type + group validation with wildcard support
- **`@OrAuth()`** - Enables OR logic between multiple decorators (default is AND)
- **`@NoAuth()`** - Removes all authorization requirements from a method

#### Class-Level Decorators
- **`@ClassHasUserType(userTypes: AuthUserType[])`** - Applies user type validation to all methods in class

### Key Features
✅ **AND/OR Logic**: Multiple decorators can use AND (default) or OR logic (with `@OrAuth()`)
✅ **Wildcard Patterns**: Group matching with `*` (e.g., `partner_*`, `*_admin`)
✅ **Enhanced Error Reporting**: Detailed error messages with context
✅ **Class-Level Auth**: Apply auth to entire controller
✅ **Method Override**: Use `@NoAuth()` or method-level decorators to override class auth

### Architecture Strengths
- ✅ Well-structured separation of concerns
- ✅ Flexible logic system (AND/OR)
- ✅ Wildcard pattern support for scalability
- ✅ Good documentation with JSDoc
- ✅ Type-safe with TypeScript

### Current Limitations
- ⚠️ No caching/performance optimization
- ⚠️ No built-in testing utilities
- ⚠️ Rigid request structure (assumes `req.user`)
- ⚠️ No audit/logging framework
- ⚠️ No support for complex nested logic like `(A OR B) AND (C OR D)`
- ⚠️ Limited to user type and group validation (no resource-based auth)

---

## Completed Implementations

### ✅ Phase 1: Enhanced Error Reporting (COMPLETED)

**Implemented:**
- Created `AuthorizationError` class with detailed error information
- Added `AuthErrorFactory` with factory methods for common errors
- Updated all decorators to use detailed error reporting
- Enhanced logging with structured JSON output

**Files Created/Modified:**
- `authErrors.ts` - Error classes and factory
- `authOrchestrator.ts` - Updated to use `ValidationResult`
- `hasUserType.decorator.ts` - Detailed error reporting
- `hasGroups.decorator.ts` - Detailed error reporting
- `requiresAccess.decorator.ts` - Detailed error reporting

**Example Output:**
```json
{
  "error": "AuthorizationError",
  "code": "NOT_AUTHORIZED",
  "message": "User type authorization failed",
  "details": {
    "required": "User type must be one of: ADMIN, PARTNER",
    "actual": "User type is: USER",
    "failedValidator": "HasUserType([ADMIN, PARTNER])",
    "userType": "USER"
  }
}
```

---

## Future Improvements

### Priority 1: High Impact (Immediate Value)

#### 1.1 Configuration & Customization System
**Problem:** System is too rigid about `req.user` structure and error handling.

**Proposed Solution:**
```typescript
// Global configuration
AuthConfig.configure({
  userObjectPath: "req.user",           // or "req.session.user"
  groupsPath: "groups",                  // or "permissions.groups"
  errorHandler: customErrorHandler,
  logger: winstonLogger,
  enableAuditLog: true,
  cacheValidationResults: true,
  cacheTTL: 60000  // 1 minute
});

// Per-decorator configuration
@RequiresAccess({
  [AuthUserType.ADMIN]: ["admin_*"]
}, {
  errorMessage: "Admin access required",
  auditLog: true,
  cache: false
})
```

**Benefits:**
- Makes system adaptable to different project structures
- Allows integration with existing logging systems
- Enables performance tuning per endpoint

**Implementation Steps:**
1. Create `AuthConfig` class with default configuration
2. Add config validation and type safety
3. Update all decorators to read from config
4. Create migration guide for existing code
5. Add configuration documentation

**Files to Create:**
- `authConfig.ts` - Configuration class and types
- `authConfig.spec.ts` - Configuration tests

**Files to Modify:**
- All decorator files - Read from config
- `authOrchestrator.ts` - Use configured logger
- Documentation files

**Estimated Complexity:** Medium (2-3 hours)

---

#### 1.2 Testing Utilities
**Problem:** Hard to unit test protected endpoints without real authentication.

**Proposed Solution:**
```typescript
import { mockAuthContext, AuthTestUtils } from "@giusmento/mangojs-core/testing";

describe("PartnerUserController", () => {
  it("should allow admin access", async () => {
    const req = mockAuthContext({
      userType: AuthUserType.ADMIN,
      groups: ["admin_superuser"]
    });

    const res = await controller.getPartnerUsers(req, mockRes);
    expect(res.status).toBe(200);
  });

  it("should deny partner without admin group", async () => {
    const req = mockAuthContext({
      userType: AuthUserType.PARTNER,
      groups: ["partner_user"]
    });

    await expect(
      controller.getPartnerUsers(req, mockRes)
    ).toRejectWithAuthError({
      failedValidator: "RequiresAccess",
      userType: "PARTNER"
    });
  });
});

// Helper to test decorators in isolation
AuthTestUtils.testDecorator(HasUserType([AuthUserType.ADMIN]), {
  shouldPass: [
    { userType: AuthUserType.ADMIN, groups: [] }
  ],
  shouldFail: [
    { userType: AuthUserType.USER, groups: [] }
  ]
});
```

**Benefits:**
- Easier to write unit tests
- Better test coverage
- Faster test execution (no real auth needed)
- Clear test intent

**Implementation Steps:**
1. Create `authTestUtils.ts` with mock helpers
2. Add `mockAuthContext()` function
3. Create `testDecorator()` helper for isolation testing
4. Add custom Jest matchers for auth errors
5. Write example tests
6. Document testing patterns

**Files to Create:**
- `testing/authTestUtils.ts` - Test utilities
- `testing/authMatchers.ts` - Jest custom matchers
- `testing/auth.test.examples.ts` - Example tests
- `testing/README.md` - Testing guide

**Estimated Complexity:** Medium (3-4 hours)

---

#### 1.3 Performance Optimization (Caching)
**Problem:** Validators run on every request, metadata lookups happen repeatedly.

**Proposed Solution:**
```typescript
// Cache validation results per request
class AuthCache {
  private cache = new Map<string, ValidationResult>();

  get(key: string): ValidationResult | undefined {
    return this.cache.get(key);
  }

  set(key: string, result: ValidationResult): void {
    this.cache.set(key, result);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Memoize metadata lookups
const metadataCache = new WeakMap();

function getCachedMetadata(target: any, key: string): any {
  if (!metadataCache.has(target)) {
    metadataCache.set(target, new Map());
  }
  const cache = metadataCache.get(target);
  if (!cache.has(key)) {
    cache.set(key, Reflect.getMetadata(key, target));
  }
  return cache.get(key);
}
```

**Benefits:**
- Faster request processing
- Reduced CPU usage
- Better scalability

**Implementation Steps:**
1. Create `AuthCache` class with TTL support
2. Add cache key generation (based on user context + validator)
3. Update orchestrator to use cache
4. Add cache invalidation strategy
5. Make caching configurable (on/off per decorator)
6. Add metrics to measure cache hit rate
7. Document cache behavior

**Files to Create:**
- `authCache.ts` - Caching implementation
- `authCache.spec.ts` - Cache tests

**Files to Modify:**
- `authOrchestrator.ts` - Use cache
- `authConfig.ts` - Add cache configuration
- All decorators - Support cache config

**Estimated Complexity:** Medium (3-4 hours)

---

### Priority 2: Medium Impact (Enhanced Capabilities)

#### 2.1 Permission-Based Authorization System
**Problem:** Only supports user types and groups, not fine-grained permissions.

**Proposed Solution:**
```typescript
interface Permission {
  resource: string;   // "users", "partners", "reports"
  action: string;     // "read", "write", "delete"
}

@RequiresPermission({ resource: "partners", action: "write" })
@RequiresPermission({ resource: "users", action: "read" })
async updatePartner() {
  // Need permission to write partners AND read users
}

// With OR logic
@OrAuth()
@RequiresPermission({ resource: "partners", action: "admin" })
@RequiresPermission({ resource: "*", action: "superadmin" })
async dangerousAction() {
  // Partner admin OR global superadmin
}

// Wildcard permissions
@RequiresPermission({ resource: "partners.*", action: "read" })
// Matches: partners.users, partners.reports, etc.
```

**Benefits:**
- More granular access control
- Easier to manage complex permission structures
- Standard RBAC pattern
- Better scalability for large applications

**Implementation Steps:**
1. Define `Permission` interface and types
2. Create `@RequiresPermission()` decorator
3. Add permission storage in user context
4. Implement wildcard matching for resources
5. Add permission hierarchy support
6. Create permission migration from groups
7. Document permission patterns

**Files to Create:**
- `requiresPermission.decorator.ts` - New decorator
- `permissionTypes.ts` - Permission interfaces
- `permissionMatcher.ts` - Wildcard matching logic
- `permissions.md` - Permission system documentation

**Estimated Complexity:** High (5-6 hours)

---

#### 2.2 Resource-Based Authorization (Ownership & Relationships)
**Problem:** Can't check if user owns or is related to a resource.

**Proposed Solution:**
```typescript
// Check ownership
@RequiresOwnership("partner")
async updatePartner(@Param("partnerId") partnerId: string) {
  // Automatically checks if req.user.partnerId === partnerId
}

// Check relationship
@RequiresRelationship("partner", "users")
async getPartnerUsers(@Param("partnerId") partnerId: string) {
  // Checks if req.user belongs to this partner
}

// Custom validation
@RequiresResource((req, resourceId) => {
  return req.user.accessiblePartners.includes(resourceId);
})
async getPartner(@Param("id") id: string) {
  // Custom logic for resource access
}
```

**Benefits:**
- Prevents horizontal privilege escalation
- Enforces data isolation
- Multi-tenancy support
- More secure by default

**Implementation Steps:**
1. Create `@RequiresOwnership()` decorator
2. Create `@RequiresRelationship()` decorator
3. Create `@RequiresResource()` for custom logic
4. Add resource resolver pattern
5. Integrate with existing decorators
6. Add relationship mapping configuration
7. Document resource-based patterns

**Files to Create:**
- `requiresOwnership.decorator.ts`
- `requiresRelationship.decorator.ts`
- `requiresResource.decorator.ts`
- `resourceResolver.ts` - Resource resolution logic
- `resource-auth.md` - Documentation

**Estimated Complexity:** High (6-7 hours)

---

#### 2.3 Rate Limiting per Auth Level
**Problem:** All users have same rate limits regardless of auth level.

**Proposed Solution:**
```typescript
@RequiresAccess({
  [AuthUserType.ADMIN]: ["*"]
}, {
  rateLimit: { requests: 1000, window: "1h" }
})
async apiEndpoint() {}

@RequiresAccess({
  [AuthUserType.USER]: ["*"]
}, {
  rateLimit: { requests: 100, window: "1h" }
})
async apiEndpoint() {}

// Dynamic rate limits based on group
@RequiresAccess({
  [AuthUserType.PARTNER]: ["partner_*"]
}, {
  rateLimit: (user) => {
    if (user.groups.includes("partner_premium")) {
      return { requests: 5000, window: "1h" };
    }
    return { requests: 1000, window: "1h" };
  }
})
```

**Benefits:**
- Fair resource allocation
- Prevent abuse
- Premium tier support
- Better API protection

**Implementation Steps:**
1. Create rate limit middleware
2. Integrate with auth decorators
3. Add rate limit storage (Redis/Memory)
4. Create rate limit configuration
5. Add rate limit headers to responses
6. Document rate limiting patterns

**Files to Create:**
- `rateLimiter.ts` - Rate limiting logic
- `rateLimiter.spec.ts` - Tests
- `rate-limiting.md` - Documentation

**Files to Modify:**
- All decorators - Support rate limit config
- `authConfig.ts` - Rate limit configuration

**Estimated Complexity:** Medium-High (4-5 hours)

---

### Priority 3: Nice to Have (Advanced Features)

#### 3.1 Time-Based & Conditional Access
**Proposed Solution:**
```typescript
@RequiresAccess({
  [AuthUserType.PARTNER]: ["partner_admin"]
}, {
  allowedHours: [9, 17],  // Only 9 AM - 5 PM
  allowedDays: [1, 2, 3, 4, 5],  // Mon-Fri only
  ipWhitelist: ["192.168.1.0/24"],
  geoRestrictions: ["US", "CA"],  // Only US and Canada
  customCondition: (req) => {
    return req.headers["x-internal"] === "true";
  }
})
```

**Implementation Steps:**
1. Create time-based validators
2. Add IP validation
3. Add geo-location support (optional)
4. Create custom condition framework
5. Document conditional access patterns

**Estimated Complexity:** Medium (3-4 hours)

---

#### 3.2 Decorator Composition & Presets
**Proposed Solution:**
```typescript
// Define reusable auth patterns
const AdminOrPartnerAdmin = () =>
  compose(
    OrAuth(),
    RequiresAccess({ [AuthUserType.ADMIN]: ["*"] }),
    RequiresAccess({ [AuthUserType.PARTNER]: ["partner_admin"] })
  );

const InternalOnly = () =>
  compose(
    RequiresAccess({ [AuthUserType.ADMIN]: ["*"] }),
    IpWhitelist(["10.0.0.0/8"])
  );

// Use presets
@AdminOrPartnerAdmin()
async endpoint() {}

@InternalOnly()
async internalEndpoint() {}
```

**Implementation Steps:**
1. Create `compose()` utility
2. Add preset decorator factory
3. Create common preset library
4. Document composition patterns

**Estimated Complexity:** Low-Medium (2-3 hours)

---

#### 3.3 Dynamic Authorization (Database-Driven Rules)
**Proposed Solution:**
```typescript
// Load auth rules from database or config
@DynamicAuth("partner.users.read")
async getPartnerUsers() {
  // Auth rules defined in DB:
  // "partner.users.read": {
  //   userTypes: ["ADMIN", "PARTNER"],
  //   groups: ["partner_admin", "admin_*"]
  // }
}

// With caching
@DynamicAuth("sensitive.action", { cacheTTL: 300 })
async sensitiveAction() {}
```

**Implementation Steps:**
1. Create rule storage interface
2. Create rule loader
3. Create `@DynamicAuth()` decorator
4. Add rule caching
5. Create rule management API
6. Document dynamic auth patterns

**Estimated Complexity:** High (5-6 hours)

---

#### 3.4 Multi-Tenancy Support
**Proposed Solution:**
```typescript
@RequiresAccess({
  [AuthUserType.PARTNER]: ["partner_admin"]
}, {
  tenantIsolation: true,
  tenantField: "partnerId"
})
async getPartnerUsers() {
  // Automatically adds: WHERE partnerId = req.user.partnerId
  // Or throws error if user tries to access other tenant's data
}

@TenantAware({
  field: "organizationId",
  enforceIsolation: true
})
async getOrganizationData() {}
```

**Implementation Steps:**
1. Create tenant context extraction
2. Create `@TenantAware()` decorator
3. Add tenant validation middleware
4. Integrate with query builders
5. Document multi-tenancy patterns

**Estimated Complexity:** Medium-High (4-5 hours)

---

### Priority 4: Architecture Improvements

#### 4.1 Plugin System
**Proposed Solution:**
```typescript
interface AuthPlugin {
  name: string;
  beforeValidation?: (req: Request) => void;
  afterValidation?: (req: Request, result: boolean) => void;
  onAuthFailure?: (req: Request, error: AuthError) => void;
  onAuthSuccess?: (req: Request) => void;
}

class AuditLogPlugin implements AuthPlugin {
  name = "audit-log";

  afterValidation(req: Request, result: boolean) {
    // Log auth decision to audit log
  }
}

class MetricsPlugin implements AuthPlugin {
  name = "metrics";

  afterValidation(req: Request, result: boolean) {
    // Send metrics to monitoring system
  }
}

AuthSystem.registerPlugin(new AuditLogPlugin());
AuthSystem.registerPlugin(new MetricsPlugin());
```

**Implementation Steps:**
1. Define plugin interface
2. Create plugin registry
3. Add plugin hooks to orchestrator
4. Create built-in plugins (audit, metrics)
5. Document plugin development

**Estimated Complexity:** Medium-High (4-5 hours)

---

#### 4.2 Separation of Validation Logic
**Proposed Solution:**
```typescript
// Extract validators to separate testable functions
export function validateUserType(
  userType: AuthUserType,
  allowedTypes: AuthUserType[]
): ValidationResult {
  if (allowedTypes.includes(userType)) {
    return { passed: true };
  }
  return {
    passed: false,
    reason: `User type '${userType}' not in allowed types`
  };
}

export function validateGroups(
  userGroups: string[],
  patterns: string[]
): ValidationResult {
  const hasMatch = userGroups.some(g =>
    patterns.some(p => matchesPattern(g, p))
  );

  if (hasMatch) {
    return { passed: true };
  }
  return {
    passed: false,
    reason: `User groups don't match patterns`
  };
}

// Decorators just orchestrate these functions
```

**Benefits:**
- Easier to test
- Reusable validation logic
- Better separation of concerns

**Implementation Steps:**
1. Extract validation functions
2. Create validation module
3. Update decorators to use validators
4. Add unit tests for validators
5. Document validator functions

**Estimated Complexity:** Medium (3-4 hours)

---

#### 4.3 Enhanced Type Safety
**Proposed Solution:**
```typescript
// Make user types extensible
declare module "@giusmento/mangojs-core" {
  interface AuthUser {
    userType: AuthUserType;
    groups: Array<{ name: string }>;
    permissions?: Permission[];
    metadata?: Record<string, any>;
  }
}

// Type-safe decorator parameters
type AuthUserTypeArray = [AuthUserType, ...AuthUserType[]];

@HasUserType([AuthUserType.ADMIN])  // ✅ OK
@HasUserType([])  // ❌ Type error: need at least one

// Infer group names from constants
const GROUPS = {
  ADMIN: "admin",
  PARTNER_ADMIN: "partner_admin"
} as const;

type GroupName = typeof GROUPS[keyof typeof GROUPS];

@HasGroups([GROUPS.ADMIN])  // ✅ Type-safe
@HasGroups(["typo"])  // ❌ Type error
```

**Implementation Steps:**
1. Add module augmentation support
2. Create stricter type definitions
3. Add const assertion patterns
4. Update documentation with type examples

**Estimated Complexity:** Low-Medium (2-3 hours)

---

## Implementation Phases

### Phase 1: Foundation (COMPLETED ✅)
- ✅ Enhanced Error Reporting

### Phase 2: Developer Experience (Recommended Next)
**Timeline:** 1-2 weeks
**Priorities:**
1. Configuration & Customization System (1.1)
2. Testing Utilities (1.2)
3. Performance Optimization - Caching (1.3)

**Deliverables:**
- Configurable auth system
- Complete test utilities
- Cached validation
- Documentation updates

---

### Phase 3: Advanced Authorization (Future)
**Timeline:** 2-3 weeks
**Priorities:**
1. Permission-Based System (2.1)
2. Resource-Based Authorization (2.2)
3. Rate Limiting (2.3)

**Deliverables:**
- Permission decorators
- Resource ownership validation
- Rate limiting per auth level
- Migration guides

---

### Phase 4: Enterprise Features (Optional)
**Timeline:** 2-3 weeks
**Priorities:**
1. Plugin System (4.1)
2. Dynamic Authorization (3.3)
3. Multi-Tenancy Support (3.4)

**Deliverables:**
- Plugin architecture
- Database-driven rules
- Tenant isolation
- Enterprise documentation

---

## Technical Details

### Current File Structure
```
src/core/decorators/auth/
├── authErrors.ts              # Error classes (Phase 1 ✅)
├── authOrchestrator.ts        # Validation orchestrator (Phase 1 ✅)
├── hasUserType.decorator.ts   # User type validation (Phase 1 ✅)
├── hasGroups.decorator.ts     # Group validation (Phase 1 ✅)
├── requiresAccess.decorator.ts # Combined validation (Phase 1 ✅)
├── classHasUserType.decorator.ts # Class-level auth
├── noAuth.decorator.ts        # Opt-out decorator
├── orAuth.decorator.ts        # OR logic modifier
├── index.ts                   # Exports
└── ROADMAP.md                 # This file
```

### Proposed File Structure (After All Phases)
```
src/core/decorators/auth/
├── core/
│   ├── authErrors.ts
│   ├── authOrchestrator.ts
│   ├── authConfig.ts          # Phase 2
│   ├── authCache.ts           # Phase 2
│   └── authPlugin.ts          # Phase 4
├── decorators/
│   ├── hasUserType.decorator.ts
│   ├── hasGroups.decorator.ts
│   ├── requiresAccess.decorator.ts
│   ├── requiresPermission.decorator.ts  # Phase 3
│   ├── requiresOwnership.decorator.ts   # Phase 3
│   ├── requiresRelationship.decorator.ts # Phase 3
│   ├── classHasUserType.decorator.ts
│   ├── noAuth.decorator.ts
│   └── orAuth.decorator.ts
├── validators/
│   ├── userTypeValidator.ts   # Phase 4
│   ├── groupValidator.ts      # Phase 4
│   ├── permissionValidator.ts # Phase 3
│   └── resourceValidator.ts   # Phase 3
├── testing/
│   ├── authTestUtils.ts       # Phase 2
│   ├── authMatchers.ts        # Phase 2
│   └── README.md
├── plugins/
│   ├── auditLog.plugin.ts     # Phase 4
│   ├── metrics.plugin.ts      # Phase 4
│   └── rateLimit.plugin.ts    # Phase 3
├── types/
│   ├── permission.types.ts    # Phase 3
│   ├── resource.types.ts      # Phase 3
│   └── config.types.ts        # Phase 2
├── docs/
│   ├── README.md
│   ├── MIGRATION.md
│   ├── TESTING.md
│   ├── PERMISSIONS.md
│   └── PLUGINS.md
├── index.ts
└── ROADMAP.md
```

---

## How to Use This Roadmap

### For Human Developers:
1. Pick a priority level and feature
2. Review the proposed solution
3. Follow implementation steps
4. Run tests and update documentation
5. Mark as completed in this file

### For AI Sessions:
1. Read this entire document first
2. Ask which phase/feature to implement
3. Reference the implementation steps
4. Follow the file structure guidelines
5. Maintain consistency with existing code
6. Update this roadmap after completion

### Starting a New Implementation:
```markdown
I want to implement [FEATURE NAME] from the roadmap.

Context: [Brief description of why you need this feature]

Please:
1. Review the proposed solution in ROADMAP.md
2. Confirm the implementation approach
3. Start with the implementation steps
4. Update the roadmap when complete
```

---

## Assessment Summary

**Overall Grade:** B+ (Very Good, Production-Ready)

**Biggest Strengths:**
1. Clear separation of concerns
2. Flexible AND/OR logic
3. Wildcard support
4. Enhanced error reporting
5. Good documentation

**Biggest Gaps:**
1. Limited testing support
2. No configuration system
3. No performance optimization
4. Rigid request structure

**Quick Wins:**
- Configuration System (1.1) - High impact, medium effort
- Testing Utilities (1.2) - High impact, medium effort
- Caching (1.3) - High impact, medium effort

---

## Change Log

### 2025-10-31
- ✅ **Phase 1 COMPLETED:** Enhanced Error Reporting
  - Created AuthorizationError class
  - Added AuthErrorFactory
  - Updated all decorators with detailed errors
  - Enhanced logging output
- 📝 Created initial roadmap document
- 📝 Defined Phases 2-4
- 📝 Prioritized improvements

---

## Contributing

When implementing features from this roadmap:

1. **Update this file** with completion status
2. **Add tests** for new functionality
3. **Update documentation** in relevant .md files
4. **Follow existing patterns** for consistency
5. **Add examples** to decorator JSDoc comments
6. **Consider backwards compatibility**

---

## Contact & Resources

- **Documentation:** `./docs/` folder
- **Examples:** Check JSDoc comments in decorator files
- **Tests:** `*.spec.ts` files
- **Issues:** Report in project issue tracker

---

**End of Roadmap Document**
