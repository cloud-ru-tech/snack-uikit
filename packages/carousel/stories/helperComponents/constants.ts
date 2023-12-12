import { MouseEventHandler } from 'react';

import { Card } from '@snack-uikit/card';
import { toaster } from '@snack-uikit/toaster';

const BUTTON_HANDLE_CLICK: MouseEventHandler<HTMLButtonElement> = e => {
  e.stopPropagation();
  toaster.userAction.neutral({ label: 'Button clicked' });
};

export const PROMO_FOOTER: Card.FooterPromoProps = {
  button: { label: 'Label text', onClick: BUTTON_HANDLE_CLICK },
  volume: {
    currentValue: '999 999,00',
    oldValue: '1 000 000,00',
    dimension: '₽',
  },
};
