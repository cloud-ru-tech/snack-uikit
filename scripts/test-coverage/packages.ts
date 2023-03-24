import path from 'path';

import { globSync } from 'glob';

import { getChangedPackages } from '../utils/getChangedPackages';

const packagesDir = path.join(__dirname, '../../packages');

function toPattern(basename: string) {
  return `packages/${basename}/src/**/*`;
}

function getPackageEntries(runAllTests: boolean) {
  const allPackages = globSync(path.join(packagesDir, '*'), {
    ignore: path.resolve(__dirname, '../../packages/tsconfig.json'),
  });

  const paths = runAllTests ? allPackages : getChangedPackages();

  return paths.map(dirname => ({
    pattern: toPattern(path.basename(dirname)),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version: require(path.join(dirname, 'package.json')).version,
  }));
}

export function getPatterns(runAllTests: boolean) {
  return getPackageEntries(runAllTests)
    .filter(el => !el.pattern.match('icons'))
    .map(entry => entry.pattern);
}
