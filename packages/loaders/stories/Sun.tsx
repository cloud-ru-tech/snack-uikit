import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Sun, SunProps } from '../src';

export default {
  title: 'Components/Loaders/Sun',
  component: Sun,
} as Meta;

const Template: Story<SunProps> = ({ ...args }) => <Sun {...args} />;

export const sun = Template.bind({});

sun.args = {
  size: Sun.sizes.SizeS,
};

sun.argTypes = {};

sun.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/FtPyS58ZZtQorzjQcFRr7o/Loader?node-id=1%3A31&t=Ym7P2m5gHYfdtYOn-0',
  },
};
