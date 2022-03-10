import fs from 'fs';
import path from 'path';

import { ensureDirectory } from '../utils/ensureDirectory';

export function simpleCopy({ src, distCJS, distESM }: { src: string; distCJS: string; distESM: string }) {
  return (file: string) => {
    const relativePathToSrcFile = path.relative(src, file);
    const dirname = path.dirname(relativePathToSrcFile);
    const extension = path.extname(relativePathToSrcFile);
    const basename = path.basename(relativePathToSrcFile, extension);
    const filename = path.join(dirname, `${basename}${extension}`);

    const cjsOutFile = path.resolve(distCJS, filename);
    const esmOutFile = path.resolve(distESM, filename);

    const content = fs.readFileSync(file);

    ensureDirectory(cjsOutFile);
    ensureDirectory(esmOutFile);

    fs.writeFileSync(cjsOutFile, content);
    fs.writeFileSync(esmOutFile, content);
  };
}
