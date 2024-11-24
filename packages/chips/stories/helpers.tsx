import { CalendarProps } from '@snack-uikit/calendar';

import { ChipChoiceRowProps, CustomContentRenderProps } from '../src';
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
    type: 'date-time',
    id: 'date-time',
    label: 'Created at with time',
    'data-test-id': STORY_TEST_IDS.Date,
    mode: 'date-time',
  },
  {
    type: 'date-time',
    id: 'date-time-no-sec',
    label: 'Created at time no seconds',
    'data-test-id': STORY_TEST_IDS.Date,
    mode: 'date-time',
    showSeconds: false,
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

type BuildCellPropsFunction = Exclude<CalendarProps['buildCellProps'], undefined>;

const disablePast: BuildCellPropsFunction = (date, viewMode) => {
  let isDisabled = false;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  switch (viewMode) {
    case 'month':
      if (date.valueOf() + 86400000 < Date.now()) {
        isDisabled = true;
      }
      break;
    case 'year':
      if (currentYear > date.getFullYear()) {
        isDisabled = false;
      } else if (currentYear === date.getFullYear()) {
        if (date.getMonth() < currentMonth) {
          isDisabled = true;
        }
      }
      break;
    case 'decade':
      if (date.getFullYear() < currentYear) {
        isDisabled = true;
      }
      break;
    default:
      return { isDisabled };
  }
  return { isDisabled };
};

export const getBuildCellProps = (modeBuildCellProps: 'disable-past' | 'none') => {
  switch (modeBuildCellProps) {
    case 'disable-past':
      return disablePast;
    case 'none':
    default:
      return;
  }
};
