import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceDateRangeProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.DateRange,
};
export default meta;

type StoryProps = ChipChoiceDateRangeProps & ChipChoiceCustomStoryProps;

function Chips(props: ChipChoiceDateRangeProps) {
  return (
    <>
      <div className={styles.cell}>
        <ChipChoice.DateRange {...props} label={CHIP_CHOICE_STORY_ARGS.label} />
      </div>

      <div className={styles.cell}>
        <ChipChoice.DateRange {...props} label={CHIP_CHOICE_STORY_ARGS.label} icon={<PlaceholderSVG />} />
      </div>
    </>
  );
}

const Template: StoryFn<StoryProps> = ({ showClickCounter, useDefaultValue, ...args }: StoryProps) => {
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
          defaultValue={useDefaultValue ? [new Date(2022, 10, 15), new Date(2023, 10, 15)] : undefined}
          onClick={increaseCounter}
          valueFormatter={formatter}
        />
      )}
    >
      {({ size }) => (
        <>
          <Chips size={size} />
          <Chips size={size} loading />
          <Chips size={size} disabled />
          <Chips size={size} value={[new Date(), new Date()]} />
        </>
      )}
    </ChipChoiceStoryWrap>
  );
};

export const chipChoiceDateRange: StoryObj<StoryProps> = Template.bind({});

chipChoiceDateRange.args = { ...CHIP_CHOICE_STORY_ARGS, useDefaultValue: false };

chipChoiceDateRange.argTypes = CHIP_CHOICE_ARG_TYPES;

chipChoiceDateRange.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/yoQDw4aDFiTQ1uWnxQtTmB/branch/7PiOcQdqgGzv8BmV02GFeI/Chips?type=design&node-id=875-5839&t=B2sJyLM0LLwNlQEq-0',
  },
};
