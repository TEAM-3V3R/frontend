import fs from 'fs';
import path from 'path';

const importRegex = /import\s+.*?\s+from\s+['"](@\/components\/[^'"]+)['"]/g;
const srcBase = path.resolve('./src');
const componentsPath = path.join(srcBase, 'components');

function getAllJsxOnlyFiles() {
  const jsxOnly = new Set();
  const seen = new Map();

  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
        const rel = path.relative(srcBase, fullPath).replace(/\\/g, '/');
        const key = rel.replace(/\.(js|jsx)$/, '');

        if (!seen.has(key)) {
          seen.set(key, entry.name.endsWith('.jsx') ? '.jsx' : '.js');
        } else {
          seen.set(key, 'conflict');
        }
      }
    }
  };

  walk(componentsPath);

  for (const [key, ext] of seen.entries()) {
    if (ext === '.jsx') {
      jsxOnly.add(key);
    }
  }

  return jsxOnly;
}

function fixImportsInFile(filePath, validJsxImports) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  content = content.replace(importRegex, (match, rawPath) => {
    const relPath = rawPath.replace(/^@\//, '');
    if (validJsxImports.has(relPath)) {
      changed = true;
      return match.replace(rawPath, rawPath + '.jsx');
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed: ${filePath}`);
  }
}

function run() {
  const validImports = getAllJsxOnlyFiles();
  const targets = [];

  const scan = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.name.endsWith('.js') || entry.name.endsWith('.jsx')) {
        targets.push(fullPath);
      }
    }
  };

  scan(srcBase);

  for (const file of targets) {
    fixImportsInFile(file, validImports);
  }
}

run();
