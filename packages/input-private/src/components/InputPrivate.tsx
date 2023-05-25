import cn from 'classnames';
import { ChangeEventHandler, forwardRef, MouseEventHandler } from 'react';

import { excludeSupportProps, extractDataProps, extractSupportProps } from '@snack-ui/utils';

import { Type } from './constants';
import styles from './styles.module.scss';
import { InputPrivateProps } from './types';

const ForwardedPrivateInput = forwardRef<HTMLInputElement, InputPrivateProps>(
  (
    {
      name,
      value = '',
      onChange,
      placeholder,
      id,
      className,
      type = Type.Text,
      disabled = false,
      autoComplete = false,
      maxLength,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => onChange?.(e.target.value, e);
    const stopPropagation: MouseEventHandler<HTMLInputElement> = e => e.stopPropagation();

    return (
      <input
        name={name}
        maxLength={maxLength}
        id={id}
        className={cn(className, styles.inputPrivate)}
        autoComplete={autoComplete ? 'on' : 'off'}
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        onClick={stopPropagation}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        {...extractDataProps(excludeSupportProps(rest))}
        {...extractSupportProps(rest)}
      />
    );
  },
);
export const InputPrivate = ForwardedPrivateInput as typeof ForwardedPrivateInput & {
  types: typeof Type;
};

InputPrivate.types = Type;
