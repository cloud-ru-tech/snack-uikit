import { ChipChoice, ChipChoiceRowProps } from '../src';
import { STORY_TEST_IDS } from './testIds';

export type Filters = {
  vms: string[];
  ip: string;
  tags: string[];
  dates: Date[];
};

export const filtersMock: ChipChoiceRowProps<Filters>['filters'] = [
  {
    type: ChipChoice.types.Multi,
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
    type: ChipChoice.types.Single,
    id: 'ip',
    label: 'External IP',
    options: [
      { value: 'true', label: 'On' },
      { value: 'false', label: 'Off' },
    ],
    'data-test-id': STORY_TEST_IDS.Single,
  },
  {
    type: ChipChoice.types.Date,
    id: 'dates',
    label: 'Created at',
    'data-test-id': STORY_TEST_IDS.Date,
  },
  {
    type: ChipChoice.types.DateRange,
    id: 'dateRange',
    label: 'Period',
    'data-test-id': STORY_TEST_IDS.DateRange,
  },
];
