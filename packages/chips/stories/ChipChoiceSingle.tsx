import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceSingleProps } from '../src';
// import { ChipChoiceSingle } from '../src/components/NewChipChoice/components';
// import { ChipChoiceSingleProps } from '../src/components/NewChipChoice/types';
// import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import {
  CHIP_CHOICE_ARG_TYPES,
  CHIP_CHOICE_STORY_ARGS,
  ChipChoiceCustomStoryProps,
  FILTER_OPTIONS,
} from './chipChoice/constants';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.Single,
};
export default meta;

type StoryProps = ChipChoiceSingleProps & ChipChoiceCustomStoryProps;

const Template: StoryFn<StoryProps> = ({ ...args }: StoryProps) => (
  // const formatter = args.customFormatter
  //   ? (option?: { label: string }): string => option?.label.toUpperCase() || 'not'
  //   : undefined;

  <div style={{ display: 'flex', gap: 8 }}>
    <ChipChoice.Single {...args} options={FILTER_OPTIONS} label='Filter 1' />
  </div>
);
export const chipChoiceSingle: StoryObj<StoryProps> = Template.bind({});

chipChoiceSingle.args = CHIP_CHOICE_STORY_ARGS;

chipChoiceSingle.argTypes = CHIP_CHOICE_ARG_TYPES;

chipChoiceSingle.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A148671&mode=design',
  },
};
