import fs from 'fs';

import { rimrafSync } from 'rimraf';

import { logDebug } from './utils/console';
import { getAllPackageFolders } from './utils/getAllPackageFolders';

(async function () {
  logDebug(`Cleaning empty packages...`);

  const folders = getAllPackageFolders();

  for (const folder of folders) {
    const pkgJsonFileExists = fs.existsSync(`${folder}/package.json`);

    if (!pkgJsonFileExists) {
      rimrafSync(folder);
      logDebug(`package.json was not found in: ${folder}. So it will be removed`);
    }
  }
})();
