import path from 'path';

import glob from 'glob';
import minimist from 'minimist';

import { createTSProgram, emitDeclarations } from './compile/emit-declarations';
import { extractStyles } from './compile/extract-styles';
import { simpleCopy } from './compile/simple-copy';
import { sortFolders } from './compile/sort-folders';
import { transformJs } from './compile/transform-js';
import { writeJs } from './compile/write-js';
import { logDebug, logHelp } from './utils/console';

const argv = minimist(process.argv.slice(2));
const pkg = argv.pkg || '*';

(function () {
  const start = performance.now();
  logDebug(`Compiling...`);

  const packages = `../packages/${pkg}`;
  const folders = glob.sync(`${path.resolve(__dirname, packages)}`);
  const linariaConfig = path.resolve(__dirname, '../linaria.config.js');
  const distPart = 'dist';
  const srcPart = 'src';

  const tsFiles = glob.sync(path.resolve(__dirname, `../packages/*/src/**/*.{ts,tsx}`));
  createTSProgram({ fileNames: tsFiles });

  const sortedFolders = sortFolders(folders);

  for (const folder of sortedFolders) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const packageJson = require(`${folder}/package.json`);
    const src = `${folder}/${srcPart}`;
    const dist = `${folder}/${distPart}`;
    const distESM = `${dist}/esm`;
    const distCJS = `${dist}/cjs`;

    const jsFiles = glob.sync(`${src}/**/*.{ts,tsx,js,jsx}`);
    const jsPipe = writeJs({ src, distCJS, distESM });
    jsFiles.forEach(jsPipe(transformJs(packageJson.version)));

    const filesToCopy = glob.sync(`${src}/**/*.{woff,woff2,png}`);
    filesToCopy.forEach(simpleCopy({ src, distCJS, distESM }));

    emitDeclarations({
      src,
      distCJS,
      distESM,
      fileNames: jsFiles.filter(file => file.endsWith('.ts') || file.endsWith('.tsx')),
    });

    extractStyles({
      files: jsFiles,
      configFile: linariaConfig,
      version: packageJson.version,
      distESM,
      distCJS,
      src,
    });

    logDebug(`FINISHED: ${folder}`);
  }

  const end = performance.now();
  logHelp(`Total ${(end - start) / 1000} seconds.`);
})();
