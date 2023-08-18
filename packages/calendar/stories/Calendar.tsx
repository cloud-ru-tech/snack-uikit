import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Scroll } from '@snack-ui/scroll';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Calendar, CalendarProps } from '../src';
import { CalendarMode, Size } from '../src/constants';
import styles from './styles.modules.scss';

const meta: Meta = {
  title: 'Components/Calendar',
  component: Calendar,
};
export default meta;

const SCROLL_SIZE = {
  [Size.S]: styles.scroll_s,
  [Size.M]: styles.scroll_m,
};

type StoryProps = CalendarProps & {
  localeName: 'ru-RU' | 'en-US';
  dateValue: string;
  dateDefaultValue: string;
  rangeValueStart: string;
  rangeValueEnd: string;
  rangeDefaultValueStart: string;
  rangeDefaultValueEnd: string;
  dateToday: string;
};

const Template: StoryFn<StoryProps> = ({ localeName, ...args }: StoryProps) => {
  const [selectedValue, setSelectedValue] = useState<Date | Range | undefined>();

  const onChangeValue = (value: Date | Range) => {
    setSelectedValue(value);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    args.onChangeValue?.(value);
  };

  const locale = new Intl.Locale(localeName);
  let value;
  if (args.mode === CalendarMode.Date) {
    if (args.dateValue) {
      value = new Date(args.dateValue);
    }
  } else if (args.mode === CalendarMode.Range) {
    if (args.rangeValueStart && args.rangeValueEnd) {
      value = [new Date(args.rangeValueStart), new Date(args.rangeValueEnd)];
    }
  }

  let defaultValue;
  if (args.mode === CalendarMode.Date) {
    if (args.dateDefaultValue) {
      defaultValue = new Date(args.dateDefaultValue);
    }
  } else if (args.mode === CalendarMode.Range) {
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
      <Scroll resize={Scroll.resizes.Both} className={SCROLL_SIZE[args.size || Size.M]}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Calendar {...props} />
      </Scroll>
      <div className={styles.valueHolder} data-test-id='calendar-value-holder'>
        {selectedValue instanceof Date && selectedValue.valueOf()}
        {Array.isArray(selectedValue) && selectedValue[0].valueOf()}
        {Array.isArray(selectedValue) && selectedValue[1].valueOf()}
      </div>
    </div>
  );
};

export const calendar: StoryObj<StoryProps> = Template.bind({});

calendar.args = {
  size: Size.M,
  mode: CalendarMode.Date,
  autofocus: false,
  localeName: 'en-US',
  fitToContainer: true,
};

calendar.argTypes = {
  value: { table: { disable: true } },
  navigationStartRef: { table: { disable: true } },
  onChangeValue: { table: { disable: true } },
  onFocusLeave: { table: { disable: true } },
  style: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  locale: { table: { disable: true } },
  className: { table: { disable: true } },
  today: { table: { disable: true } },
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
    if: { arg: 'mode', eq: Calendar.modes.Date },
  },
  dateDefaultValue: {
    name: 'defaultValue',
    control: { type: 'date' },
    if: { arg: 'mode', eq: Calendar.modes.Date },
  },
  rangeValueStart: {
    name: 'value start',
    control: { type: 'date' },
    if: { arg: 'mode', eq: Calendar.modes.Range },
  },
  rangeValueEnd: {
    name: 'value end',
    control: { type: 'date' },
    if: { arg: 'mode', eq: Calendar.modes.Range },
  },
  rangeDefaultValueStart: {
    name: 'defaultValue start',
    control: { type: 'date' },
    if: { arg: 'mode', eq: Calendar.modes.Range },
  },
  rangeDefaultValueEnd: {
    name: 'defaultValue end',
    control: { type: 'date' },
    if: { arg: 'mode', eq: Calendar.modes.Range },
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
