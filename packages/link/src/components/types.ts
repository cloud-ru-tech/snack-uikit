import { ComponentPropsWithoutRef, ElementType } from 'react';

import { TruncateStringProps } from '@snack-uikit/truncate-string';
import { ValueOf, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, PURPOSE, SIZE, TEXT_MODE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;

export type Purpose = ValueOf<typeof PURPOSE>;

export type TextMode = ValueOf<typeof TEXT_MODE>;

type TruncateEndProps = {
  /**
   * Вариант обрезания строки:
   *
   * - `end` — с конца;
   * - `middle` — посередине
   */
  truncateVariant?: Extract<TruncateStringProps['variant'], 'end'>;
  /**
   * Максимальное кол-во строк, до которого может сворачиваться текст ссылки.
   * @remarks Применяется только при `truncateVariant === 'end'`.
   * @default 1
   */
  truncateMaxLines?: number;
};

type TruncateMiddleProps = {
  /**
   * Вариант обрезания строки:
   *
   * - `end` — с конца;
   * - `middle` — посередине
   */
  truncateVariant?: Extract<TruncateStringProps['variant'], 'middle'>;
  truncateMaxLines?: never;
};

type TruncateProps = TruncateEndProps | TruncateMiddleProps;

export type BaseProps = WithSupportProps<{
  /** Текст ссылки */
  text?: string;
  /** Размер
   * @default 's'
   */
  size?: Size;
  /** Роль
   * @default 'body'
   */
  purpose?: Purpose;
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
}>;

export type LinkProps<T extends ElementType = 'a'> = BaseProps &
  TruncateProps & {
    /**
     *
     * Полиморфный компонент.
     *
     * Оформить переданный компонент или html элемент в стиль ссылки.
     *
     * Список атрибутов, которые переданный компонент должен принять:
     * - `className`
     * - `data-size`
     * - `data-text-mode`
     * - `data-appearance`
     * - `data-inside-text`
     *
     * @type ComponentType | ElementType
     * @default 'a'
     *
     */
    as?: T;
  } & Omit<ComponentPropsWithoutRef<ElementType extends T ? 'a' : T>, keyof BaseProps>;

/** Сохраняет дискриминацию union при выборе полей (в отличие от `Pick` по union). */
type DistributivePick<T, K extends keyof T> = T extends unknown ? Pick<T, K> : never;

export type PickLinkProps<T extends ElementType, SelectedKeys extends keyof LinkProps<T>> = DistributivePick<
  LinkProps<T>,
  SelectedKeys
> &
  Omit<ComponentPropsWithoutRef<ElementType extends T ? 'a' : T>, keyof BaseProps>;
