import path from 'path';

import { BabelFileResult, Node, transformFileSync, transformFromAstSync } from '@babel/core';

export function transformJs(version: string) {
  return (file: string) => {
    console.log(`BABEL transforming: ${file}...`);

    const esmConfig = require(path.resolve(process.cwd(), 'esm.babel.config.js'))(version);

    const { code: esm, ast } = transformFileSync(file, {
      ast: true,
      filename: file,
      ...esmConfig,
    }) as BabelFileResult;

    const cjsConfig = require(path.resolve(process.cwd(), 'cjs.babel.config.js'))(version);

    const { code: cjs } = transformFromAstSync(ast as Node, esm as string, {
      filename: file,
      ...cjsConfig,
    }) as BabelFileResult;

    return {
      cjs,
      esm,
    } as {
      cjs: string;
      esm: string;
    };
  };
}
