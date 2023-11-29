import { EditorProps } from '@monaco-editor/react';
import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CodeEditor, CodeEditorProps } from '../src';
import { CODE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Code Editor',
  component: CodeEditor,
};

export default meta;

type StoryProps = {
  themeClassName: string;
  'data-test-id': string;
} & Omit<EditorProps, 'theme'>;

const Template: StoryFn<StoryProps> = (args: CodeEditorProps, { globals }: StoryContext) => {
  const isDark = useDarkMode();

  const themeMode = isDark ? 'dark' : 'light';
  const brand = globals.brand;

  const themeClassName = Object.keys(globals).includes(brand) ? globals[brand][themeMode] : `${themeMode}_${brand}`;

  return (
    <div className={styles.wrapper}>
      <CodeEditor {...args} themeClassName={themeClassName} />
    </div>
  );
};

export const codeEditor: StoryObj<StoryProps> = Template.bind({});

codeEditor.args = {
  width: '100%',
  height: '500px',
  language: 'typescript',
  value: CODE,
};

codeEditor.argTypes = {};

codeEditor.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/GA5vmv2u63YQxinoxsu00W/Code-Editor?type=design&node-id=0%3A1&mode=design&t=d7SG1WNNEs66xSRr-1',
  },
};
