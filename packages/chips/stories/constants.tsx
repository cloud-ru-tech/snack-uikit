import { ArgTypes } from '@storybook/react';

import * as Icons from '@snack-uikit/icons';

import { SIZE } from '../src/constants';

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

export const COMMON_ARG_TYPES: ArgTypes = {
  size: {
    options: Object.values(SIZE),
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
};
