import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceCustomProps } from '../src';
import { ChipChoiceStoryWrap } from './chipChoice/ChipChoiceStoryWrap';
import { CHIP_CHOICE_ARG_TYPES, CHIP_CHOICE_STORY_ARGS, ChipChoiceCustomStoryProps } from './chipChoice/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/ChipChoice',
  component: ChipChoice.Custom,
};
export default meta;

type StoryProps = ChipChoiceCustomProps & ChipChoiceCustomStoryProps;

function Chips(props: Omit<ChipChoiceCustomProps, 'options'>) {
  return (
    <>
      <div className={styles.cell}>
        <ChipChoice.Custom {...props} />
      </div>

      <div className={styles.cell}>
        <ChipChoice.Custom {...props} icon={<PlaceholderSVG />} />
      </div>
    </>
  );
}

const Template: StoryFn<StoryProps> = ({ showClickCounter, ...args }: StoryProps) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  return (
    <ChipChoiceStoryWrap
      showClickCounter={showClickCounter}
      chipControlled={({ increaseCounter }) => (
        <ChipChoice.Custom
          {...args}
          onClearButtonClick={() => setSelectedValue(undefined)}
          value={selectedValue}
          valueToRender={selectedValue}
          onClick={increaseCounter}
        >
          <button className={styles.customButton} onClick={() => setSelectedValue('value')}>
            click me to select value
          </button>
        </ChipChoice.Custom>
      )}
    >
      {({ size }) => (
        <>
          <Chips label={args.label} size={size} />
          <Chips label={args.label} size={size} loading />
          <Chips label={args.label} size={size} disabled />
          <Chips label={args.label} size={size} valueToRender='value' />
        </>
      )}
    </ChipChoiceStoryWrap>
  );
};

export const chipChoiceCustom: StoryObj<StoryProps> = Template.bind({});

chipChoiceCustom.args = {
  ...CHIP_CHOICE_STORY_ARGS,
  label: 'Custom:',
};

chipChoiceCustom.argTypes = CHIP_CHOICE_ARG_TYPES;

chipChoiceCustom.parameters = {
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
