import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Sun, SunProps } from '../src';

const meta: Meta = {
  title: 'Components/Loaders/Sun',
  component: Sun,
};
export default meta;

type StoryProps = SunProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Sun {...args} />;

export const sun: StoryObj<StoryProps> = Template.bind({});

sun.args = {
  size: Sun.sizes.S,
};

sun.argTypes = {};

sun.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/FtPyS58ZZtQorzjQcFRr7o/Loader?node-id=0%3A1&t=svmSDrEJNhN7ANYz-0',
  },
};
