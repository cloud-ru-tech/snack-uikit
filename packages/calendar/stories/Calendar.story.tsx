import { Meta, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import { Scroll } from '@snack-uikit/scroll';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Calendar, CalendarProps } from '../src';
import { CALENDAR_MODE, SIZE } from '../src/constants';
import { Range } from '../src/types';
import { getBuildCellProps } from './helper';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Calendar/Calendar',
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

type DateValue = Date | Range | undefined;

const Template: StoryFn<StoryProps> = ({ localeName, modeBuildCellProps, ...args }: StoryProps) => {
  const locale = new Intl.Locale(localeName);
  let value: DateValue;
  if (args.mode === CALENDAR_MODE.Date || args.mode === CALENDAR_MODE.DateTime || args.mode === CALENDAR_MODE.Month) {
    if (args.dateValue) {
      value = new Date(args.dateValue);
    }
  } else if (args.mode === CALENDAR_MODE.Range) {
    if (args.rangeValueStart && args.rangeValueEnd) {
      value = [new Date(args.rangeValueStart), new Date(args.rangeValueEnd)];
    }
  }

  let defaultValue: DateValue;
  if (args.mode === CALENDAR_MODE.Date || args.mode === CALENDAR_MODE.DateTime) {
    if (args.dateDefaultValue) {
      defaultValue = new Date(args.dateDefaultValue);
    }
  } else if (args.mode === CALENDAR_MODE.Range) {
    if (args.rangeDefaultValueStart && args.rangeDefaultValueEnd) {
      defaultValue = [new Date(args.rangeDefaultValueStart), new Date(args.rangeDefaultValueEnd)];
    }
  }

  const [selectedValue, setSelectedValue] = useState<DateValue>();

  useEffect(() => {
    setSelectedValue(value || defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.mode]);

  const onChangeValue = (value: Date | Range) => {
    setSelectedValue(value);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    args.onChangeValue?.(value);
  };

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
    <>
      <div key={args.mode} className={cn(styles.story, SCROLL_SIZE[args.size || SIZE.M])}>
        <Scroll>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Calendar {...props} buildCellProps={getBuildCellProps(modeBuildCellProps)} key={args.mode} />
        </Scroll>
      </div>
      <div className={styles.valueHolder} data-test-id='calendar-value-holder'>
        {selectedValue instanceof Date && selectedValue.valueOf()}
        {Array.isArray(selectedValue) && selectedValue[0].valueOf()}
        {Array.isArray(selectedValue) && selectedValue[1].valueOf()}
      </div>
    </>
  );
};

export const calendar = {
  render: Template,

  args: {
    size: SIZE.M,
    mode: CALENDAR_MODE.Date,
    autofocus: false,
    localeName: 'en-US',
    showHolidays: false,
    showSeconds: true,
    fitToContainer: true,
    modeBuildCellProps: 'none',
  },

  argTypes: {
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
      if: { arg: 'mode', neq: CALENDAR_MODE.Range },
    },
    dateDefaultValue: {
      name: 'defaultValue',
      control: { type: 'date' },
      if: { arg: 'mode', neq: CALENDAR_MODE.Range },
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
  },

  parameters: {
    controls: { sort: 'requiredFirst' },
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A27244&mode=design',
    },
  },
};
