import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceTimeProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.Time,
};
export default meta;

type StoryProps = ChipChoiceTimeProps & ChipChoiceCustomStoryProps;

const DEFAULT_VALUE: ChipChoiceTimeProps['value'] = {
  hours: 20,
  minutes: 15,
  seconds: 30,
};

const Template: StoryFn<StoryProps> = ({ useDefaultValue, showClickCounter, ...args }: StoryProps) => {
  const formatter = args.customFormatter
    ? (value?: ChipChoiceTimeProps['value']): string => {
        if (!value) return 'empty';

        return `${value.hours}-${value.minutes}-${value.seconds}`;
      }
    : undefined;

  return (
    <ChipChoiceStoryWrap
      showClickCounter={showClickCounter}
      chipControlled={({ increaseCounter }) => (
        <ChipChoice.Time
          {...args}
          defaultValue={useDefaultValue ? DEFAULT_VALUE : undefined}
          valueRender={formatter}
          onClick={increaseCounter}
        />
      )}
    />
  );
};

export const chipChoiceTime: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...CHIP_CHOICE_STORY_ARGS,
    useDefaultValue: false,
  },

  argTypes: CHIP_CHOICE_ARG_TYPES,

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
