import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Checkbox, CheckboxProps } from '../src';
import { Size } from '../src/constants';

const meta: Meta = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
};
export default meta;

type StoryProps = CheckboxProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Checkbox {...args} />;

export const checkbox: StoryObj<StoryProps> = Template.bind({});

checkbox.args = {
  size: Size.M,
};

checkbox.argTypes = {};

checkbox.parameters = {
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
