import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Sun, SunProps } from '../src';
import { LOADER_SIZE } from '../src/components/constants';

const meta: Meta = {
  title: 'Components/Loaders/Sun',
  component: Sun,
};
export default meta;

type StoryProps = SunProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Sun {...args} />;

export const sun: StoryObj<StoryProps> = Template.bind({});

sun.args = {
  size: LOADER_SIZE.S,
};

sun.argTypes = {
  size: {
    options: Object.values(LOADER_SIZE),
    control: {
      type: 'radio',
    },
  },
};

sun.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A2&mode=design',
  },
};
