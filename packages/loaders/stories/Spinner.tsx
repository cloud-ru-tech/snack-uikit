import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Spinner, SpinnerProps } from '../src';
import { LOADER_SIZE } from '../src/components/constants';

const meta: Meta = {
  title: 'Components/Loaders/Spinner',
  component: Spinner,
};
export default meta;

type StoryProps = SpinnerProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Spinner {...args} />;

export const spinner: StoryObj<StoryProps> = Template.bind({});

spinner.args = {
  size: LOADER_SIZE.S,
};

spinner.argTypes = {
  size: {
    options: Object.values(LOADER_SIZE),
    control: {
      type: 'radio',
    },
  },
};

spinner.parameters = {
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
