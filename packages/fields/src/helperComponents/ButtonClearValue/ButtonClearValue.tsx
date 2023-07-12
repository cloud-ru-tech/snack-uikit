import { forwardRef, KeyboardEventHandler, MouseEventHandler } from 'react';

import { CrossSSVG, CrossXsSVG } from '@snack-ui/icons';

import { ButtonSize } from '../../constants';
import styles from './styles.module.scss';

type ButtonClearValueProps = {
  size: ButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  tabIndex?: number;
};

export const ButtonClearValue = forwardRef<HTMLButtonElement, ButtonClearValueProps>(
  ({ size, onClick, tabIndex = -1, onKeyDown }, ref) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
      event.stopPropagation();
      onClick(event);
    };

    return (
      <button
        className={styles.buttonClearValue}
        data-size={size}
        onClick={handleClick}
        data-test-id='button-clear-value'
        ref={ref}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
      >
        {size === ButtonSize.S && <CrossXsSVG />}
        {size === ButtonSize.M && <CrossSSVG />}
      </button>
    );
  },
);
