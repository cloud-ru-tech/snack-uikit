import path from 'path';

import { globSync } from 'glob';

const PACKAGES_PATTERN = '../../packages';
const TSCONFIG_CJS_PATH = path.resolve(__dirname, '../../packages/tsconfig.cjs.json');
const TSCONFIG_ESM_PATH = path.resolve(__dirname, '../../packages/tsconfig.esm.json');

export function getAllPackageFolders(filter = '*') {
  return globSync(`${path.resolve(__dirname, PACKAGES_PATTERN, filter)}`, {
    ignore: [TSCONFIG_CJS_PATH, TSCONFIG_ESM_PATH],
  });
}
