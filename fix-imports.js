import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = path.resolve('./src/components');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

function fixCaseMismatch() {
  const files = walk(baseDir);

  files.forEach((fullPath) => {
    const relPath = path.relative('.', fullPath).replace(/\\/g, '/');
    const gitTracked = execSync(`git ls-files "${relPath.toLowerCase()}"`)
      .toString()
      .trim();

    if (gitTracked && gitTracked !== relPath) {
      console.log(`🔁 Fixing case: ${gitTracked} → ${relPath}`);
      execSync(`git mv "${gitTracked}" "${relPath}.temp"`);
      execSync(`git mv "${relPath}.temp" "${relPath}"`);
    }
  });

  console.log(
    '\n✅ Case fix completed. Now run: git commit -am "Fix filename casing"\n'
  );
}

fixCaseMismatch();
