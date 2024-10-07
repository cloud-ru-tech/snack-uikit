import { Meta, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import { Scroll } from '@snack-uikit/scroll';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TimePicker, TimePickerProps } from '../src';
import { SIZE } from '../src/constants';
import { TimeValue } from '../src/types';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Calendar/Time Picker',
  component: TimePicker,
};
export default meta;

const SCROLL_SIZE = {
  [SIZE.S]: styles.scroll_timepicker_s,
  [SIZE.M]: styles.scroll_timepicker_m,
  [SIZE.L]: styles.scroll_timepicker_l,
};

type StoryProps = TimePickerProps & {
  todayHours: number;
  todayMinutes: number;
  todaySeconds: number;
  valueHours: number;
  valueMinutes: number;
  valueSeconds: number;
};

const Template: StoryFn<StoryProps> = ({
  todayHours,
  todayMinutes,
  todaySeconds,
  valueHours,
  valueMinutes,
  valueSeconds,
  ...args
}: StoryProps) => {
  const value = useMemo(
    () =>
      [valueHours, valueMinutes, valueSeconds].every(value => value === undefined)
        ? undefined
        : {
            hours: valueHours,
            minutes: valueMinutes,
            seconds: valueSeconds,
          },
    [valueHours, valueMinutes, valueSeconds],
  );

  const [selectedValue, setSelectedValue] = useState<TimeValue | undefined>(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const onChangeValue = (value: TimeValue) => {
    setSelectedValue(value);
    args.onChangeValue?.(value);
  };

  const today = [todayHours, todayMinutes, todaySeconds].every(value => value === undefined)
    ? undefined
    : new Date(0, 0, 0, todayHours, todayMinutes, todaySeconds);

  const props = {
    ...args,
    today,
    value: selectedValue,
    onChangeValue,
  };

  const hours = String(selectedValue?.hours).padStart(2, '0');
  const minutes = String(selectedValue?.minutes).padStart(2, '0');
  const seconds = String(selectedValue?.seconds).padStart(2, '0');

  return (
    <>
      <div className={cn(styles.story, SCROLL_SIZE[args.size || SIZE.M])}>
        <Scroll>
          <TimePicker {...props} />
        </Scroll>
      </div>

      <div className={styles.valueHolder} data-test-id='timepicker-value-holder'>
        {selectedValue ? `${hours}:${minutes}:${seconds}` : ''}
      </div>
    </>
  );
};

export const timePicker = {
  render: Template,

  args: {
    showSeconds: true,
    size: SIZE.M,
    fitToContainer: true,
  },

  argTypes: {
    value: { table: { disable: true } },
    navigationStartRef: { table: { disable: true } },
    onChangeValue: { table: { disable: true } },
    onFocusLeave: { table: { disable: true } },
    buildCellProps: { table: { disable: true } },
    style: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    locale: { table: { disable: true } },
    className: { table: { disable: true } },
    today: { table: { disable: true } },
    todayHours: {
      name: '[today] hours',
      control: { type: 'number' },
    },
    todayMinutes: {
      name: '[today] minutes',
      control: { type: 'number' },
    },
    todaySeconds: {
      name: '[today] seconds',
      control: { type: 'number' },
    },
    valueHours: {
      name: '[value] hours',
      control: { type: 'number' },
    },
    valueMinutes: {
      name: '[value] minutes',
      control: { type: 'number' },
    },
    valueSeconds: {
      name: '[value] seconds',
      control: { type: 'number' },
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A27244&mode=design',
    },
  },
};
