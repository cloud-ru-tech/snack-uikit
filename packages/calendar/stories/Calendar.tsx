import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Scroll } from '@snack-uikit/scroll';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Calendar, CalendarProps } from '../src';
import { CALENDAR_MODE, SIZE } from '../src/constants';
import { getBuildCellProps } from './helper';
import styles from './styles.modules.scss';

const meta: Meta = {
  title: 'Components/Calendar',
  component: Calendar,
};
export default meta;

const SCROLL_SIZE = {
  [SIZE.S]: styles.scroll_s,
  [SIZE.M]: styles.scroll_m,
  [SIZE.L]: styles.scroll_l,
};

type StoryProps = CalendarProps & {
  localeName: 'ru-RU' | 'en-US';
  dateValue: string;
  dateDefaultValue: string;
  modeBuildCellProps: 'for-tests' | 'disable-past' | 'none';
  rangeValueStart: string;
  rangeValueEnd: string;
  rangeDefaultValueStart: string;
  rangeDefaultValueEnd: string;
  dateToday: string;
};

const Template: StoryFn<StoryProps> = ({ localeName, modeBuildCellProps, ...args }: StoryProps) => {
  const [selectedValue, setSelectedValue] = useState<Date | Range | undefined>();

  const onChangeValue = (value: Date | Range) => {
    setSelectedValue(value);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    args.onChangeValue?.(value);
  };

  const locale = new Intl.Locale(localeName);
  let value;
  if (args.mode === CALENDAR_MODE.Date) {
    if (args.dateValue) {
      value = new Date(args.dateValue);
    }
  } else if (args.mode === CALENDAR_MODE.Range) {
    if (args.rangeValueStart && args.rangeValueEnd) {
      value = [new Date(args.rangeValueStart), new Date(args.rangeValueEnd)];
    }
  }

  let defaultValue;
  if (args.mode === CALENDAR_MODE.Date) {
    if (args.dateDefaultValue) {
      defaultValue = new Date(args.dateDefaultValue);
    }
  } else if (args.mode === CALENDAR_MODE.Range) {
    if (args.rangeDefaultValueStart && args.rangeDefaultValueEnd) {
      defaultValue = [new Date(args.rangeDefaultValueStart), new Date(args.rangeDefaultValueEnd)];
    }
  }

  const today = args.dateToday ? new Date(args.dateToday) : undefined;

  const props = {
    ...args,
    today,
    value,
    locale,
    defaultValue,
    onChangeValue,
  };

  return (
    <div className={styles.story}>
      <Scroll resize='both' className={SCROLL_SIZE[args.size || SIZE.M]}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Calendar {...props} buildCellProps={getBuildCellProps(modeBuildCellProps)} />
      </Scroll>
      <div className={styles.valueHolder} data-test-id='calendar-value-holder'>
        {selectedValue instanceof Date && selectedValue.valueOf()}
        {Array.isArray(selectedValue) && selectedValue[0].valueOf()}
        {Array.isArray(selectedValue) && selectedValue[1].valueOf()}
      </div>
    </div>
  );
};

export const calendar = Template.bind({});

calendar.args = {
  size: SIZE.M,
  mode: CALENDAR_MODE.Date,
  autofocus: false,
  localeName: 'en-US',
  fitToContainer: true,
  modeBuildCellProps: 'none',
};

calendar.argTypes = {
  value: { table: { disable: true } },
  navigationStartRef: { table: { disable: true } },
  onChangeValue: { table: { disable: true } },
  modeBuildCellProps: {
    name: '[story] select buildCellProps operating mode',
    options: ['for-tests', 'disable-past', 'none'],
    control: { type: 'radio' },
  },
  onFocusLeave: { table: { disable: true } },
  buildCellProps: { table: { disable: true } },
  style: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  locale: { table: { disable: true } },
  className: { table: { disable: true } },
  today: { table: { disable: true } },
  showHolidays: {
    name: 'showHolidays (worked if buildCellProps return isHolidays = undefined)',
  },
  localeName: {
    options: ['ru-RU', 'en-US'],
    control: { type: 'radio' },
  },
  dateToday: {
    control: { type: 'date' },
  },
  dateValue: {
    name: 'value',
    control: { type: 'date' },
    if: { arg: 'mode', eq: CALENDAR_MODE.Date },
  },
  dateDefaultValue: {
    name: 'defaultValue',
    control: { type: 'date' },
    if: { arg: 'mode', eq: CALENDAR_MODE.Date },
  },
  rangeValueStart: {
    name: 'value start',
    control: { type: 'date' },
    if: { arg: 'mode', eq: CALENDAR_MODE.Range },
  },
  rangeValueEnd: {
    name: 'value end',
    control: { type: 'date' },
    if: { arg: 'mode', eq: CALENDAR_MODE.Range },
  },
  rangeDefaultValueStart: {
    name: 'defaultValue start',
    control: { type: 'date' },
    if: { arg: 'mode', eq: CALENDAR_MODE.Range },
  },
  rangeDefaultValueEnd: {
    name: 'defaultValue end',
    control: { type: 'date' },
    if: { arg: 'mode', eq: CALENDAR_MODE.Range },
  },
};

calendar.parameters = {
  controls: { sort: 'requiredFirst' },
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/ClltOilUQ4IIOWR3H8TJkX/Calendar?type=design&mode=design&t=9JpP5LPQw4Kw6SWM-0',
  },
};
