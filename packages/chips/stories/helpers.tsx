import { ChipChoiceRowProps } from '../src';
import { CustomContentRenderProps } from '../src/components/ChipChoice/components';
import { STORY_TEST_IDS } from './testIds';

export type Filters = {
  vms: string[];
  ip: string;
  tags: string[];
  dates: Date[];
  test: string;
};

export const filtersMock: ChipChoiceRowProps<Filters>['filters'] = [
  {
    type: 'multiple',
    id: 'vms',
    label: 'Virtual machines',
    options: [
      { value: 'vm-1', label: 'Vm-1' },
      { value: 'vm-2', label: 'Vm-2' },
      { value: 'vm-3', label: 'Vm-3' },
    ],
    'data-test-id': STORY_TEST_IDS.Multi,
  },
  {
    type: 'single',
    id: 'ip',
    label: 'External IP',
    options: [
      { value: 'true', label: 'On' },
      { value: 'false', label: 'Off' },
    ],
    'data-test-id': STORY_TEST_IDS.Single,
  },
  {
    type: 'date',
    id: 'dates',
    label: 'Created at',
    'data-test-id': STORY_TEST_IDS.Date,
  },
  {
    type: 'date-range',
    id: 'dateRange',
    label: 'Period',
    'data-test-id': STORY_TEST_IDS.DateRange,
  },
  {
    type: 'custom',
    id: 'test',
    label: 'Custom',
    'data-test-id': 'custom',
    valueRender: (value: string) => value ?? 'all',
    content: ({ closeDroplist, value, onChange }: CustomContentRenderProps<string>) => (
      <div>
        <input placeholder='Placeholder' value={value} onChange={e => onChange?.(e.target.value)} />
        <button onClick={closeDroplist}>Close</button>
      </div>
    ),
  },
];
