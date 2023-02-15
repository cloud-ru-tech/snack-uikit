import path from 'path';

import glob from 'glob';

const packagesDir = path.join(__dirname, '../../packages');

function toPattern(basename: string) {
  return `packages/${basename}/src/**/*`;
}

function getPackageEntries() {
  return glob
    .sync(path.join(packagesDir, '*'), { ignore: path.resolve(__dirname, '../../packages/tsconfig.json') })
    .map(dirname => ({
      pattern: toPattern(path.basename(dirname)),
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      version: require(path.join(dirname, 'package.json')).version,
    }));
}

export function getPatterns() {
  return getPackageEntries()
    .filter(el => !el.pattern.match('icons'))
    .map(entry => entry.pattern);
}
