import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from 'react';

import { CounterProps } from '@snack-ui/counter';

import { Appearance, IconPosition, Size } from './constants';

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
  /** Размер */
  size?: Size;
  /** Внешний вид кнопки */
  appearance?: Appearance;
  /** HTML-аттрибут type */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /** HTML-аттрибут tab-index */
  tabIndex?: number;
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
