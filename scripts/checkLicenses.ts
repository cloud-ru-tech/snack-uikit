import path from 'path';

import checker, { InitOpts, ModuleInfos } from 'license-checker';

import packageJson from '../package.json';
import { logError, logInfo } from './utils/console';
import { getAllPackageFolders } from './utils/getAllPackageFolders';

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const ALLOWED_LICENSES = ['MIT', 'ISC', 'Apache-2.0', 'BSD', 'Public Domain'].join(', ');
const EXCLUDED_PACKAGE_SCOPES = ['@snack-ui'];

function getAllDeps(packageJson?: PackageJson) {
  if (!packageJson) {
    return [];
  }

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.peerDependencies,
  };

  return Object.entries(allDeps)
    .filter(([packageName]) => !EXCLUDED_PACKAGE_SCOPES.some(scope => packageName.startsWith(scope)))
    .map(([packageName, version]) => `${packageName}@${version}`);
}

function getPackageJson(folder: string): PackageJson {
  return require(path.resolve(folder, 'package.json'));
}

function getLicenseInfo(props: InitOpts): Promise<ModuleInfos> {
  return new Promise((resolve, reject) => {
    checker.init(
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        exclude: ALLOWED_LICENSES,
        ...props,
      },
      function (err, packages) {
        if (err) {
          return reject(err);
        }

        resolve(packages);
      },
    );
  });
}

(async () => {
  try {
    const folders = getAllPackageFolders();

    const depsToCheck = [
      ...new Set([
        ...getAllDeps(packageJson),
        ...folders.flatMap(folder => getAllDeps(getPackageJson(folder))),
      ]).values(),
    ];

    console.log('The followings deps are checked:');
    console.log(depsToCheck.map(dep => ` * ${dep}`).join('\n'));

    const commonLicenseInfo = Object.entries(await getLicenseInfo({ start: './', packages: depsToCheck.join(';') }));
    if (commonLicenseInfo.length <= 0) {
      logInfo('\nAll licenses are allowed');
      return;
    }

    logError('[ERROR] The following packages have not valid licenses:');

    logError(commonLicenseInfo.map(([packageName, { licenses }]) => ` * ${packageName}: ${licenses}`).join('\n'));

    logError(`The list of allowed licenses: ${ALLOWED_LICENSES}`);
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
