import checker, { InitOpts, ModuleInfos } from 'license-checker';

const ALLOWED_LICENSES = [
  'Unlicense',
  'MIT',
  'ISC',
  'Apache-2.0',
  'WTFPL',
  'BSD',
  'MPL-2.0',
  'CC0-1.0',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'Public Domain',
  'WTFPL',
  'BlueOak-1.0.0',
  'Zlib',
].join(', ');
const EXCLUDED_PACKAGES_SCOPES = ['@sbercloud', '@snack-ui'];

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
    const commonLicenseInfo = Object.entries(await getLicenseInfo({ start: './' })).filter(
      ([packageName]) => !EXCLUDED_PACKAGES_SCOPES.some(scope => packageName.startsWith(scope)),
    );

    if (commonLicenseInfo.length <= 0) {
      console.log('All licenses are allowed');
      return;
    }

    console.log('The following packages has incorrect licenses:');

    commonLicenseInfo
      .map(([packageName, { licenses }]) => ` * ${packageName}: ${licenses}`)
      .forEach(item => console.log(item));

    console.log(`\nThe list of allowed licenses: ${ALLOWED_LICENSES}`);
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
