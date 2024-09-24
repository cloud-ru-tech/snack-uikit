import { ReactElement } from 'react';

import * as Icons from '@snack-uikit/icons';

import { VALIDATION_STATE } from '../src/constants';

export const ICONS: Record<string, ReactElement | undefined> = {
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

export const COMMON_ARG_TYPES = {
  validationState: {
    options: Object.values(VALIDATION_STATE),
    control: {
      type: 'radio',
    },
  },
  prefixIcon: {
    name: 'prefixIcon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
  labelTooltip: {
    control: {
      type: 'text',
    },
  },
  localeName: {
    options: ['ru-RU', 'en-US'],
    control: { type: 'radio' },
  },
} as const;
