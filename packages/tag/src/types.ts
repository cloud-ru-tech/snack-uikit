import { MouseEvent } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;

export type LinkProps = {
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
  target?: HTMLAnchorElement['target'];
};

export type TagRowItem = {
  label: string;
  appearance?: Appearance;
} & Partial<LinkProps>;

export type TagRowItemInner = {
  label: string;
  appearance: Appearance;
} & Partial<LinkProps>;

export type CommonTagProps = {
  /** Текст */
  label: string;
  /** Размер */
  size?: Size;
  /** Внешний вид */
  appearance?: Appearance;
  /** CSS-класс */
  className?: string;
  /** tabIndex кнопки удаления */
  tabIndex?: number;
};
