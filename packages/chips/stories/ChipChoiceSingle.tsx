import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceSingleProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import {
  BASE_OPTIONS,
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

const Template: StoryFn<StoryProps> = ({
  useDefaultValue,
  useBaseOptions,
  showClickCounter,
  defaultValue,
  ...args
}: StoryProps) => (
  <ChipChoiceStoryWrap
    showClickCounter={showClickCounter}
    chipControlled={({ increaseCounter }) => (
      <ChipChoice.Single
        {...args}
        defaultValue={useDefaultValue ? defaultValue || BASE_OPTIONS[0].value : undefined}
        options={useBaseOptions ? BASE_OPTIONS : FILTER_OPTIONS}
        onClick={increaseCounter}
        label={CHIP_CHOICE_STORY_ARGS.label}
        dropDownClassName={styles.droplist}
      />
    )}
  />
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
