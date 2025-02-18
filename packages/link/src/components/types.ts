import { ComponentPropsWithoutRef, ElementType } from 'react';

import { TruncateStringProps } from '@snack-uikit/truncate-string';
import { ValueOf, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE, TEXT_MODE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;

export type TextMode = ValueOf<typeof TEXT_MODE>;

export type BaseProps = WithSupportProps<{
  /** Текст ссылки */
  text?: string;
  /** Размер
   * @default 's'
   */
  size?: Size;
  /** Стилизует ссылку для размещения на цветном фоне
   * @default 'primary'
   */
  appearance?: Appearance;
  /** Тип поверхности, на которой размещена ссылка
   * @default 'default'
   */
  textMode?: TextMode;
  /** Находится ли ссылка внутри текста (и можно ли её переносить) */
  insideText?: boolean;
  /**
   * Вариант обрезания строки:
   * <br> - `end` - с конца;
   * <br> - `middle` - по середине
   * */
  truncateVariant?: TruncateStringProps['variant'];
}>;

export type LinkProps<T extends ElementType = 'a'> = BaseProps & {
  /**
   *
   * Полиморфный компонент.
   *
   * Оформить переданный компонент или html элемент в стиль ссылки.
   *
   * Список атрибутов, которые переданный компонент должен принять:
   * <br/> - `className`
   * <br/> - `data-size`
   * <br/> - `data-text-mode`
   * <br/> - `data-appearance`
   * <br/> - `data-inside-text`
   *
   * @type ComponentType | ElementType
   * @default 'a'
   *
   * */
  as?: T;
} & Omit<ComponentPropsWithoutRef<ElementType extends T ? 'a' : T>, keyof BaseProps>;

export type PickLinkProps<T extends ElementType, SelectedKeys extends keyof LinkProps<T>> = Pick<
  LinkProps<T>,
  SelectedKeys
> &
  Omit<ComponentPropsWithoutRef<ElementType extends T ? 'a' : T>, keyof BaseProps>;
