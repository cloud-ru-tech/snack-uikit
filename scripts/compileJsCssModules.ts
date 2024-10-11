import fs from 'fs';

import { BabelFileResult, transformFileSync } from '@babel/core';
import { globSync } from 'glob';
import minimist from 'minimist';

import { logDebug, logHelp } from './utils/console';
import { getAllPackageFolders } from './utils/getAllPackageFolders';

const argv = minimist(process.argv.slice(2));
const pkg = argv.pkg || '*';

(async function () {
  const start = performance.now();
  logDebug(`Compiling css modules...`);

  const folders = getAllPackageFolders(pkg);
  const srcPart = 'dist/cjs';

  for (const folder of folders) {
    const src = `${folder}/${srcPart}`;

    const jsFiles = globSync(`${src}/**/*.js`);
    for (const file of jsFiles) {
      const { code } = transformFileSync(file, {
        plugins: [require('babel-plugin-react-css-modules')],
      }) as BabelFileResult;
      fs.writeFileSync(file, code as string);
    }

    logDebug(`FINISHED: ${folder}`);
  }

  const end = performance.now();
  logHelp(`Total ${(end - start) / 1000} seconds.`);
})();
