import cn from 'classnames';
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  MouseEventHandler,
  RefAttributes,
  useLayoutEffect,
  useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { excludeSupportProps, extractDataProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type TextAreaProps = RefAttributes<HTMLTextAreaElement> &
  WithSupportProps<{
    name?: string;
    value: string;
    onChange?(value: string, e: ChangeEvent<HTMLTextAreaElement>): void;
    id?: string;
    className?: string;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    autoComplete?: boolean;
    maxLength?: number;
    onFocus?: FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
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
      maxLength,
      onFocus,
      onBlur,
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
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        maxLength={maxLength}
        onChange={onChangeHandler}
        onClick={stopPropagation}
        onFocus={onFocus}
        onBlur={onBlur}
        minRows={3}
        {...extractDataProps(excludeSupportProps(rest))}
        {...extractSupportProps(rest)}
      />
    );
  },
);
