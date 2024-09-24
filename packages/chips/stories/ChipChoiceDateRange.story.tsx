import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceDateRangeProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.DateRange,
};
export default meta;

type StoryProps = ChipChoiceDateRangeProps & ChipChoiceCustomStoryProps;

const Template: StoryFn<StoryProps> = ({ useDefaultValue, showClickCounter, ...args }: StoryProps) => {
  const formatter = args.customFormatter
    ? (value?: [Date, Date]): string => {
        if (!value || !value.length) return 'all dates';

        return value.map(val => val.toUTCString()).join('//');
      }
    : undefined;

  return (
    <ChipChoiceStoryWrap
      showClickCounter={showClickCounter}
      chipControlled={({ increaseCounter }) => (
        <ChipChoice.DateRange
          {...args}
          defaultValue={useDefaultValue ? [new Date('2022-10-15'), new Date('2023-10-15')] : undefined}
          onClick={increaseCounter}
          label={CHIP_CHOICE_STORY_ARGS.label}
          valueRender={formatter}
        />
      )}
    />
  );
};

export const chipChoiceDateRange: StoryObj<StoryProps> = {
  render: Template,
  args: { ...CHIP_CHOICE_STORY_ARGS, useDefaultValue: false },
  argTypes: CHIP_CHOICE_ARG_TYPES,

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A151169&mode=design',
    },
  },
};
