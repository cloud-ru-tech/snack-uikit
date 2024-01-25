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

const folders = ['components', 'components-with-context'];
const collections = ['interface-icons'];

try {
  for (const folder of folders) {
    for (const collection of collections) {
      const folderPath = `src/${folder}/${collection}`;
      const outputFile = `src/${folder}/${collection}/index.tsx`;

      createExportIndexFile(folderPath, outputFile);
    }
  }

  console.log('Export icons files created.');
} catch (err) {
  console.log('Error: ', err);
}
