import copyToClipboard from 'copy-to-clipboard';
import { forwardRef, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react';

import { ButtonSize } from '@snack-ui/input-private';

import { getIcon } from './helpers';
import styles from './styles.module.scss';

type ButtonCopyValueProps = {
  size: ButtonSize;
  valueToCopy?: string;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
};
export const ButtonCopyValue = forwardRef<HTMLButtonElement, ButtonCopyValueProps>(
  ({ size, valueToCopy, tabIndex = -1, onKeyDown, onClick }, ref) => {
    const [isChecked, setIsChecked] = useState(false);
    const timerId = useRef<ReturnType<typeof setTimeout>>();
    const openTooltip = () => setIsChecked(true);
    const closeTooltip = () => setIsChecked(false);

    const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
      event.stopPropagation();
      valueToCopy && copyToClipboard(valueToCopy, { format: 'text/plain' });
      openTooltip();
      clearTimeout(timerId.current);
      timerId.current = setTimeout(closeTooltip, 2000);
      onClick?.(event);
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
        onClick={handleClick}
        data-test-id='button-copy-value'
        ref={ref}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        type='button'
      >
        {getIcon({ size, isChecked })}
      </button>
    );
  },
);
