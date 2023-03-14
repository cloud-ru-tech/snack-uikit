import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ProgressBar, ProgressBarProps } from '../src';

export default {
  title: 'Components/Loaders/Progress Bar',
  component: ProgressBar,
} as Meta;

const Template: Story<ProgressBarProps> = ({ ...args }) => <ProgressBar {...args} />;

export const progressBar = Template.bind({});

progressBar.args = {
  progress: 30,
  size: ProgressBar.sizes.SizeS,
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
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/FtPyS58ZZtQorzjQcFRr7o/Loader?node-id=23%3A337&t=svmSDrEJNhN7ANYz-0',
  },
};
