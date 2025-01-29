import { Meta, StoryObj } from '@storybook/react';
import { useLayoutEffect, useMemo, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoiceRow, ChipChoiceRowProps } from '../src';
import { CHIP_CHOICE_ROW_SIZE } from '../src/components/ChipChoiceRow/constants';
import { DEFAULT_VALUES, STORY_TEST_IDS } from './forTests';
import { Filters, filtersMock } from './helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/ChipChoiceRow',
  component: ChipChoiceRow,
};
export default meta;

type StoryProps = ChipChoiceRowProps<Filters> & {
  useDefaultValues: boolean;
};

function Template({ useDefaultValues, ...args }: StoryProps) {
  const defaultValue = useMemo(
    () => (useDefaultValues ? args.defaultValue : {}) as Filters,
    [args.defaultValue, useDefaultValues],
  );
  const [state, setState] = useState<Filters>(defaultValue);
  const [visibleFilters, setVisibleFilters] = useState<string[]>(Object.keys(state ?? {}));

  useLayoutEffect(() => {
    setState(defaultValue);
    setVisibleFilters(Object.keys(defaultValue ?? {}));
  }, [defaultValue, useDefaultValues]);

  return (
    <>
      <div className={styles.chipChoiceRowWrapper}>
        <ChipChoiceRow<Filters>
          {...args}
          value={state}
          onChange={setState}
          visibleFilters={visibleFilters}
          onVisibleFiltersChange={setVisibleFilters}
        />
      </div>

      <span style={{ opacity: 0 }} data-test-id={STORY_TEST_IDS.State}>
        {JSON.stringify(state)}
      </span>
    </>
  );
}

export const chipChoiceRow: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: 's',
    filters: filtersMock,
    showClearButton: true,
    showAddButton: true,
    useDefaultValues: true,
    defaultValue: DEFAULT_VALUES as Filters,
  },

  argTypes: {
    size: {
      options: Object.values(CHIP_CHOICE_ROW_SIZE),
      control: {
        type: 'radio',
      },
    },
    useDefaultValues: {
      name: '[Story] use default values',
      type: 'boolean',
    },
    defaultValue: {
      if: {
        arg: 'useDefaultValues',
        eq: true,
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A152236&mode=design',
    },
  },
};
