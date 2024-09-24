import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Radio, RadioProps } from '../src';
import { SIZE } from '../src/constants';

const meta: Meta = {
  title: 'Components/Toggles/Radio',
  component: Radio,
};
export default meta;

type StoryProps = RadioProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Radio {...args} />;

export const radio: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: SIZE.M,
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
