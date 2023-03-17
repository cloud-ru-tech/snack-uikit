import * as fs from 'fs/promises';
import path from 'path';

import { XMLParser } from 'fast-xml-parser';

import { validateIconSize, validateIconUniqueness, Validator } from './icon-validators';

const SVGS_FOLDER = path.join(__dirname, '../packages/icons/svgs');
const OPTIONS = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
};

const xmlParser = new XMLParser(OPTIONS);
const validators: Validator[] = [validateIconSize, validateIconUniqueness];

(async () => {
  const collections = await fs.readdir(SVGS_FOLDER);
  const collectionsWithIcons = await Promise.all(
    collections.map(collection => fs.readdir(path.join(SVGS_FOLDER, collection))),
  );
  const iconPaths = collections.flatMap((collection, index) =>
    collectionsWithIcons[index].map(icon => `${collection}/${icon}`),
  );

  const icons = await Promise.all(
    iconPaths.map(async iconPath => {
      const content = await fs.readFile(path.join(SVGS_FOLDER, iconPath), 'utf-8');
      return { path: iconPath, content, xml: xmlParser.parse(content) };
    }),
  );

  validators.forEach(validator => {
    icons.forEach(icon => {
      if (!validator.validate({ icon, allIcons: icons })) {
        throw new Error(`${icon.path}: ${validator.error}`);
      }
    });
  });

  console.log('All icons are valid.');
})();
