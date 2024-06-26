import { TypographyProps } from '@snack-uikit/typography';

import { SIZE } from '../../constants';
import { Size } from '../../types';

export const TITLE_SIZE_MAP: Record<Size, TypographyProps['size']> = {
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
  [SIZE.L]: 'l',
};

export const DESCRIPTION_SIZE_MAP: Record<Size, TypographyProps['size']> = {
  [SIZE.S]: 'm',
  [SIZE.M]: 'm',
  [SIZE.L]: 'l',
};

export const TRUNCATE_DEFAULTS = {
  title: 1,
  description: 2,
  metadata: 1,
};
