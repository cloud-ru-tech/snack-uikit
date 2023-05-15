import path from 'path';

import { globSync } from 'glob';

const PACKAGES_PATTERN = '../../packages';
const TSCONFIG_PATH = path.resolve(__dirname, '../../packages/tsconfig.json');

export function getAllPackageFolders(filter = '*') {
  return globSync(`${path.resolve(__dirname, PACKAGES_PATTERN, filter)}`, { ignore: TSCONFIG_PATH });
}
