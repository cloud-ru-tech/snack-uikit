import fs from 'fs';
import path from 'path';

import { parse, ParserOptions } from 'react-docgen-typescript';

import { logInfo } from '../utils/console';
import { Markdown } from './Markdown';

const CAUTION = '[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT';

type Options = {
  packagesRoot: string;
  docPlaceholder: [string, string];
  parserOptions: ParserOptions;
};

export class Docgen {
  private readonly packagesRootPath: string;
  private readonly parserOptions: ParserOptions;
  private readonly docPlaceholder: [string, string];

  constructor({ packagesRoot, parserOptions, docPlaceholder }: Options) {
    this.packagesRootPath = path.resolve(packagesRoot);
    this.parserOptions = parserOptions;
    this.docPlaceholder = docPlaceholder;
  }

  private path(...paths: string[]): string {
    return path.resolve(this.packagesRootPath, ...paths);
  }

  private readReadmeFile(packageName: string) {
    try {
      return fs.readFileSync(this.path(packageName, 'README.md'), 'utf-8');
    } catch (e) {
      console.warn(`Error while reading README.md file in "${packageName}".`);
      return '';
    }
  }

  private getPackagesList() {
    const entities = fs.readdirSync(this.packagesRootPath);
    const packages = entities.filter(entity => fs.statSync(this.path(entity)).isDirectory());
    const [startDocPlaceholder, endDocPlaceholder] = this.docPlaceholder;
    return packages.filter((packageName: string) => {
      const readmeFile = this.readReadmeFile(packageName);
      return readmeFile.includes(startDocPlaceholder) && readmeFile.includes(endDocPlaceholder);
    });
  }

  private writeDocsSectionToReadmeFile(packageName: string, doc: string) {
    const [placeholderStart, placeholderEnd] = this.docPlaceholder;
    const readmeFile = this.readReadmeFile(packageName);
    const startPosition = readmeFile.indexOf(placeholderStart);
    const endPosition = readmeFile.indexOf(placeholderEnd);

    const startOfFile = readmeFile.slice(0, startPosition);
    const endOfFile = readmeFile.slice(endPosition + placeholderEnd.length);

    fs.writeFileSync(
      this.path(packageName, 'README.md'),
      [startOfFile, [placeholderStart, CAUTION, doc, '\n', placeholderEnd].join('\n'), endOfFile].join(''),
      'utf-8',
    );
  }

  private generateDoc(packageName: string) {
    const packageSrc = path.resolve(this.packagesRootPath, packageName, 'src', 'index.ts');
    return parse(packageSrc, this.parserOptions).map(docData => {
      const doc = new Markdown(docData).renderComponentSpec();
      logInfo(`✔ doc generated for ${packageName}/README.md - ${docData.displayName}`);
      return doc;
    });
  }

  run(packagesPaths: string[] = []) {
    const packages = this.getPackagesList();

    for (const packageName of packages) {
      if (packagesPaths.length && !packagesPaths.some(packagePath => packagePath.endsWith(packageName))) {
        continue;
      }

      const docs = this.generateDoc(packageName);
      this.writeDocsSectionToReadmeFile(packageName, docs.join('\n'));
    }
  }
}
