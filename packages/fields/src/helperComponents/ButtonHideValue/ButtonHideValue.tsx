import { MouseEventHandler } from 'react';

import { EyeClosedSSVG, EyeClosedXsSVG, EyeSSVG, EyeXsSVG } from '@snack-ui/icons';

import { ButtonSize } from '../../components/constants';
import styles from './styles.module.scss';

type ButtonCopyValueProps = {
  size: ButtonSize;
  hidden?: boolean;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function ButtonHideValue({ size, onClick, hidden, disabled }: ButtonCopyValueProps) {
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
    >
      {hidden ? (
        <>
          {size === ButtonSize.S && <EyeClosedXsSVG />}
          {size === ButtonSize.M && <EyeClosedSSVG />}
        </>
      ) : (
        <>
          {size === ButtonSize.S && <EyeXsSVG />}
          {size === ButtonSize.M && <EyeSSVG />}
        </>
      )}
    </button>
  );
}
