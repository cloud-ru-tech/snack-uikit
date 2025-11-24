import fs from 'fs';
import path from 'path';

import { exec, exit } from 'shelljs';

import { getChangedPackages } from './utils/getChangedPackages';
import { isMainBranch } from './utils/isMainBranch';

const { BROWSER } = process.env;

let changedPaths = '';

if (!isMainBranch()) {
  const paths = getChangedPackages();

  const filteredPaths = paths.filter(item => {
    const testsDir = path.join(item, '__e2e__');
    return fs.existsSync(testsDir) && fs.statSync(testsDir).isDirectory();
  });

  if (filteredPaths.length > 0) {
    changedPaths = filteredPaths.map(item => `${item}/__e2e__/`).join(' ');
  } else {
    process.exit(0);
  }
}

exec(`playwright test --project=${BROWSER || 'chrome'} ${changedPaths}`, exit);
