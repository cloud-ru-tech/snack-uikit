import { MouseEventHandler } from 'react';

import { CrossSSVG, CrossXsSVG } from '@snack-ui/icons';

import { ButtonSize } from '../../components/constants';
import styles from './styles.module.scss';

type ButtonCopyValueProps = {
  size: ButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function ButtonClearValue({ size, onClick }: ButtonCopyValueProps) {
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
    >
      {size === ButtonSize.S && <CrossXsSVG />}
      {size === ButtonSize.M && <CrossSSVG />}
    </button>
  );
}
