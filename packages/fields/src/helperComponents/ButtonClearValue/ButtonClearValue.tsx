import { forwardRef, MouseEventHandler } from 'react';

import { CrossSSVG, CrossXsSVG } from '@snack-ui/icons';

import { ButtonSize } from '../../constants';
import styles from './styles.module.scss';

type ButtonCopyValueProps = {
  size: ButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonClearValue = forwardRef<HTMLButtonElement, ButtonCopyValueProps>(({ size, onClick }, ref) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();
    onClick(event);
  };

  return (
    <button
      className={styles.buttonClearValue}
      data-size={size}
      onClick={handleClick}
      ref={ref}
      data-test-id='button-clear-value'
    >
      {size === ButtonSize.S && <CrossXsSVG />}
      {size === ButtonSize.M && <CrossSSVG />}
    </button>
  );
});
