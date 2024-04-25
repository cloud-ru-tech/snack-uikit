import copyToClipboard from 'copy-to-clipboard';
import { forwardRef, KeyboardEventHandler, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';

import { ButtonSize } from '@snack-uikit/input-private';

import { AsyncValueRequest } from '../../types';
import { getIcon } from './helpers';
import styles from './styles.module.scss';

type ButtonCopyValueProps = {
  size: ButtonSize;
  valueToCopy?: string;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  onValueRequest?(): AsyncValueRequest;
  disabled?: boolean;
};

export const ButtonCopyValue = forwardRef<HTMLButtonElement, ButtonCopyValueProps>(
  ({ size, valueToCopy, tabIndex = -1, onKeyDown, onClick, onValueRequest, disabled }, ref) => {
    const [isChecked, setIsChecked] = useState(false);
    const timerId = useRef<ReturnType<typeof setTimeout>>();

    const closeTooltip = () => setIsChecked(false);

    const handleCopy = (event: MouseEvent<HTMLButtonElement>, asyncValue?: string) => {
      const value = asyncValue || valueToCopy;

      value && copyToClipboard(value, { format: 'text/plain' });

      setIsChecked(true);

      clearTimeout(timerId.current);
      timerId.current = setTimeout(closeTooltip, 2000);

      onClick?.(event);
    };

    const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
      event.stopPropagation();

      if (onValueRequest) {
        onValueRequest().then(({ success, value }) => {
          if (success) {
            handleCopy(event, value);
          }
        });
      } else {
        handleCopy(event);
      }
    };

    useEffect(
      () => () => {
        closeTooltip();
        clearTimeout(timerId.current);
      },
      [],
    );

    return (
      <button
        className={styles.buttonCopyValue}
        data-size={size}
        data-disabled={disabled || undefined}
        onClick={handleClick}
        data-test-id='button-copy-value'
        ref={ref}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        type='button'
        disabled={disabled}
      >
        {getIcon({ size, isChecked })}
      </button>
    );
  },
);
