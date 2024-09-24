import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Switch as SwitchComponent, SwitchProps } from '../src';
import { SIZE } from '../src/constants';

const meta: Meta = {
  title: 'Components/Toggles/Switch',
  component: SwitchComponent,
};
export default meta;

type StoryProps = SwitchProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <SwitchComponent {...args} />;

export const Switch: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: SIZE.M,
    showIcon: false,
    loading: false,
    disabled: false,
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A4&mode=design',
    },
  },
};
