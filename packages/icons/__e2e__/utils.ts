import { existsSync, lstatSync, readdirSync } from 'fs';
import { join } from 'path';

function generateDataTestId(fileName: string) {
  const name = fileName.replace(/(\.?svg)$/gi, '').replace(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g, x => {
    const delimiter = x.match(/^\d/) ? '' : '-';
    return `${delimiter}${x.toLowerCase()}`;
  });

  return `icon${name}`;
}

export const getIconsDataTestIds = (pathToIcons: string) => {
  const iconsDataTestIds: string[] = [];
  const iconsFolderPath = join(__dirname, pathToIcons);

  if (existsSync(iconsFolderPath)) {
    readdirSync(iconsFolderPath).forEach(folder => {
      const folderPath = join(iconsFolderPath, folder);
      if (lstatSync(folderPath).isDirectory()) {
        readdirSync(folderPath).forEach(file => {
          iconsDataTestIds.push(generateDataTestId(file));
        });
      }
    });
  }
  return iconsDataTestIds;
};
