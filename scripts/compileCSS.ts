import path from 'path';

import glob from 'glob';
import minimist from 'minimist';

import { simpleCopy } from './compile/simple-copy';
import { writeScss } from './compile/write-scss';
import { logDebug, logHelp } from './utils/console';

const argv = minimist(process.argv.slice(2));
const pkg = argv.pkg || '*';

(async function () {
  const start = performance.now();
  logDebug(`Compiling...`);

  const packages = `../packages/${pkg}`;
  const folders = glob.sync(`${path.resolve(__dirname, packages)}`);
  const distPart = 'dist';
  const srcPart = 'src';

  for (const folder of folders) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const src = `${folder}/${srcPart}`;
    const dist = `${folder}/${distPart}`;
    const distESM = `${dist}`;

    const filesToCopy = glob.sync(`${src}/**/*.{woff,woff2,png}`);
    filesToCopy.forEach(simpleCopy({ src, distESM }));

    const scssFiles = glob.sync(`${src}/**/!(_)*.scss`);
    const scssPipe = writeScss({ src, distESM });
    for (const file of scssFiles) {
      await scssPipe(file);
    }

    logDebug(`FINISHED: ${folder}`);
  }

  const end = performance.now();
  logHelp(`Total ${(end - start) / 1000} seconds.`);
})();
