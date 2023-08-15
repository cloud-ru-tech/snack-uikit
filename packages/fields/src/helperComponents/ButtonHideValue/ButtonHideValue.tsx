import { forwardRef, KeyboardEventHandler, MouseEventHandler } from 'react';

import { EyeClosedSVG, EyeSVG } from '@snack-ui/icons';

import { ButtonSize } from '../../constants';
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
        tabIndex={disabled ? -1 : tabIndex}
      >
        {hidden ? (
          <>
            {size === ButtonSize.S && <EyeClosedSVG size={16} />}
            {size === ButtonSize.M && <EyeClosedSVG />}
          </>
        ) : (
          <>
            {size === ButtonSize.S && <EyeSVG size={16} />}
            {size === ButtonSize.M && <EyeSVG />}
          </>
        )}
      </button>
    );
  },
);
