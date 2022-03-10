import fs from 'fs';
import path from 'path';

import { transform } from '@linaria/babel-preset';
import mkdirp from 'mkdirp';
import normalize from 'normalize-path';

import { getClassNameSlug } from '../utils/getClassNameSlug';

const resolveRequireInsertionFileName = (filename: string) => filename.replace(/\.tsx?/, '.js');

const resolveOutputFileName = (filename: string, outDir: string, sourceRoot: string) => {
  const outputFolder = path.relative(sourceRoot, path.dirname(filename));
  const outputBasename = path.basename(filename).replace(path.extname(filename), '.css');

  return path.join(outDir, outputFolder, outputBasename);
};

const createCssWithAutoImport = ({ cssText, inputFileName, outputFileName }: Record<string, string>) => {
  const normalizedInputFileName = resolveRequireInsertionFileName(inputFileName);
  const relativePath = normalize(path.relative(path.dirname(inputFileName), outputFileName));

  mkdirp.sync(path.dirname(outputFileName));

  const inputContent = fs.readFileSync(normalizedInputFileName, 'utf-8');

  fs.writeFileSync(outputFileName, cssText);

  const importPath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`;

  const requireStatement = `require('${importPath}');`;

  if (!inputContent.trim().endsWith(requireStatement)) {
    fs.writeFileSync(normalizedInputFileName, `${inputContent}\n${requireStatement}\n`);
  }
};

export function extractStyles({
  files,
  configFile,
  src,
  version,
  distESM,
  distCJS,
}: {
  files: string[];
  configFile: string;
  src: string;
  version: string;
  distESM: string;
  distCJS: string;
}) {
  files.forEach(filename => {
    const { cssText } = transform(fs.readFileSync(filename).toString(), {
      filename,
      pluginOptions: {
        classNameSlug: getClassNameSlug(version),
        configFile,
      },
    });

    if (cssText) {
      const esmOutputFileName = resolveOutputFileName(filename, distESM, src);
      const cjsOutputFileName = resolveOutputFileName(filename, distCJS, src);

      const esmInputFileName = path.resolve(distESM, path.relative(src, filename));
      const cjsInputFileName = path.resolve(distCJS, path.relative(src, filename));

      createCssWithAutoImport({
        cssText,
        inputFileName: esmInputFileName,
        outputFileName: esmOutputFileName,
      });
      createCssWithAutoImport({
        cssText,
        inputFileName: cjsInputFileName,
        outputFileName: cjsOutputFileName,
      });
    }
  });
}
