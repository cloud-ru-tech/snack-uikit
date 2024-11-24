import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceDateProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';
import { getBuildCellProps } from './helpers';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.Date,
};
export default meta;

type StoryProps = ChipChoiceDateProps &
  ChipChoiceCustomStoryProps & {
    modeBuildCellProps: 'disable-past' | 'none';
  };

const Template: StoryFn<StoryProps> = ({
  useDefaultValue,
  showClickCounter,
  modeBuildCellProps,
  ...args
}: StoryProps) => {
  const formatter = args.customFormatter ? (value?: Date): string => value?.toUTCString() || 'empty' : undefined;

  return (
    <ChipChoiceStoryWrap
      showClickCounter={showClickCounter}
      chipControlled={({ increaseCounter }) => (
        <ChipChoice.Date
          {...args}
          defaultValue={useDefaultValue ? new Date('2023-10-15') : undefined}
          valueRender={formatter}
          onClick={increaseCounter}
          buildCalendarCellProps={getBuildCellProps(modeBuildCellProps)}
        />
      )}
    />
  );
};

export const chipChoiceDate: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...CHIP_CHOICE_STORY_ARGS,
    modeBuildCellProps: 'none',
    mode: 'date',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    showSeconds: true,
    useDefaultValue: false,
  },

  argTypes: {
    ...CHIP_CHOICE_ARG_TYPES,
    modeBuildCellProps: {
      name: '[story] select buildCalendarCellProps operating mode',
      options: ['disable-past', 'none'],
      control: { type: 'radio' },
    },
    showSeconds: {
      if: {
        arg: 'mode',
        eq: 'date-time',
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A150102&mode=design',
    },
  },
};
