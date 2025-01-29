export const STORY_TEST_IDS = {
  Multiple1: 'chip-choice-row__multiple1',
  Multiple2: 'chip-choice-row__multiple2',
  Single1: 'chip-choice-row__single1',
  Single2: 'chip-choice-row__single2',
  Date: 'chip-choice-row__date',
  DateTime: 'chip-choice-row__date-time',
  DateTimeAndSec: 'chip-choice-row__date-time-and-sec',
  DateRange: 'chip-choice-row__date-range',
  Time: 'chip-choice-row__time',
  TimeAndSec: 'chip-choice-row__time-and-sec',
  MultipleManyOption: 'chip-choice-row__multiple_many_option',
  Custom: 'chip-choice-row__multiple_many_custom',

  State: 'chip-choice-row__state',
};

export const DEFAULT_VALUES = {
  multiple2: ['vm-1'],
  date: new Date('2025-01-01'),
  single2: 'true',
  dateRange: [new Date('2025-01-01'), new Date('2025-01-31')],
  time: { hours: 12, minutes: 0 },
};
