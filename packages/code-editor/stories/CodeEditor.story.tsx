import { EditorProps } from '@monaco-editor/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import * as monaco from 'monaco-editor';
import { useDarkMode } from 'storybook-dark-mode';

import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CodeEditor, loader, WithJsonSchema } from '../src';
import { CODE, JSON_SCHEMA } from './constants';
import styles from './styles.module.scss';

loader.config({ monaco });

const meta: Meta = {
  title: 'Components/Code Editor',
  component: CodeEditor,
};

export default meta;

type CombinedEditorStory = EditorProps & Pick<WithJsonSchema, 'jsonSchema'>;

type StoryProps = {
  themeClassName: string;
  'data-test-id': string;
  hideLineNumbers: boolean;
  hasBackground: boolean;
} & CombinedEditorStory;

const Template: StoryFn<StoryProps> = ({ hideLineNumbers, themeClassName, ...args }: StoryProps) => (
  <>
    <div className={styles.wrapper}>
      <CodeEditor
        themeName={themeClassName}
        {...(args as EditorProps)}
        options={hideLineNumbers ? { lineNumbers: 'off', folding: false } : { lineNumbers: 'on', folding: true }}
      />
    </div>
    <Typography.MonoBodyS />
  </>
);

export const codeEditor: StoryObj<StoryProps> = {
  render: Template,
  decorators: [
    (Story, { globals, args }) => {
      const isDark = useDarkMode();

      const themeMode = isDark ? 'dark' : 'light';
      const brand = globals.brand;

      const themeClassName = Object.keys(globals).includes(brand) ? globals[brand][themeMode] : `${themeMode}_${brand}`;
      return <Story args={{ ...args, themeClassName }} />;
    },
  ],

  args: {
    width: '100%',
    height: '500px',
    language: 'typescript',
    value: CODE,
    jsonSchema: JSON_SCHEMA,
    hasBackground: true,
    hideLineNumbers: false,
    'data-test-id': 'code-editor',
  },

  argTypes: {
    hideLineNumbers: {
      name: '[Stories]: hide line numbers',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A264300&mode=design',
    },
  },
};
