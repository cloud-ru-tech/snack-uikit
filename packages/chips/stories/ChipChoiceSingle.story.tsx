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
  showClearButton,
  defaultValue,
  ...args
}: StoryProps) => (
  <ChipChoiceStoryWrap
    showClickCounter={showClickCounter}
    showClearButton={showClearButton}
    defaultValue={useDefaultValue ? defaultValue || BASE_OPTIONS[0].value : undefined}
    chipControlled={({ increaseCounter, ...props }) => (
      <ChipChoice.Single
        {...args}
        {...props}
        options={useBaseOptions ? BASE_OPTIONS : FILTER_OPTIONS}
        onClick={increaseCounter}
        dropDownClassName={styles.droplist}
      />
    )}
  />
);

export const chipChoiceSingle: StoryObj<StoryProps> = {
  render: Template,
  args: {
    ...CHIP_CHOICE_STORY_ARGS,
    useBaseOptions: false,
    scrollToSelectedItem: false,
    autoApply: true,
  },
  argTypes: {
    ...CHIP_CHOICE_ARG_TYPES,
    useBaseOptions: {
      name: '[Stories]: BaseOptions',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A148671&mode=design',
    },
  },
};
