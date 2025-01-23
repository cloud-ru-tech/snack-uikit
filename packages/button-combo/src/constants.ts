import { ButtonFilledProps } from '@snack-uikit/button';
import { DroplistProps } from '@snack-uikit/list';

export const DROPLIST_SIZE_MAP: Record<NonNullable<ButtonFilledProps['size']>, DroplistProps['size']> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};
