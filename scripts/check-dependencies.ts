import path from 'path';

import depCheck from 'depcheck';

import globConfig from '../package.json';
import { logDebug, logError, logInfo } from './utils/console';
import { getAllPackageFolders } from './utils/getAllPackageFolders';

const options = {
  ignoreBinPackage: false,
  skipMissing: false,
  ignorePatterns: ['stories', 'dist', '__tests__', '__e2e__'],
  ignoreMatches: ['react', 'react-dom', '@sbercloud/figma-tokens', '@snack-uikit/figma-tokens'],
};

const uikitPackageRegexp = new RegExp(`${globConfig.name}\\/`);

const InternalPackages = {};
const folders = getAllPackageFolders();

for (const folder of folders) {
  const pkg = require(path.resolve(folder, 'package.json'));
  InternalPackages[pkg.name] = pkg.version;
}

const WrongVersions: string[] = [];
const InternalAsDev: string[] = [];
const UnusedDeps: string[] = [];
const Missing: Record<string, string[]>[] = [];

for (const folder of folders) {
  const pkg = require(path.resolve(folder, 'package.json'));
  const usedInternal = Object.keys(pkg.dependencies || {}).filter(x => uikitPackageRegexp.test(x));
  usedInternal.forEach(dep => {
    if (pkg.dependencies[dep] !== InternalPackages[dep]) {
      WrongVersions.push(
        `Error in ${pkg.name}: ${dep} has ${pkg.dependencies[dep]}, but correct version is ${InternalPackages[dep]}`,
      );
    }
  });

  const usedInternalDev = Object.keys(pkg.devDependencies || {}).filter(x => uikitPackageRegexp.test(x));
  usedInternalDev.forEach(dep => InternalAsDev.push(`Error in ${pkg.name}: ${dep}`));
}

(async () => {
  for (const folder of folders) {
    const { dependencies, missing } = await depCheck(folder, options);

    UnusedDeps.push(...dependencies.map(x => `${folder}: ${x}`));
    Missing.push(missing);
  }
})().then(() => {
  const FilteredMissing = Missing.filter(x => Object.keys(x).length);
  if (UnusedDeps.length || FilteredMissing.length || WrongVersions.length || InternalAsDev.length) {
    if (WrongVersions.length) {
      logError('You have to fix wrong version of internal packages:');
      WrongVersions.forEach(x => logDebug(x));
    }

    if (InternalAsDev.length) {
      logError(
        'You have to fix wrong usage of internal packages in dev dependencies (either delete them or move to dependencies):',
      );
      InternalAsDev.forEach(x => logDebug(x));
    }

    if (UnusedDeps.length) {
      logError('You have to fix following unused dependencies:');
      UnusedDeps.forEach(x => logDebug(x));
    }

    if (FilteredMissing.length) {
      logError('You have to fix following missed dependencies:');
      FilteredMissing.forEach(x => logDebug(JSON.stringify(x, null, 2)));
    }

    process.exit(1);
  } else {
    logInfo('Dependencies has been checked. Everything is ok.');
  }
});
