import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Radio, RadioProps } from '../src';
import { Size } from '../src/constants';

const meta: Meta = {
  title: 'Components/Toggles/Radio',
  component: Radio,
};
export default meta;

type StoryProps = RadioProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Radio {...args} />;

export const radio: StoryObj<StoryProps> = Template.bind({});

radio.args = {
  size: Size.M,
};

radio.argTypes = {};

radio.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/QMTZWkA2NyGgSA3ttpruU3/Toggles?type=design&node-id=0-1&t=0JBt65uPqKy9khD5-0',
  },
};
