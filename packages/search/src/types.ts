import { ReactNode } from 'react';

import { SearchPrivateProps } from '@snack-uikit/search-private';
import { ValueOf } from '@snack-uikit/utils';

import { SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type SearchBaseProps = Omit<SearchPrivateProps, 'onKeyDown'> & {
  /** Внешний бордер */
  outline?: boolean;
  /** Произвольный постфикс для поля */
  postfix?: ReactNode;
};
