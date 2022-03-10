import fs from 'fs';
import path from 'path';

import { ensureDirectory } from '../utils/ensureDirectory';

export function writeJs({ src, distCJS, distESM }: { src: string; distCJS: string; distESM: string }) {
  return (transformJs: (file: string) => { cjs: string; esm: string }) => (file: string) => {
    const relativePathToSrcFile = path.relative(src, file);
    const dirname = path.dirname(relativePathToSrcFile);
    const extension = path.extname(relativePathToSrcFile);
    const basename = path.basename(relativePathToSrcFile, extension);
    const filename = path.join(dirname, `${basename}.js`);

    const cjsOutFile = path.resolve(distCJS, filename);
    const esmOutFile = path.resolve(distESM, filename);

    const content = transformJs(file);

    ensureDirectory(cjsOutFile);
    ensureDirectory(esmOutFile);

    fs.writeFileSync(cjsOutFile, content.cjs);
    fs.writeFileSync(esmOutFile, content.esm);
  };
}
