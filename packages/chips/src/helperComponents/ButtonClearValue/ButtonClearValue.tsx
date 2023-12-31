import { forwardRef, KeyboardEventHandler, MouseEventHandler } from 'react';

import { CrossSVG } from '@snack-uikit/icons';

import { BUTTON_SIZE } from '../../constants';
import { ButtonSize } from '../../types';
import styles from './styles.module.scss';

type ButtonClearValueProps = {
  size: ButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  'data-test-id'?: string;
};

export const ButtonClearValue = forwardRef<HTMLButtonElement, ButtonClearValueProps>(
  ({ size, onClick, tabIndex = -1, onKeyDown, 'data-test-id': dataTestId }, ref) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
      event.stopPropagation();
      onClick(event);
    };

    return (
      <button
        className={styles.buttonClearValue}
        data-size={size}
        onClick={handleClick}
        data-test-id={dataTestId}
        type='button'
        ref={ref}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
      >
        {size === BUTTON_SIZE.Xxs && <CrossSVG size={16} />}
        {size === BUTTON_SIZE.Xs && <CrossSVG />}
      </button>
    );
  },
);
