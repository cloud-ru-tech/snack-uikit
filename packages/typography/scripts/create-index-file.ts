import { promises } from 'fs';

const FOLDER_PATH = 'src/components/generatedVariants/components';
const INDEX_FILE_PATH = 'src/components/generatedVariants/index.ts';

async function generateIndexFile(folderPath: string, outputPath: string) {
  try {
    const files = await promises.readdir(folderPath, { withFileTypes: true });
    const imports: string[] = [];
    const componentNames: string[] = [];

    for (const file of files) {
      const componentName = file.name.replace('.tsx', '');
      imports.push(`import { ${componentName} } from './components/${componentName}';`);
      componentNames.push(componentName);
    }

    const indexContent = `${imports.join('\n')}

export const generatedVariants = {
  ${componentNames.join(',\n  ')},
};\n`;

    await promises.writeFile(outputPath, indexContent);
    // eslint-disable-next-line no-console
    console.log('Generating typography index file successfully created!');
  } catch (err) {
    console.error('Error creating generating typography index file', err);
  }
}

generateIndexFile(FOLDER_PATH, INDEX_FILE_PATH);
