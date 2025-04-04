import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceCustomProps } from '../src';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.Custom,
};
export default meta;

type StoryProps = ChipChoiceCustomProps & ChipChoiceCustomStoryProps;

const Template: StoryFn<StoryProps> = ({ showClearButton, ...args }: StoryProps) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  const onClearButtonClick = showClearButton && selectedValue ? () => setSelectedValue(undefined) : undefined;

  return (
    <ChipChoice.Custom
      {...args}
      value={selectedValue}
      onChange={setSelectedValue}
      valueRender={() => selectedValue}
      onClearButtonClick={onClearButtonClick}
      content={() => (
        <button className={styles.customButton} onClick={() => setSelectedValue('value')}>
          click me to select value
        </button>
      )}
      // onClick={increaseCounter}
    />
  );
};

export const chipChoiceCustom: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...CHIP_CHOICE_STORY_ARGS,
    label: 'Custom',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A148671&mode=design',
    },
  },
};
