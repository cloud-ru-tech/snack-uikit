import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ProgressBar, ProgressBarProps } from '../src';

const meta: Meta = {
  title: 'Components/Loaders/Progress Bar',
  component: ProgressBar,
};
export default meta;

type StoryProps = ProgressBarProps;
const Template: StoryFn<StoryProps> = ({ ...args }: ProgressBarProps) => <ProgressBar {...args} />;

export const progressBar: StoryObj<StoryProps> = {
  render: Template,

  args: {
    progress: 30,
    size: 's',
  },

  argTypes: {
    progress: {
      name: 'Progress value',
      type: 'number',
    },
    size: {
      control: {
        type: 'radio',
      },
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A2&mode=design',
    },
  },
};
