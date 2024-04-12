import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceDateProps } from '../src';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.Date,
};
export default meta;

type StoryProps = ChipChoiceDateProps & ChipChoiceCustomStoryProps;

const Template: StoryFn<StoryProps> = ({ useDefaultValue, ...args }: StoryProps) => {
  const formatter = args.customFormatter ? (value?: Date): string => value?.toUTCString() || 'empty' : undefined;

  return (
    <ChipChoice.Date
      {...args}
      defaultValue={useDefaultValue ? new Date(2023, 10, 15) : undefined}
      valueRender={formatter}
    />
  );
};

export const chipChoiceDate: StoryObj<StoryProps> = Template.bind({});

chipChoiceDate.args = {
  ...CHIP_CHOICE_STORY_ARGS,
  useDefaultValue: false,
};

chipChoiceDate.argTypes = CHIP_CHOICE_ARG_TYPES;

chipChoiceDate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A150102&mode=design',
  },
};
