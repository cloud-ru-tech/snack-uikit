import fs from 'fs';
import path from 'path';

import globConfig from '../../package.json';

const PackagesRootFolder = 'packages';

const Folders = {
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
    name: `@sbercloud/${globConfig.name}-${packageName}`,
    title: `${packageTitle}`,
    version: '0.0.0',
    sideEffects: ['*.css', '*.woff', '*.woff2'],
    description: `${packageDescription}`,
    main: './dist/esm/index.js',
    module: './dist/esm/index.js',
    homepage: `${globConfig.homepage}packages/${packageRootFolderName}`,
    repository: {
      type: 'git',
      url: globConfig.repository.url,
      directory: `packages/${packageRootFolderName}`,
    },
    author: `${user} <${email}>`,
    contributors: [`${user} <${email}>`],
    files: ['dist', 'src'],
    license: 'UNLICENSED',
    scripts: {},
    dependencies: {},
    devDependencies: {},
    peerDependencies: {
      '@linaria/core': '^3.0.0-beta.13',
      '@linaria/react': '^3.0.0-beta.13',
      react: '^17.0.0',
      'react-dom': '^17.0.0',
    },
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
\`npm i @sbercloud/${globConfig.name}-${packageName}\`

[Changelog](./CHANGELOG.md)

${packageDescription}
`;

  const readmeFile = path.join(`./${PackagesRootFolder}/${packageRootFolderName}/README.md`);

  fs.writeFileSync(readmeFile, readmeContent);
};

export const npmrc = ({ packageRootFolderName }: { packageRootFolderName: string }) => {
  const fileContent = `package-lock=false
save-exact=true
`;
  fs.writeFileSync(path.join(`./${PackagesRootFolder}/${packageRootFolderName}/.npmrc`), fileContent);
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
  const componentFilePath = path.join(
    `./${PackagesRootFolder}/${packageRootFolderName}/${Folders.srcComponents}/${componentName}.tsx`,
  );
  const componentFileContent = `export type ${componentName}Props = any;

export function ${componentName}(props: ${componentName}Props) {
  return <div />;
}
`;

  fs.writeFileSync(indexFilePath, indexFileContent);
  fs.writeFileSync(componentFilePath, componentFileContent);
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
  const fileContent =
    "import { Story, Meta } from '@storybook/react/types-6-0';\n\
import { " +
    `${componentName}, ${componentName}Props` +
    " } from '../src';\n\
\n\
import componentReadme from '../README.md';\n\
import componentChangelog from '../CHANGELOG.md';\n\
import componentPackage from '../package.json';\n\
\n\
export default {\n\
  title: 'Not stable/" +
    `${componentStoryTitle}` +
    "',\n\
  component: " +
    `${componentName}` +
    ',\n\
} as Meta;\n\
\n' +
    `const Template: Story<${componentName}Props> = ({ ...args }) => <${componentName} {...args} />;

` +
    'export const ' +
    `${componentStoryName}` +
    ' = Template.bind({});\n\
' +
    `${componentStoryName}` +
    '.args = {};\n\
' +
    `${componentStoryName}` +
    '.argTypes = {};\n\
' +
    `${componentStoryName}` +
    ".parameters = {\n\
  readme: {\n\
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],\n\
  },\n\
  design: {\n\
    name: 'Figma',\n\
    type: 'figma',\n\
    //TODO\n\
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',\n\
  },\n\
};\n\
";

  fs.writeFileSync(filePath, fileContent);
};
