import { forwardRef, KeyboardEventHandler, MouseEventHandler } from 'react';

import { CrossSVG } from '@snack-uikit/icons';

import { ButtonSize } from '../../constants';
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
        {size === ButtonSize.Xxs && <CrossSVG size={16} />}
        {size === ButtonSize.Xs && <CrossSVG />}
      </button>
    );
  },
);
