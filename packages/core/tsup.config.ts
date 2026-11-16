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
  // Declarations are generated separately via `tsc --emitDeclarationOnly`
  // (see the `build` script). tsup's dts bundler (rollup-plugin-dts)
  // mis-renders some re-exported types through nested namespace barrels
  // as value declarations (`declare const X: typeof Y`) instead of type
  // aliases, which breaks consumers using those types in type position.
  // tsc's per-file declaration emit mirrors the old tsc-only build and
  // doesn't hit that bug.
  dts: false,
  clean: true,
  sourcemap: true,
});
