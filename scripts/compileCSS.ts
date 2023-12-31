import { globSync } from 'glob';
import minimist from 'minimist';

import { simpleCopy } from './compile/simple-copy';
import { writeScss } from './compile/write-scss';
import { logDebug, logHelp } from './utils/console';
import { getAllPackageFolders } from './utils/getAllPackageFolders';

const argv = minimist(process.argv.slice(2));
const pkg = argv.pkg || '*';

(async function () {
  const start = performance.now();
  logDebug(`Compiling...`);

  const folders = getAllPackageFolders(pkg);
  const distPart = 'dist';
  const srcPart = 'src';

  for (const folder of folders) {
    const src = `${folder}/${srcPart}`;
    const dist = `${folder}/${distPart}`;
    const distESM = `${dist}`;

    const filesToCopy = globSync(`${src}/**/*.{woff,woff2,png,css}`);
    filesToCopy.forEach(simpleCopy({ src, distESM }));

    const scssFiles = globSync(`${src}/**/!(_)*.scss`);
    const scssPipe = writeScss({ src, distESM });
    for (const file of scssFiles) {
      await scssPipe(file);
    }

    logDebug(`FINISHED: ${folder}`);
  }

  const end = performance.now();
  logHelp(`Total ${(end - start) / 1000} seconds.`);
})();
