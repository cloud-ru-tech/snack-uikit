import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoice, ChipChoiceMultiProps } from '../src';
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
  component: ChipChoice.Multi,
};
export default meta;

type StoryProps = ChipChoiceMultiProps & ChipChoiceCustomStoryProps;

function Chips(props: Omit<ChipChoiceMultiProps, 'options'>) {
  return (
    <>
      <div className={styles.cell}>
        <ChipChoice.Multi {...props} label={CHIP_CHOICE_STORY_ARGS.label} options={FILTER_OPTIONS} />
      </div>

      <div className={styles.cell}>
        <ChipChoice.Multi
          {...props}
          label={CHIP_CHOICE_STORY_ARGS.label}
          options={FILTER_OPTIONS}
          icon={<PlaceholderSVG />}
        />
      </div>
    </>
  );
}

const Template: StoryFn<StoryProps> = ({ showClickCounter, useDefaultValue, ...args }: StoryProps) => {
  const formatter = args.customFormatter
    ? (options: { label: string }[]): string =>
        options.length === FILTER_OPTIONS.length ? 'all' : (options.length && `+${options.length}`) || 'empty'
    : undefined;

  return (
    <ChipChoiceStoryWrap
      showClickCounter={showClickCounter}
      chipControlled={({ increaseCounter }) => (
        <ChipChoice.Multi
          {...args}
          onClick={increaseCounter}
          options={FILTER_OPTIONS}
          valueFormatter={formatter}
          defaultValue={useDefaultValue ? [FILTER_OPTIONS[0].value] : undefined}
        />
      )}
    >
      {({ size }) => (
        <>
          <Chips size={size} />
          <Chips size={size} loading />
          <Chips size={size} disabled />
          <Chips size={size} value={[FILTER_OPTIONS[0].value]} />
        </>
      )}
    </ChipChoiceStoryWrap>
  );
};

export const chipChoiceMulti: StoryObj<StoryProps> = Template.bind({});

chipChoiceMulti.args = {
  ...CHIP_CHOICE_STORY_ARGS,
  useDefaultValue: false,
};

chipChoiceMulti.argTypes = CHIP_CHOICE_ARG_TYPES;

chipChoiceMulti.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A147240&mode=design',
  },
};
