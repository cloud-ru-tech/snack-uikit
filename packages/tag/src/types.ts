import { MouseEvent, MouseEventHandler } from 'react';

import { TooltipProps } from '@snack-uikit/tooltip';
import { ValueOf, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;

export type LinkProps = {
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
  target?: HTMLAnchorElement['target'];
};

export type TagTooltipProps = {
  /** Тултип над тегом */
  tooltip?: TooltipProps;
};

export type TagRowItem = {
  /** Уникальный идентификатор, используется в качестве key. По умолчанию key: label. */
  id?: string;
  label: string;
  appearance?: Appearance;
} & Partial<LinkProps> &
  TagTooltipProps;

export type TagRowItemInner = Omit<TagRowItem, 'appearance'> & {
  appearance: Appearance;
};

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

export type TagBaseProps = WithSupportProps<{
  /** Коллбэк на удаление */
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}> &
  CommonTagProps;

export type TagLinkProps = WithSupportProps<CommonTagProps> & {
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
  target?: HTMLAnchorElement['target'];
};

export type ManageRestrictTooltipProps = {
  changeRestrictTooltipState(state: boolean): void;
};

type TagWithoutTooltipProps = TagBaseProps | TagLinkProps;
export type TagWithTooltipProps = TagWithoutTooltipProps & TagTooltipProps;

export type TagProps = TagWithoutTooltipProps | TagWithTooltipProps;
