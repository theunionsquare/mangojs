import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/core/types/enums/index.ts',
    // Internal modules imported directly by legacy tests against built
    // output (not part of the public barrel in src/index.ts).
    'src/core/builders/ServerBuilder.ts',
    'src/core/decorators/audit/audit.decorator.ts',
    'src/core/decorators/audit/auditConfig.ts',
    'src/core/decorators/auth/requiresOwnership.decorator.ts',
    'src/core/decorators/auth/hasUserType.decorator.ts',
    'src/core/decorators/auth/orAuth.decorator.ts',
    'src/core/utils/metadata.keys.ts',
    'src/core/middlewares/rateLimit.ts',
    'src/core/middlewares/securityHeaders.ts',
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
});
