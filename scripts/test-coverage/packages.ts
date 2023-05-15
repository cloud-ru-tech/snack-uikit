import path from 'path';

import { getAllPackageFolders } from '../utils/getAllPackageFolders';
import { getChangedPackages } from '../utils/getChangedPackages';

function toPattern(basename: string) {
  return `packages/${basename}/src/**/*`;
}

function getPackageEntries(runAllTests: boolean) {
  const allPackages = getAllPackageFolders();

  const paths = runAllTests ? allPackages : getChangedPackages();

  return paths.map(dirname => ({
    pattern: toPattern(path.basename(dirname)),
    version: require(path.join(dirname, 'package.json')).version,
  }));
}

export function getPatterns(runAllTests: boolean) {
  return getPackageEntries(runAllTests)
    .filter(el => !el.pattern.match('icons'))
    .map(entry => entry.pattern);
}
