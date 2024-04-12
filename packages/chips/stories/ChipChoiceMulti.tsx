import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceMultipleProps } from '../src';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, FILTER_OPTIONS } from './chipChoice/constants';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.Multiple,
};
export default meta;

type StoryProps = ChipChoiceMultipleProps;

const Template: StoryFn<StoryProps> = ({ ...args }: StoryProps) => (
  <div style={{ display: 'flex', gap: 8 }}>
    <ChipChoice.Multiple {...args} options={FILTER_OPTIONS} />
  </div>
);
export const chipChoiceMulti: StoryObj<StoryProps> = Template.bind({});

chipChoiceMulti.args = {
  ...CHIP_CHOICE_STORY_ARGS,
};

chipChoiceMulti.argTypes = CHIP_CHOICE_ARG_TYPES;

chipChoiceMulti.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A147240&mode=design',
  },
};
