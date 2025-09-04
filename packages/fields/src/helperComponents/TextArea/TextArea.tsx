import cn from 'classnames';
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  RefAttributes,
  useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { InputPrivateProps } from '@snack-uikit/input-private';
import { extractSupportProps, useLayoutEffect, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type TextAreaProps = RefAttributes<HTMLTextAreaElement> &
  WithSupportProps<{
    /** HTML-аттрибут name */
    name?: string;
    /** HTML-аттрибут value */
    value: string;
    /** Колбек смены значения */
    onChange?(value: string, e: ChangeEvent<HTMLTextAreaElement>): void;
    /** HTML-аттрибут id */
    id?: string;
    className?: string;
    /** Плейсхолдер */
    placeholder?: string;
    /** Является ли поле доступным только на чтение */
    readonly?: boolean;
    /** Является ли поле деактивированным */
    disabled?: boolean;
    /** Включен ли автокомплит */
    autoComplete?: boolean;
    /** Включен ли авто-фокус */
    autoFocus?: boolean;
    /** Максимальное кол-во символов */
    maxLength?: number;
    /** Колбек получения фокуса */
    onFocus?: FocusEventHandler<HTMLTextAreaElement>;
    /** Колбек потери фокуса */
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    /** Колбек нажатия клавиши клавиатуры */
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    /** HTML-аттрибут tab-index */
    tabIndex?: number;
    /** Минимальное кол-во строк, до которого размер поля может быть увеличен @default 3*/
    minRows?: number;
    /** Включение проверки орфографии @default true*/
    spellCheck?: boolean;
    /** Режим работы экранной клавиатуры */
    inputMode?: InputPrivateProps['inputMode'];
  }>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      name,
      value = '',
      onChange,
      placeholder,
      id,
      className,
      disabled = false,
      readonly = false,
      autoComplete = false,
      autoFocus = false,
      maxLength,
      onFocus,
      onBlur,
      onKeyDown,
      tabIndex,
      minRows = 3,
      spellCheck,
      inputMode,
      ...rest
    },
    ref,
  ) => {
    // fix of height on the initial render
    // see https://github.com/Andarist/react-textarea-autosize/issues/337#issuecomment-1024980737
    const [, setIsRerendered] = useState(false);
    useLayoutEffect(() => setIsRerendered(true), []);

    const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = e => onChange?.(e.target.value, e);
    const stopPropagation: MouseEventHandler<HTMLTextAreaElement> = e => e.stopPropagation();

    return (
      <TextareaAutosize
        id={id}
        name={name}
        value={value}
        ref={ref}
        className={cn(className, styles.textarea)}
        autoComplete={autoComplete ? 'on' : 'off'}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        maxLength={maxLength}
        onChange={onChangeHandler}
        onClick={stopPropagation}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        minRows={minRows}
        spellCheck={spellCheck}
        inputMode={inputMode}
        {...extractSupportProps(rest)}
      />
    );
  },
);
