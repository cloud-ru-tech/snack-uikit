import { CalendarProps, TimePickerProps } from '@snack-uikit/calendar';

import { ChipChoiceRowProps, CustomContentRenderProps } from '../src';
import { STORY_TEST_IDS } from './forTests';

export type Filters = {
  multiple1: string[];
  multiple2: string[];
  single1: string;
  single2: string;
  date: Date;
  dateTime: Date;
  dateTimeAndSec: Date;
  dateRange: [Date, Date];
  time: TimePickerProps['value'];
  timeAndSec: TimePickerProps['value'];
  multiple_many_option: string[];
  custom: string;
};

const generateVMs = (length: number) =>
  Array.from({ length }).map((_, index) => ({ value: `vm-${index}`, label: `Vm-${index}` }));

export const filtersMock: ChipChoiceRowProps<Filters>['filters'] = [
  {
    type: 'multiple',
    id: 'multiple1',
    label: 'Virtual machines with apply button',
    options: generateVMs(20),
    autoApply: false,
    'data-test-id': STORY_TEST_IDS.Multiple1,
  },
  {
    type: 'multiple',
    id: 'multiple2',
    label: 'Virtual machines',
    options: [
      ...generateVMs(19),
      {
        value: 'vm-19',
        label: 'Vm with long long long long long long long long long long long long long long long label',
      },
    ],
    pinned: true,
    'data-test-id': STORY_TEST_IDS.Multiple2,
  },
  {
    type: 'single',
    id: 'single1',
    label: 'External IP with apply button',
    autoApply: false,
    options: [
      { value: 'true', label: 'On' },
      { value: 'false', label: 'Off' },
    ],
    'data-test-id': STORY_TEST_IDS.Single1,
  },
  {
    type: 'single',
    id: 'single2',
    label: 'External IP',
    options: [
      { value: 'true', label: 'On' },
      { value: 'false', label: 'Off' },
    ],
    'data-test-id': STORY_TEST_IDS.Single2,
  },

  {
    type: 'date',
    id: 'date',
    label: 'Created at',
    pinned: true,
    'data-test-id': STORY_TEST_IDS.Date,
  },
  {
    type: 'date-time',
    id: 'dateTime',
    label: 'Created at with time',
    'data-test-id': STORY_TEST_IDS.DateTime,
    mode: 'date-time',
    showSeconds: false,
  },
  {
    type: 'date-time',
    id: 'dateTimeAndSec',
    label: 'Created at with time & seconds',
    'data-test-id': STORY_TEST_IDS.DateTimeAndSec,
    mode: 'date-time',
  },
  {
    type: 'date-range',
    id: 'dateRange',
    label: 'Period',
    'data-test-id': STORY_TEST_IDS.DateRange,
  },
  {
    type: 'time',
    id: 'time',
    label: 'Starts at',
    'data-test-id': STORY_TEST_IDS.Time,
    showSeconds: false,
  },
  {
    type: 'time',
    id: 'timeAndSec',
    label: 'Starts at with seconds',
    'data-test-id': STORY_TEST_IDS.TimeAndSec,
  },
  {
    type: 'custom',
    id: 'custom',
    label: 'Custom',
    'data-test-id': STORY_TEST_IDS.Custom,
    valueRender: (value: string) => value ?? 'all',
    content: ({ closeDroplist, value, onChange }: CustomContentRenderProps<string>) => (
      <div>
        <input placeholder='Placeholder' value={value} onChange={e => onChange?.(e.target.value)} />
        <button onClick={closeDroplist}>Close</button>
      </div>
    ),
  },
  {
    type: 'multiple',
    id: 'multiple_many_option',
    label: 'Virtual machines (10k values with virtualization)',
    virtualized: true,
    options: generateVMs(10000),
    'data-test-id': STORY_TEST_IDS.MultipleManyOption,
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
