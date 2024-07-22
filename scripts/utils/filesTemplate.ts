import fs from 'fs';
import path from 'path';

import globConfig from '../../package.json';
import globTSConfig from '../../packages/tsconfig.json';
import { DOCGEN_SECTION_PLACEHOLDER_END, DOCGEN_SECTION_PLACEHOLDER_START } from '../docgen/constants';

const PackagesRootFolder = 'packages';

const Folders: Record<string, string> = {
  root: '/',
  src: '/src',
  stories: '/stories',
  srcComponents: '/src/components',
};

export const createFolderStructure = ({ packageRootFolderName }: { packageRootFolderName: string }) => {
  for (const folder in Folders) {
    fs.mkdirSync(`./${PackagesRootFolder}/${packageRootFolderName}/${Folders[folder]}`);
  }
};

export const packageJson = ({
  user,
  email,
  packageTitle,
  packageName,
  packageDescription,
  packageRootFolderName,
}: {
  user: string;
  email: string;
  packageTitle: string;
  packageName: string;
  packageDescription: string;
  packageRootFolderName: string;
}) => {
  const config = {
    name: `@${globConfig.name}/${packageName}`,
    publishConfig: {
      access: 'public',
    },
    title: `${packageTitle}`,
    version: '0.0.0',
    sideEffects: ['*.css', '*.woff', '*.woff2'],
    description: `${packageDescription}`,
    main: './dist/index.js',
    module: './dist/index.js',
    homepage: `${globConfig.homepage}packages/${packageRootFolderName}`,
    repository: {
      type: 'git',
      url: globConfig.repository.url,
      directory: `packages/${packageRootFolderName}`,
    },
    author: `${user} <${email}>`,
    contributors: [`${user} <${email}>`],
    files: ['dist', 'src', './CHANGELOG.md', './LICENSE'],
    license: 'Apache-2.0',
    scripts: {},
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
  };

  const packageJsonFile = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/package.json`);

  fs.writeFileSync(packageJsonFile, JSON.stringify(config, null, 2));
};

export const changelog = ({ packageRootFolderName }: { packageRootFolderName: string }) => {
  // Whitespace in this const is intentional, since it defines how the markdown is shown
  const changelogContent = `## CHANGELOG

### v0.0.0

- Initial version
`;

  const file = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/CHANGELOG.md`);

  fs.writeFileSync(file, changelogContent);
};

export const readme = ({
  packageRootFolderName,
  packageTitle,
  packageDescription,
  packageName,
}: {
  packageRootFolderName: string;
  packageTitle: string;
  packageDescription: string;
  packageName: string;
}) => {
  // Whitespace in this const is intentional, since it defines how the markdown is shown
  const readmeContent = `# ${packageTitle}

## Installation
\`npm i @${globConfig.name}/${packageName}\`

[Changelog](./CHANGELOG.md)

${packageDescription}

${DOCGEN_SECTION_PLACEHOLDER_START}
${DOCGEN_SECTION_PLACEHOLDER_END}
`;

  const readmeFile = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/README.md`);

  fs.writeFileSync(readmeFile, readmeContent);
};

export const license = ({ packageRootFolderName }: { packageRootFolderName: string }) => {
  const src = path.join('./LICENSE');
  const dist = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/LICENSE`);

  fs.copyFileSync(src, dist);
};

export const tsConfig = ({ packageRootFolderName }: { packageRootFolderName: string }) => {
  const fileContent = `{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["./src", "../../types"],
  "exclude": ["./dist"]
}`;

  fs.writeFileSync(path.join(`./${PackagesRootFolder}/${packageRootFolderName}/tsconfig.json`), fileContent);
};

export const componentEntry = ({
  componentName,
  packageRootFolderName,
}: {
  componentName: string;
  packageRootFolderName: string;
}) => {
  const indexFilePath = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/${Folders.srcComponents}/index.ts`);

  const indexFileContent = `export * from './${componentName}';
`;

  const className = `${componentName[0].toLowerCase()}${componentName.substring(1)}`;

  const componentFilePath = path.join(
    `./${PackagesRootFolder}/${packageRootFolderName}/${Folders.srcComponents}/${componentName}.tsx`,
  );
  const componentFileContent = `import styles from './styles.module.scss';

export type ${componentName}Props = any;

export function ${componentName}(props: ${componentName}Props) {
  return <div className={styles.${className}} />;
}
`;

  const stylesFilePath = path.join(
    `./${PackagesRootFolder}/${packageRootFolderName}/${Folders.srcComponents}/styles.module.scss`,
  );
  const stylesFileContent = `// todo: update path to the correct one
// @import '@snack-uikit/figma-tokens/build/scss/components/styles-tokens-${className}';

.${className} {
  box-sizing: border-box;
}
`;

  fs.writeFileSync(indexFilePath, indexFileContent);
  fs.writeFileSync(componentFilePath, componentFileContent);
  fs.writeFileSync(stylesFilePath, stylesFileContent);
};

export const packageEntry = ({ packageRootFolderName }: { packageRootFolderName: string }) => {
  const filePath = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/${Folders.src}/index.ts`);

  const fileContent = `export * from './components';
`;

  fs.writeFileSync(filePath, fileContent);
};

export const storyEntry = ({
  componentName,
  packageRootFolderName,
}: {
  componentName: string;
  packageRootFolderName: string;
}) => {
  const filePath = path.join(
    `./${PackagesRootFolder}/${packageRootFolderName}/${Folders.stories}/${componentName}.tsx`,
  );
  const componentStoryName = componentName.replace(/[A-Z]/, x => x.toLowerCase());
  const componentStoryTitle = componentName.split(/(?=[A-Z])/).join(' ');
  const fileContent = `import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ${componentName}, ${componentName}Props } from '../src';

const meta: Meta = {
  title: 'Components/${componentStoryTitle}',
  component: ${componentName},
};
export default meta;

const Template: StoryFn<${componentName}Props> = ({ ...args }: ${componentName}Props) => <${componentName} {...args} />;

export const ${componentStoryName}: StoryObj<${componentName}Props> = Template.bind({});

${componentStoryName}.args = {};

${componentStoryName}.argTypes = {};

${componentStoryName}.parameters = {
  readme: {
    sidebar: [\`Latest version: $\{componentPackage.version}\`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};`;

  fs.writeFileSync(filePath, fileContent);
};

export const globalTsConfig = ({ packageRootFolderName }: { packageRootFolderName: string }) => {
  const packagePath = `./${packageRootFolderName}`;

  if (!globTSConfig.references.find(({ path }) => path === packagePath)) {
    globTSConfig.references.push({ path: packagePath });
    fs.writeFileSync(`./${PackagesRootFolder}/tsconfig.json`, JSON.stringify(globTSConfig, null, 2));
  }
};
