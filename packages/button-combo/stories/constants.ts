import { ButtonFilledProps } from '@snack-uikit/button';

import { Item } from '../src/types';

export const BUTTON_SIZES: ButtonFilledProps['size'][] = ['xs', 's', 'm', 'l'];

export const DROPLIST_OPTIONS: Item[] = [
  {
    label: 'Action 1',
    onClick: () => {
      alert('Action 1 completed');
    },
    id: '1',
  },
  {
    label: 'Action 2',
    onClick: () => {
      alert('Action 2 completed');
    },
    id: '2',
  },
];
