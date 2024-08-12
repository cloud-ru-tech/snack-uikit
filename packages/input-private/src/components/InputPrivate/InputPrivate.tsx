import cn from 'classnames';
import { ChangeEventHandler, forwardRef } from 'react';

import { extractSupportProps } from '@snack-uikit/utils';

import { TYPE } from './constants';
import styles from './styles.module.scss';
import { InputPrivateProps } from './types';

export const InputPrivate = forwardRef<HTMLInputElement, InputPrivateProps>(
  (
    {
      name,
      value = '',
      onChange,
      placeholder,
      id,
      className,
      type = TYPE.Text,
      disabled = false,
      readonly = false,
      autoComplete: autoCompleteProp = false,
      maxLength,
      min,
      max,
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

    let autoComplete: string;

    switch (autoCompleteProp) {
      case true:
        autoComplete = 'on';
        break;
      case false:
        autoComplete = 'off';
        break;
      default:
        autoComplete = autoCompleteProp;
        break;
    }

    return (
      <input
        name={name}
        maxLength={maxLength}
        id={id}
        className={cn(className, styles.inputPrivate)}
        autoComplete={autoComplete}
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
        min={min}
        max={max}
        title=''
        {...extractSupportProps(rest)}
      />
    );
  },
);
