import { forwardRef, KeyboardEventHandler, MouseEventHandler } from 'react';

import { EyeClosedSVG, EyeSVG } from '@snack-uikit/icons';
import { BUTTON_SIZE, ButtonSize } from '@snack-uikit/input-private';

import styles from './styles.module.scss';

type ButtonHideValueProps = {
  size: ButtonSize;
  hidden?: boolean;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  tabIndex?: number;
};

export const ButtonHideValue = forwardRef<HTMLButtonElement, ButtonHideValueProps>(
  ({ size, onClick, hidden, disabled, tabIndex = -1, onKeyDown }, ref) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
      if (disabled) {
        return;
      }

      event.stopPropagation();
      onClick(event);
    };

    return (
      <button
        className={styles.buttonHideValue}
        data-size={size}
        data-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleClick}
        data-test-id='button-hide-value'
        ref={ref}
        onKeyDown={onKeyDown}
        type='button'
        tabIndex={disabled ? -1 : tabIndex}
      >
        {hidden ? (
          <>
            {size === BUTTON_SIZE.S && <EyeClosedSVG size={16} />}
            {size === BUTTON_SIZE.M && <EyeClosedSVG />}
          </>
        ) : (
          <>
            {size === BUTTON_SIZE.S && <EyeSVG size={16} />}
            {size === BUTTON_SIZE.M && <EyeSVG />}
          </>
        )}
      </button>
    );
  },
);
