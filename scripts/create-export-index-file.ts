import fs from 'fs';

const capitalizeFirstLetter = (str: string) => str.replace(str[0], str[0].toUpperCase());

function createExportIndexFile(folderPath: string, outputFile: string) {
  const folders = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const exports = folders
    .map(folderName => `export { default as ${capitalizeFirstLetter(folderName)}SVG } from './${folderName}'`)
    .join('\n');

  fs.writeFileSync(outputFile, exports);
}

const folderPath = 'src/components/interface-icons';
const outputFile = 'src/components/interface-icons/index.tsx';

try {
  createExportIndexFile(folderPath, outputFile);
  console.log('Export icons file created.');
} catch (err) {
  console.log('Error: ', err);
}
