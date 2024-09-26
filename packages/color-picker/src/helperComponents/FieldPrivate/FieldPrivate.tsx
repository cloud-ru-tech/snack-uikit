import cn from 'classnames';
import { CSSProperties, MouseEventHandler, useEffect, useRef, useState } from 'react';

import { InputPrivate } from '@snack-uikit/input-private';

import styles from './styles.module.scss';

export type FieldPrivateProps = {
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  style?: CSSProperties;
  min?: number;
  max?: number;
  inputType?: 'text' | 'number';
  value?: string | number;
  onChange?(value?: string): void;
  error?: boolean;
};

export function FieldPrivate({
  className,
  disabled,
  focused,
  style,
  value = '',
  onChange,
  min = 0,
  max = 255,
  inputType = 'number',
  error,
}: FieldPrivateProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = () => {
    if (disabled) {
      return;
    }
    inputRef?.current?.focus();
  };

  const [rawValue, setRawValue] = useState<string>('');

  const handleBlur = () => {
    if (inputType === 'number') {
      const rawNumberValue = Number(rawValue) || 0;
      const newValue = String(Math.min(Math.max(min, rawNumberValue), Math.min(max, rawNumberValue)));

      setRawValue(newValue);
      onChange?.(newValue);

      return;
    }

    onChange?.(rawValue);
  };

  useEffect(() => {
    setRawValue(String(value));
  }, [value]);

  return (
    <div
      className={cn(className, styles.container)}
      style={style}
      data-focused={focused || undefined}
      data-validation={error ? 'error' : undefined}
      data-test-id='field-container-private'
      onClick={handleContainerClick}
      data-size='s'
      data-variant='single-line-container'
      role='textbox'
      tabIndex={-1}
    >
      <InputPrivate
        value={String(rawValue)}
        onChange={setRawValue}
        onBlur={handleBlur}
        type={inputType}
        ref={inputRef}
        {...(inputType === 'number' ? { min, max } : {})}
      />
    </div>
  );
}
