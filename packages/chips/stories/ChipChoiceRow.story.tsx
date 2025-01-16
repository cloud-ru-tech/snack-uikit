import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipChoiceRow, ChipChoiceRowProps } from '../src';
import { CHIP_CHOICE_ROW_SIZE } from '../src/components/ChipChoiceRow/constants';
import { Filters, filtersMock } from './helpers';
import { STORY_TEST_IDS } from './testIds';

const meta: Meta = {
  title: 'Components/Chips/ChipChoiceRow',
  component: ChipChoiceRow,
};
export default meta;

function Template({ ...args }: ChipChoiceRowProps<Filters>) {
  const [state, setState] = useState<Filters>((args.defaultValue ?? {}) as Filters);

  const exampleWithTonOfOptions = {
    type: 'multiple' as const,
    id: 'vms_multiple',
    label: 'Virtual machines (10k values with virtualization)',
    virtualized: true,
    options: Array.from({ length: 10000 }).map((_, i) => ({
      value: `vm-${i}`,
      label: `vm-${i}`,
    })),
    'data-test-id': STORY_TEST_IDS.MultiTonOfValues,
  };

  return (
    <div>
      <ChipChoiceRow<Filters>
        {...args}
        filters={[...args.filters, exampleWithTonOfOptions]}
        value={state}
        onChange={setState}
        data-test-id={STORY_TEST_IDS.Row}
      />
      <span style={{ opacity: 0 }} data-test-id={STORY_TEST_IDS.State}>
        {JSON.stringify(state)}
      </span>
    </div>
  );
}

export const chipChoiceRow: StoryObj<ChipChoiceRowProps<Filters>> = {
  render: Template,

  args: {
    filters: filtersMock,
    showClearAllButton: true,
    clearAllButtonLabel: 'Clear all',
    defaultValue: { vms: ['vm-1'] },
  },

  argTypes: {
    size: {
      options: Object.values(CHIP_CHOICE_ROW_SIZE),
      control: {
        type: 'radio',
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
