import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Spinner, SpinnerProps } from '../src';

const meta: Meta = {
  title: 'Components/Loaders/Spinner',
  component: Spinner,
};
export default meta;

type StoryProps = SpinnerProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Spinner {...args} />;

export const spinner: StoryObj<StoryProps> = Template.bind({});

spinner.args = {
  size: Spinner.sizes.S,
};

spinner.argTypes = {};

spinner.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/FtPyS58ZZtQorzjQcFRr7o/Loader?node-id=0%3A1&t=svmSDrEJNhN7ANYz-0',
  },
};
