import { ButtonFunction } from '@snack-ui/button';
import { Counter, CounterProps } from '@snack-ui/counter';
import * as Icons from '@snack-ui/icons';

export const ICONS = {
  none: undefined,
  ...Object.fromEntries(
    Object.keys(Icons).map(key => {
      const Icon = Icons[key];
      return [key, <Icon key={key} />];
    }),
  ),
};

export const BUTTON_ARGS = {
  label: 'Label text',
  disabled: false,
  loading: false,
  icon: 'none',
  iconPosition: ButtonFunction.iconPositions.After,
  // size: 's',
};

export const COUNTER_ARGS = {
  value: 9,
  appearance: Counter.appearances.Primary,
  variant: Counter.variants.Count,
  plusLimit: 10,
};

export type StoryCounterProps = {
  counterValue: CounterProps['value'];
  counterAppearance: CounterProps['appearance'];
  counterVariant: CounterProps['variant'];
  counterPlusLimit: CounterProps['plusLimit'];
};
export const STORY_WITH_COUNTER_ARG_TYPES = {
  counter: {
    name: '[Stories]: Show counter examples',
    control: {
      type: 'boolean',
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  counterValue: {
    name: 'counter.value',
    if: { arg: 'counter' },
    control: {
      type: 'number',
    },
  },
  counterAppearance: {
    name: 'counter.appearance',
    options: Object.values(Counter.appearances),
    if: { arg: 'counter' },
    control: {
      type: 'select',
    },
  },
  counterVariant: {
    name: 'counter.variant',
    options: Object.values(Counter.variants),
    if: { arg: 'counter' },
    control: {
      type: 'select',
    },
  },
  counterPlusLimit: {
    name: 'counter.plusLimit',
    if: { arg: 'counter' },
    control: {
      type: 'number',
    },
  },
};
