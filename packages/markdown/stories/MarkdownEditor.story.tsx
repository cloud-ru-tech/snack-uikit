import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MarkdownEditor, MarkdownEditorProps } from '../src';
import { MODE } from '../src/constants';
import { MARKDOWN } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Markdown/Markdown Editor',
  component: MarkdownEditor,
};
export default meta;

const Template: StoryFn<MarkdownEditorProps> = ({ value, ...args }) => {
  const [innerValue, setInnerValue] = useState(value);

  return (
    <div className={styles.wrapper}>
      <MarkdownEditor
        {...args}
        value={innerValue}
        onChange={setInnerValue}
        onCodeCopyClick={() => toaster.userAction.success({ label: 'Скопировано' })}
      />
    </div>
  );
};

export const markdownEditor: StoryObj<MarkdownEditorProps> = {
  render: Template,
  args: {
    value: MARKDOWN,
    defaultMode: MODE.Edit,
    label: 'Full description with markdown',
    placeholder: 'Fill using markdown',
    required: true,
  },
  argTypes: {},
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-5.0.0?node-id=1444-818',
    },
  },
};
