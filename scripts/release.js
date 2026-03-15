#!/usr/bin/env node

/**
 * MangoJS Monorepo Release Script
 *
 * Usage:
 *   node scripts/release.js <version>
 *   pnpm release 1.0.0
 *
 * This script:
 * 1. Updates @mangojs/core version
 * 2. Creates Docusaurus version snapshot
 * 3. Commits and tags the release
 * 4. Optionally publishes to npm
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const CORE_PKG_PATH = path.join(ROOT_DIR, 'packages', 'core', 'package.json');
const DOCS_DIR = path.join(ROOT_DIR, 'packages', 'docs');

function exec(cmd, options = {}) {
  console.log(`\n$ ${cmd}`);
  return execSync(cmd, {
    stdio: 'inherit',
    cwd: ROOT_DIR,
    ...options
  });
}

function main() {
  const version = process.argv[2];
  const flags = process.argv.slice(3);
  const dryRun = flags.includes('--dry-run');
  const skipPublish = flags.includes('--skip-publish');
  const skipGit = flags.includes('--skip-git');
  const skipDocs = flags.includes('--skip-docs');

  if (!version) {
    console.error(`
Usage: node scripts/release.js <version> [options]

Arguments:
  version       Version to release (e.g., 1.0.0, 1.0.0-beta.1)

Options:
  --dry-run      Show what would be done without making changes
  --skip-publish Skip npm publish
  --skip-git     Skip git commit and tag
  --skip-docs     Skip Docusaurus version snapshot

Examples:
  pnpm release 1.0.0
  pnpm release 1.0.0-beta.1 --dry-run
  pnpm release 1.0.0 --skip-publish
`);
    process.exit(1);
  }

  // Validate version format
  if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
    console.error(`Invalid version format: ${version}`);
    console.error('Expected format: X.Y.Z or X.Y.Z-tag');
    process.exit(1);
  }

  console.log(`\n🥭 MangoJS Release v${version}\n`);
  console.log(`Options: ${dryRun ? 'DRY RUN' : 'LIVE'}, publish: ${!skipPublish}, git: ${!skipGit}`);

  if (dryRun) {
    console.log('\n⚠️  DRY RUN - No changes will be made\n');
  }

  // Step 1: Update @mangojs/core version
  console.log('\n📦 Step 1: Updating @mangojs/core version...');
  const corePkg = JSON.parse(fs.readFileSync(CORE_PKG_PATH, 'utf-8'));
  const oldVersion = corePkg.version;

  if (!dryRun) {
    corePkg.version = version;
    fs.writeFileSync(CORE_PKG_PATH, JSON.stringify(corePkg, null, 2) + '\n');
  }
  console.log(`   ${oldVersion} → ${version}`);

  // Step 2: Build core package
  console.log('\n🔨 Step 2: Building @mangojs/core...');
  if (!dryRun) {
    exec('pnpm --filter @mangojs/core build');
  }

  // Step 3: Create Docusaurus version
  if (!skipDocs) {
    console.log('\n📚 Step 3: Creating Docusaurus version snapshot...');
    if (!dryRun) {
      exec(`pnpm --filter @mangojs/docs docusaurus docs:version ${version}`);
    }
    console.log(`   Created docs version: ${version}`);
  } else {
    console.log('\n📚 Step 3: Skipped Docusaurus version snapshot');
  }

  // Step 4: Git commit and tag
  if (!skipGit) {
    console.log('\n📝 Step 4: Creating git commit and tag...');
    if (!dryRun) {
      exec('git add .');
      exec(`git commit -m "chore: release v${version}"`);
      exec(`git tag -a v${version} -m "Release v${version}"`);
    }
    console.log(`   Committed and tagged: v${version}`);
  }

  // Step 5: Publish package
  if (!skipPublish) {
    console.log('\n🚀 Step 5: Publishing package...');
    if (!dryRun) {
      exec('pnpm --filter @mangojs/core publish --no-git-checks');
    }
    console.log(`   Published @mangojs/core@${version}`);
  }

  // Summary
  console.log(`
✅ Release v${version} complete!

Next steps:
${!skipGit ? '  • Push changes: git push && git push --tags' : ''}
${skipPublish ? '  • Publish manually: pnpm --filter @mangojs/core publish' : ''}
  • Build Docker: docker build -t mangojs-web .
  • Deploy: docker-compose up -d
`);
}

main();
