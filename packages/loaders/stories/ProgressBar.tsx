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

export const progressBar: StoryObj<StoryProps> = Template.bind({});

progressBar.args = {
  progress: 30,
  size: ProgressBar.sizes.S,
};

progressBar.argTypes = {
  progress: {
    name: 'Progress value',
    type: 'number',
  },
};

progressBar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/FtPyS58ZZtQorzjQcFRr7o/Loader?node-id=23%3A337&t=svmSDrEJNhN7ANYz-0',
  },
};
