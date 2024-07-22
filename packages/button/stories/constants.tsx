import { CounterProps } from '@snack-uikit/counter';
import * as Icons from '@snack-uikit/icons';

import { APPEARANCE as COUNTER_APPEARANCES, VARIANT as COUNTER_VARIANTS } from '../../counter/src/components/constants';
import { APPEARANCE, HTML_TYPE, SIZE } from '../src/constants';
import { CounterInButtonProps } from '../src/types';

export const ICONS = {
  none: undefined,
  ...Object.fromEntries(
    (Object.keys(Icons) as Array<keyof typeof Icons>)
      .filter(key => key !== 'Sprite')
      .map(key => {
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
};

export const COUNTER_ARGS: CounterInButtonProps = {
  value: 9,
  appearance: 'primary',
  variant: 'count',
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
    options: Object.values(COUNTER_APPEARANCES),
    if: { arg: 'counter' },
    control: {
      type: 'select',
    },
  },
  counterVariant: {
    name: 'counter.variant',
    options: Object.values(COUNTER_VARIANTS),
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

export const COMMON_ARG_TYPES = {
  type: {
    options: Object.values(HTML_TYPE),
    control: {
      type: 'radio',
    },
  },
  size: {
    options: Object.values(SIZE),
    control: {
      type: 'radio',
    },
  },
  appearance: {
    options: Object.values(APPEARANCE),
    control: {
      type: 'radio',
    },
  },
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
  testMode: {
    name: '[Stories]: Show onClick counter',
    control: {
      type: 'boolean',
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
};
