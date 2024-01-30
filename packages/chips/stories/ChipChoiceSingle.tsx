import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceSingleProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import {
  CHIP_CHOICE_ARG_TYPES,
  CHIP_CHOICE_STORY_ARGS,
  ChipChoiceCustomStoryProps,
  FILTER_OPTIONS,
} from './chipChoice/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.Single,
};
export default meta;

type StoryProps = ChipChoiceSingleProps & ChipChoiceCustomStoryProps;

function Chips(props: Omit<ChipChoiceSingleProps, 'options'>) {
  return (
    <>
      <div className={styles.cell}>
        <ChipChoice.Single {...props} label={CHIP_CHOICE_STORY_ARGS.label} options={FILTER_OPTIONS} />
      </div>

      <div className={styles.cell}>
        <ChipChoice.Single
          {...props}
          label={CHIP_CHOICE_STORY_ARGS.label}
          options={FILTER_OPTIONS}
          icon={<PlaceholderSVG />}
        />
      </div>
    </>
  );
}

const Template: StoryFn<StoryProps> = ({ showClickCounter, useDefaultValue, defaultValue, ...args }: StoryProps) => {
  const formatter = args.customFormatter
    ? (option?: { label: string }): string => option?.label.toUpperCase() || 'not'
    : undefined;

  return (
    <ChipChoiceStoryWrap
      showClickCounter={showClickCounter}
      chipControlled={({ increaseCounter }) => (
        <ChipChoice.Single
          {...args}
          onClick={increaseCounter}
          options={FILTER_OPTIONS}
          defaultValue={useDefaultValue ? defaultValue || FILTER_OPTIONS[0].value : undefined}
          valueFormatter={formatter}
        />
      )}
    >
      {({ size }) => (
        <>
          <Chips size={size} />
          <Chips size={size} loading />
          <Chips size={size} disabled />
          <Chips size={size} value={FILTER_OPTIONS[0].value} />
        </>
      )}
    </ChipChoiceStoryWrap>
  );
};

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
