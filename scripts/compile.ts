import path from 'path';

import glob from 'glob';
import minimist from 'minimist';
import moment from 'moment';

import { createTSProgram, emitDeclarations } from './compile/emit-declarations';
import { extractStyles } from './compile/extract-styles';
import { simpleCopy } from './compile/simple-copy';
import { sortFolders } from './compile/sort-folders';
import { transformJs } from './compile/transform-js';
import { writeJs } from './compile/write-js';
import { logHelp, logInfo } from './utils/console';

const argv = minimist(process.argv.slice(2));
const pkg = argv.pkg || '*';

(function () {
  let jsTiming = 0;
  let tsTiming = 0;
  let emitTiming = 0;
  let simpleCopyTiming = 0;
  let stylesTiming = 0;

  console.log(`Compiling...`);

  const packages = `../packages/${pkg}`;

  const folders = glob.sync(`${path.resolve(__dirname, packages)}`);
  const linariaConfig = path.resolve(__dirname, '../linaria.config.js');
  const distPart = 'dist';
  const srcPart = 'src';

  const tsStart = moment();
  const tsFiles = glob.sync(path.resolve(__dirname, `../packages/*/src/**/*.{ts,tsx}`));

  createTSProgram({ fileNames: tsFiles });

  tsTiming += moment().diff(tsStart, 'ms');

  const sortedFolders = sortFolders(folders);

  for (const folder of sortedFolders) {
    const packageJson = require(`${folder}/package.json`);
    const src = `${folder}/${srcPart}`;
    const dist = `${folder}/${distPart}`;
    const distESM = `${dist}/esm`;
    const distCJS = `${dist}/cjs`;

    const jsStart = moment();

    const jsFiles = glob.sync(`${src}/**/*.{ts,tsx,js,jsx}`);
    const jsPipe = writeJs({ src, distCJS, distESM });
    jsFiles.forEach(jsPipe(transformJs(packageJson.version)));

    jsTiming += moment().diff(jsStart, 'ms');

    const copyStart = moment();
    const filesToCopy = glob.sync(`${src}/**/*.{woff,woff2,png}`);

    filesToCopy.forEach(simpleCopy({ src, distCJS, distESM }));
    simpleCopyTiming += moment().diff(copyStart, 'ms');

    const emitStart = moment();

    emitDeclarations({
      src,
      distCJS,
      distESM,
      fileNames: jsFiles.filter(file => file.endsWith('.ts') || file.endsWith('.tsx')),
    });

    emitTiming += moment().diff(emitStart, 'ms');

    const stylesStart = moment();

    extractStyles({
      files: jsFiles,
      configFile: linariaConfig,
      version: packageJson.version,
      distESM,
      distCJS,
      src,
    });

    stylesTiming += moment().diff(stylesStart, 'ms');
  }

  const totalTiming = tsTiming + jsTiming + emitTiming + simpleCopyTiming + stylesTiming;
  logInfo(`TS build has taken ${tsTiming}ms.`);
  logInfo(`JS build has taken ${jsTiming}ms.`);
  logInfo(`Copying files has taken ${simpleCopyTiming}ms.`);
  logInfo(`Types emitting has taken ${emitTiming}ms.`);
  logInfo(`Styles extraction has taken ${stylesTiming}ms.`);
  logHelp(`Total ${totalTiming}ms.`);
})();
