#!/usr/bin/env node

/**
 * Manual versioning script for TypeDoc documentation
 *
 * Usage:
 *   node scripts/docs-version.js <version>
 *   pnpm docs:version 1.0.0
 *
 * This script:
 * 1. Generates docs for the specified version
 * 2. Copies them to docs-site/<version>/
 * 3. Updates the versions.json manifest
 * 4. Regenerates the landing page with version links
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const VERSIONS_FILE = path.join(DOCS_DIR, 'versions.json');

function main() {
  const version = process.argv[2];

  if (!version) {
    console.error('Usage: node scripts/docs-version.js <version>');
    console.error('Example: node scripts/docs-version.js 1.0.0');
    process.exit(1);
  }

  // Validate version format (semver-like)
  if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
    console.error(`Invalid version format: ${version}`);
    console.error('Expected format: X.Y.Z or X.Y.Z-tag');
    process.exit(1);
  }

  console.log(`\n📚 Generating documentation for version ${version}...\n`);

  // Ensure docs-site directory exists
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }

  const versionDir = path.join(DOCS_DIR, version);

  // Generate docs to version-specific folder
  try {
    execSync(`npx typedoc --out "${versionDir}"`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
  } catch (error) {
    console.error('Failed to generate documentation');
    process.exit(1);
  }

  // Update versions.json
  let versions = [];
  if (fs.existsSync(VERSIONS_FILE)) {
    versions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf-8'));
  }

  // Add version if not already present
  if (!versions.includes(version)) {
    versions.unshift(version); // Add to beginning (newest first)
    // Sort by semver (newest first)
    versions.sort((a, b) => {
      const aParts = a.split(/[-.]/).map(p => parseInt(p) || p);
      const bParts = b.split(/[-.]/).map(p => parseInt(p) || p);
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        if (aParts[i] === undefined) return 1;
        if (bParts[i] === undefined) return -1;
        if (typeof aParts[i] === 'number' && typeof bParts[i] === 'number') {
          if (bParts[i] !== aParts[i]) return bParts[i] - aParts[i];
        }
      }
      return 0;
    });
  }

  fs.writeFileSync(VERSIONS_FILE, JSON.stringify(versions, null, 2));

  // Also copy to 'latest' folder
  const latestDir = path.join(DOCS_DIR, 'latest');
  if (fs.existsSync(latestDir)) {
    fs.rmSync(latestDir, { recursive: true });
  }
  copyDir(versionDir, latestDir);

  // Generate landing page
  generateLandingPage(versions);

  console.log(`\n✅ Documentation for version ${version} generated successfully!`);
  console.log(`   - Version docs: docs/${version}/`);
  console.log(`   - Latest docs: docs/latest/`);
  console.log(`   - Landing page: docs/index.html`);
  console.log(`\n📝 Available versions: ${versions.join(', ')}\n`);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function generateLandingPage(versions) {
  const latestVersion = versions[0];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MangoJS Documentation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 48px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 8px;
      color: #1a1a2e;
    }
    .subtitle {
      color: #666;
      margin-bottom: 32px;
      font-size: 1.1rem;
    }
    .latest-btn {
      display: block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 24px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .latest-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    .latest-btn span {
      opacity: 0.8;
      font-weight: normal;
      font-size: 0.9rem;
    }
    h2 {
      font-size: 1rem;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .versions-list {
      list-style: none;
    }
    .versions-list li {
      margin-bottom: 8px;
    }
    .versions-list a {
      display: block;
      padding: 12px 16px;
      background: #f5f5f5;
      border-radius: 6px;
      color: #333;
      text-decoration: none;
      transition: background 0.2s;
    }
    .versions-list a:hover {
      background: #e8e8e8;
    }
    .footer {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
      text-align: center;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
      margin: 0 12px;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>MangoJS</h1>
    <p class="subtitle">API Documentation</p>

    <a href="./latest/index.html" class="latest-btn">
      View Latest Documentation <span>(v${latestVersion})</span>
    </a>

    <h2>All Versions</h2>
    <ul class="versions-list">
      ${versions.map(v => `<li><a href="./${v}/index.html">v${v}</a></li>`).join('\n      ')}
    </ul>

    <div class="footer">
      <a href="https://github.com/theunionsquare/mangojs">GitHub</a>
      <a href="https://www.npmjs.com/package/@theunionsquare/mangojs-core">NPM</a>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), html);
}

main();
