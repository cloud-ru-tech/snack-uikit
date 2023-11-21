import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Switch as SwitchComponent, SwitchProps } from '../src';
import { Size } from '../src/constants';

const meta: Meta = {
  title: 'Components/Toggles/Switch',
  component: SwitchComponent,
};
export default meta;

type StoryProps = SwitchProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <SwitchComponent {...args} />;

export const Switch: StoryObj<StoryProps> = Template.bind({});

Switch.args = {
  size: Size.M,
};
Switch.argTypes = {};
Switch.parameters = {
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
