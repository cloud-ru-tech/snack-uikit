import cn from 'classnames';
import { ChangeEventHandler, forwardRef } from 'react';

import { extractSupportProps } from '@snack-ui/utils';

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
      readonly = false,
      autoComplete = false,
      maxLength,
      onFocus,
      onBlur,
      onKeyDown,
      tabIndex = 0,
      onClick,
      onMouseDown,
      ...rest
    },
    ref,
  ) => {
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
      onChange?.(e.target.value, e);
    };

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
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        readOnly={readonly}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        onClick={onClick}
        onMouseDown={onMouseDown}
        {...extractSupportProps(rest)}
      />
    );
  },
);
export const InputPrivate = ForwardedPrivateInput as typeof ForwardedPrivateInput & {
  types: typeof Type;
};

InputPrivate.types = Type;
