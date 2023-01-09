import path from 'path';

import glob from 'glob';

const packagesDir = path.join(__dirname, '../../packages');

function isStableVersion(version: string) {
  return Number(version[0]) > 0;
}

function toPattern(basename: string) {
  return `packages/${basename}/src/**/*`;
}

function getPackageEntries() {
  return glob.sync(path.join(packagesDir, '*')).map(dirname => ({
    pattern: toPattern(path.basename(dirname)),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version: require(path.join(dirname, 'package.json')).version,
  }));
}

export function getAllPatterns() {
  return [toPattern('*')];
}

export function getStablePatterns() {
  return getPackageEntries()
    .filter(entry => isStableVersion(entry.version))
    .filter(el => !el.pattern.match('icons'))
    .map(entry => entry.pattern);
}

export function getUnstablePatterns() {
  return getPackageEntries()
    .filter(entry => !isStableVersion(entry.version))
    .map(entry => entry.pattern);
}
