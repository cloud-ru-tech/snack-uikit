import {
  ChangeEvent,
  ClipboardEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  RefAttributes,
} from 'react';

import { ValueOf, WithSupportProps } from '@snack-uikit/utils';

import { TYPE } from './constants';

export type Type = ValueOf<typeof TYPE>;

export type InputPrivateProps = RefAttributes<HTMLInputElement> &
  WithSupportProps<{
    /** Значение html-атрибута name */
    name?: string;
    /** Значение input */
    value: string;
    /** Колбек смены значения */
    onChange?(value: string, e?: ChangeEvent<HTMLInputElement>): void;
    /** Значение html-атрибута id */
    id?: string;
    /** CSS-класс */
    className?: string;
    /** Значение плейсхолдера */
    placeholder?: string;
    /**
     * Является ли поле доступным только для чтения
     * @default false
     */
    readonly?: boolean;
    /** Тип инпута */
    type?: Type;
    /**
     * Является ли поле деактивированным
     * @default false
     */
    disabled?: boolean;
    /**
     * Включен ли автокомплит для поля
     * @default false
     */
    autoComplete?: boolean | string;
    /** Максимальная длина вводимого значения */
    maxLength?: number;
    /** Минимальное значение поля */
    min?: number;
    /** Максимальное значение поля */
    max?: number;
    /** Максимальное значение поля */
    step?: number | string;
    /**
     * Значение атрибута tab-index
     * @default 0
     */
    tabIndex?: number;
    /** Колбек обработки получения фокуса */
    onFocus?: FocusEventHandler<HTMLInputElement>;
    /** Колбек обработки потери фокуса */
    onBlur?: FocusEventHandler<HTMLInputElement>;
    /** Колбек обработки начала нажатия клавиши клавиатуры */
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    /** Колбек обработки вставки значения */
    onPaste?: ClipboardEventHandler<HTMLInputElement>;
    /** Колбек обработки клика */
    onClick?: MouseEventHandler<HTMLInputElement>;
    /** Колбек обработки нажатия кнопки мыши */
    onMouseDown?: MouseEventHandler<HTMLInputElement>;
  }>;
