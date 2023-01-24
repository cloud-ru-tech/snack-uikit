import fs from 'fs';
import path from 'path';

import sass from 'sass';

import { ensureDirectory } from '../utils/ensureDirectory';
import { postProcessCss } from './post-process-css';

export function writeScss({ src, distCJS, distESM }: { src: string; distCJS: string; distESM: string }) {
  return async (file: string) => {
    console.log(`SCSS transforming: ${file}...`);

    const { css } = await sass.compileAsync(file, {
      loadPaths: [path.resolve(__dirname, '../../node_modules'), path.resolve(__dirname, '../../tokens')],
    });

    const relativePathToSrcFile = path.relative(src, file);
    const dirname = path.dirname(relativePathToSrcFile);
    const basename = path.basename(relativePathToSrcFile, '.scss');
    const filename = path.join(dirname, `${basename}.css`);

    const srcOutFile = path.resolve(src, filename);
    const cjsOutFile = path.resolve(distCJS, filename);
    const esmOutFile = path.resolve(distESM, filename);

    ensureDirectory(srcOutFile);
    ensureDirectory(cjsOutFile);
    ensureDirectory(esmOutFile);

    const { css: processedCss } = await postProcessCss({ from: srcOutFile, css });

    fs.writeFileSync(cjsOutFile, processedCss);
    fs.writeFileSync(esmOutFile, processedCss);
    fs.writeFileSync(srcOutFile, processedCss);
  };
}
