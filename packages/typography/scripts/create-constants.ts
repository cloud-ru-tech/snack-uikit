import { promises } from 'fs';
import { parse } from 'path';

const FOLDER_PATH = 'src/components/generatedVariants/components';
const CONSTANTS_FILE_PATH = 'src/components/generatedVariants/constants.ts';
async function createConstantsFile(folderPath: string, outputPath: string) {
  try {
    const fileNames = await promises.readdir(folderPath);
    const array = fileNames.map(fileName => {
      const componentName = parse(fileName).name;
      return `'${componentName}'`;
    });

    const fileContent = `export const VARIANTS = [\n  ${array.join(',\n  ')},\n] as const;\n`;

    await promises.writeFile(outputPath, fileContent);
    // eslint-disable-next-line no-console
    console.log('File constants.ts successfully created!');
  } catch (err) {
    console.error('Error creating constants.ts', err);
  }
}

createConstantsFile(FOLDER_PATH, CONSTANTS_FILE_PATH);
