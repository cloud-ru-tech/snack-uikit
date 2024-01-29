import { MouseEventHandler } from 'react';

import { BaseItemProps } from '@snack-uikit/list';
import { toaster } from '@snack-uikit/toaster';

import { Card } from '../src';
import { MODE as IMAGE_MODE } from '../src/components/Image/constants';
import { generateOptions } from './helpers';
import imageBackground from './ImageProdContentBackground.jpg';
import imageLittle from './ImageProdContentLittle.jpg';
import imageMiddle from './ImageProdContentMiddle.jpg';

export enum FooterMode {
  Action = 'action',
  Promo = 'promo',
  CallToAction = 'callToAction',
  Custom = 'custom',
  None = 'none',
}

export enum ImageMode {
  Little = 'little',
  Middle = 'middle',
  Background = 'background',
  None = 'none',
}

export enum EmblemMode {
  Icon = 'icon',
  Picture = 'picture',
  None = 'none',
}

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

export const ACTION_FOOTER: Card.FooterActionProps = {
  button: { label: 'Label text', onClick: BUTTON_HANDLE_CLICK },
  secondaryButton: { label: 'Label text', onClick: BUTTON_HANDLE_CLICK },
};

export const IMAGE_MAP = {
  [ImageMode.Little]: imageLittle,
  [ImageMode.Middle]: imageMiddle,
  [ImageMode.Background]: imageBackground,
};

export const IMAGE_MODE_MAP = {
  [ImageMode.Little]: IMAGE_MODE.Little,
  [ImageMode.Middle]: IMAGE_MODE.Middle,
  [ImageMode.Background]: IMAGE_MODE.Background,
};

export const OPTIONS_LENGTH = 3;

export const OPTIONS: BaseItemProps[] = generateOptions(OPTIONS_LENGTH);

import * as Icons from '@snack-uikit/icons';

export const ICONS = {
  ...Object.fromEntries(
    Object.keys(Icons).map(key => {
      const Icon = Icons[key];
      return [key, Icon];
    }),
  ),
};
