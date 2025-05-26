import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Markdown, MarkdownProps } from '../src';
import { MARKDOWN } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Markdown/Markdown',
  component: Markdown,
};
export default meta;

const Template: StoryFn<MarkdownProps> = ({ ...args }) => (
  <div className={styles.wrapper}>
    <Markdown {...args} onCopyClick={() => toaster.userAction.success({ label: 'Скопировано' })} />
  </div>
);

export const markdown: StoryObj<MarkdownProps> = {
  render: Template,
  args: {
    value: MARKDOWN,
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
