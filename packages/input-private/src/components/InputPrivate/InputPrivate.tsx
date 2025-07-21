import cn from 'classnames';
import { ChangeEventHandler, forwardRef } from 'react';

import { extractSupportProps } from '@snack-uikit/utils';

import { INPUT_MODE, TYPE } from './constants';
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
      inputMode = INPUT_MODE.Text,
      disabled = false,
      readonly = false,
      autoComplete: autoCompleteProp = false,
      autoFocus = false,
      maxLength,
      min,
      max,
      step,
      onFocus,
      onBlur,
      onKeyDown,
      onPaste,
      tabIndex = 0,
      onClick,
      onMouseDown,
      spellCheck,
      pattern,
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
        inputMode={inputMode}
        disabled={disabled}
        readOnly={readonly}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        tabIndex={tabIndex}
        onClick={onClick}
        onMouseDown={onMouseDown}
        min={min}
        max={max}
        step={step}
        spellCheck={spellCheck}
        title=''
        pattern={pattern}
        autoFocus={autoFocus}
        {...extractSupportProps(rest)}
      />
    );
  },
);
