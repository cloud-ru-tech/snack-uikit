import { readdirSync } from 'fs';
import { resolve } from 'path';

function generateDataTestId(fileName: string) {
  const name = fileName.replace(/(\.?svg)$/gi, '').replace(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g, x => {
    const delimiter = x.match(/^\d/) ? '' : '-';
    return `${delimiter}${x.toLowerCase()}`;
  });

  return `icon${name}`;
}

const iconsFolder = resolve(process.cwd(), './packages/icons');

export function getIconsDataTestIds(pathToIcons: string) {
  const icons = readdirSync(resolve(iconsFolder, pathToIcons));

  return icons.map(generateDataTestId);
}
