import { FocusEventHandler, MouseEventHandler, ReactNode, RefObject } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { LabelPosition, Mode, Size, Width } from './constants';

export type ToggleItemState<D = undefined> = {
  checked: boolean;
  data: D;
};

export type ToggleItem<D> = ToggleItemState<D> & {
  setChecked: (checked: boolean) => void;
};

export type InputVisualState = {
  focusVisible: boolean;
  disabled: boolean;
  checked: boolean;
  hover: boolean;
  size: Size;
};

export type DataAttributes = Record<`data-${string}`, string | boolean>;

export type TogglePrivateProps = WithSupportProps<{
  className?: string;
  /** Лейбл */
  label?: string;
  /** Расположение лейбла */
  labelPosition?: LabelPosition;
  /**
   * Ширина
   * <br> - `auto` автоматическое
   * <br> - `full` все доступное место по ширине (игнорируется когда не передан проп label)
   */
  width?: Width;
  /** Размер */
  size?: Size;
  /** Колбек рендера компонента */
  render: (visualState: InputVisualState) => ReactNode;
  /** Режим работы */
  mode?: Mode;
  /** HTML-аттрибут id */
  id?: string;
  /** HTML-аттрибут value */
  value?: string;
  /** HTML-аттрибут name */
  name?: string;
  /** HTML-аттрибут tab-index */
  tabIndex?: number;
  /** HTML-аттрибут autofocus */
  autofocus?: boolean;
  /** HTML-аттрибут checked */
  checked?: boolean;
  /** HTML-аттрибут checked по-умолчанию */
  defaultChecked?: boolean;
  /** HTML-аттрибут disabled */
  disabled?: boolean;
  /** Колбек смены значения */
  onChange?: (checked: boolean) => void;
  /** Колбек клика */
  onClick?: MouseEventHandler<HTMLInputElement>;
  /** Колбек потери фокуса */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /** Колбек приобретения фокуса */
  onFocus?: FocusEventHandler<HTMLInputElement>;
}>;

export type ToggleProps = WithSupportProps<
  Pick<
    TogglePrivateProps,
    | 'id'
    | 'name'
    | 'value'
    | 'tabIndex'
    | 'autofocus'
    | 'checked'
    | 'defaultChecked'
    | 'disabled'
    | 'onChange'
    | 'onClick'
    | 'onBlur'
    | 'onFocus'
    | 'className'
    | 'label'
    | 'labelPosition'
    | 'width'
    | 'size'
  > & {
    inputRef?: RefObject<HTMLInputElement>;
  }
>;
