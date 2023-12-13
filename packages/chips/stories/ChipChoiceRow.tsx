import { Meta, StoryFn } from '@storybook/react';
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

  return (
    <div>
      <ChipChoiceRow<Filters> {...args} value={state} onChange={setState} data-test-id={STORY_TEST_IDS.Row} />
      <span style={{ opacity: 0 }} data-test-id={STORY_TEST_IDS.State}>
        {JSON.stringify(state)}
      </span>
    </div>
  );
}

export const chipChoiceRow: StoryFn<ChipChoiceRowProps<Filters>> = Template.bind({});
chipChoiceRow.args = {
  filters: filtersMock,
  showClearAllButton: true,
  clearAllButtonLabel: 'Clear all',
  defaultValue: { vms: ['vm-1'] },
};

chipChoiceRow.argTypes = {
  size: {
    options: Object.values(CHIP_CHOICE_ROW_SIZE),
    control: {
      type: 'radio',
    },
  },
};

chipChoiceRow.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=54371-259099&t=DfI6vH1Hrazas0NB-0',
  },
};
