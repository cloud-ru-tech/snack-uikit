import fs from 'fs';
import path from 'path';

import { JsxEmit, createCompilerHost, createProgram } from 'typescript';

import config from '../../package.json';
import { ensureDirectory } from '../utils/ensureDirectory';

const createdFiles = {};

export function createTSProgram({ fileNames }: { fileNames: string[] }) {
  const options = {
    declaration: true,
    emitDeclarationOnly: true,
    esModuleInterop: true,
    jsx: JsxEmit.ReactJSX,
    paths: {
      [`@sbercloud/${config.name}-*`]: ['packages/*/src'],
    },
  };

  const host = createCompilerHost(options);
  host.writeFile = (fileName: string, contents: string) => (createdFiles[fileName] = contents);

  const program = createProgram(fileNames, options, host);
  program.emit();
}

export function emitDeclarations({
  src,
  distCJS,
  distESM,
  fileNames,
}: {
  src: string;
  distCJS: string;
  distESM: string;
  fileNames: string[];
}) {
  fileNames.forEach(file => {
    const relativePathToSrcFile = path.relative(src, file);
    const dirname = path.dirname(relativePathToSrcFile);
    const extension = path.extname(relativePathToSrcFile);
    const basename = path.basename(relativePathToSrcFile, extension);
    const filename = path.join(dirname, `${basename}.d.ts`);

    const cjsOutFile = path.resolve(distCJS, filename);
    const esmOutFile = path.resolve(distESM, filename);

    const dts = file.replace(extension, '.d.ts');
    const dtsContent = createdFiles[dts];

    ensureDirectory(cjsOutFile);
    ensureDirectory(esmOutFile);

    fs.writeFileSync(cjsOutFile, dtsContent);
    fs.writeFileSync(esmOutFile, dtsContent);
  });
}
