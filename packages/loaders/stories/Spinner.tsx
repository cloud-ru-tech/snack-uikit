import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Spinner, SpinnerProps } from '../src';

export default {
  title: 'Components/Loaders/Spinner',
  component: Spinner,
} as Meta;

const Template: Story<SpinnerProps> = ({ ...args }) => <Spinner {...args} />;

export const spinner = Template.bind({});

spinner.args = {
  size: Spinner.sizes.SizeS,
};

spinner.argTypes = {};

spinner.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/FtPyS58ZZtQorzjQcFRr7o/Loader?node-id=0%3A1&t=svmSDrEJNhN7ANYz-0',
  },
};
