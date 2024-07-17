import { EditorProps } from '@monaco-editor/react';
import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import { Typography } from '@snack-uikit/typography';

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
  hideLineNumbers: boolean;
  hasBackground: boolean;
} & EditorProps;

const Template: StoryFn<StoryProps> = (
  { hideLineNumbers, ...args }: CodeEditorProps & { hideLineNumbers: boolean },
  { globals }: StoryContext,
) => {
  const isDark = useDarkMode();

  const themeMode = isDark ? 'dark' : 'light';
  const brand = globals.brand;

  const themeClassName = Object.keys(globals).includes(brand) ? globals[brand][themeMode] : `${themeMode}_${brand}`;

  return (
    <>
      <div className={styles.wrapper}>
        <CodeEditor
          themeName={themeClassName}
          {...args}
          options={hideLineNumbers ? { lineNumbers: 'off', folding: false } : { lineNumbers: 'on', folding: true }}
        />
      </div>
      <Typography.MonoBodyS />
    </>
  );
};

export const codeEditor: StoryObj<StoryProps> = Template.bind({});

codeEditor.args = {
  width: '100%',
  height: '500px',
  language: 'typescript',
  value: CODE,
  hasBackground: true,
  hideLineNumbers: false,
  'data-test-id': 'code-editor',
};

codeEditor.argTypes = {
  hideLineNumbers: {
    name: '[Stories]: hide line numbers',
  },
};

codeEditor.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A264300&mode=design',
  },
};
