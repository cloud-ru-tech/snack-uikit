import { ButtonLight } from '@snack-ui/button';
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
  iconPosition: ButtonLight.iconPositions.After,
  size: ButtonLight.sizes.S,
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
    defaultValue: true,
    control: {
      type: 'boolean',
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  counterValue: {
    name: 'counter.value',
    defaultValue: 1,
    if: { arg: 'counter' },
    control: {
      type: 'number',
    },
  },
  counterAppearance: {
    name: 'counter.appearance',
    options: Object.values(Counter.appearances),
    defaultValue: Counter.appearances.Primary,
    if: { arg: 'counter' },
    control: {
      type: 'select',
    },
  },
  counterVariant: {
    name: 'counter.variant',
    options: Object.values(Counter.variants),
    defaultValue: Counter.variants.Count,
    if: { arg: 'counter' },
    control: {
      type: 'select',
    },
  },
  counterPlusLimit: {
    name: 'counter.plusLimit',
    defaultValue: 10,
    if: { arg: 'counter' },
    control: {
      type: 'number',
    },
  },
};
