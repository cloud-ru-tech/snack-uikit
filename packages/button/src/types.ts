import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from 'react';

import { CounterProps } from '@snack-uikit/counter';
import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE, ICON_POSITION, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type IconPosition = ValueOf<typeof ICON_POSITION>;

export type Size = ValueOf<typeof SIZE>;

export type BaseButtonProps = {
  /** CSS-класс */
  className?: string;
  /** Флаг неактивности компонента */
  disabled?: boolean;
  /**
   * Иконка
   * @type ReactElement
   */
  icon?: ReactElement;
  /** Позиция иконки */
  iconPosition?: IconPosition;
  /** Текст кнопки */
  label?: string;
  /** Флаг состояния загрузки */
  loading?: boolean;
  /** Колбек обработки клика */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Колбек обработки нажатия клавиши */
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  /** Колбек обработки фокуса */
  onFocus?: FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Колбек обработки блюра */
  onBlur?: FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Размер */
  size?: Size;
  /** Внешний вид кнопки */
  appearance?: Appearance;
  /** HTML-аттрибут type */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /** HTML-аттрибут tab-index */
  tabIndex?: number;
  /** Сделать кнопку во всю ширину */
  fullWidth?: boolean;
};

export type AnchorButtonProps = {
  /** Ссылка */
  href?: string;
  /** HTML-аттрибут target */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};

export type CounterInButtonProps = Pick<CounterProps, 'value' | 'appearance' | 'variant' | 'plusLimit'>;
export type CounterButtonProps = {
  /** Пропсы каунтера в кнопке */
  counter?: CounterInButtonProps;
};

export type CommonButtonProps = AnchorButtonProps & BaseButtonProps;
