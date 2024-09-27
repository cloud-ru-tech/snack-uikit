import cn from 'classnames';
import { FocusEventHandler, forwardRef, KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import { Divider } from '@snack-uikit/divider';
import { Size } from '@snack-uikit/input-private';

import { getArrowIcon } from '../../components/FieldSelect/utils';
import { ButtonVariant } from '../../types';
import styles from './styles.module.scss';

export type ButtonFieldProps = {
  size: Size;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  disabled?: boolean;
  hasArrow?: boolean;
  arrowOpen?: boolean;
  content?: ReactNode;
  variant: ButtonVariant;
  className?: string;
};

export const ButtonField = forwardRef<HTMLButtonElement, ButtonFieldProps>(
  (
    {
      size,
      tabIndex = 0,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      disabled,
      content,
      hasArrow = false,
      arrowOpen = false,
      variant,
      className,
    },
    ref,
  ) => {
    const { ArrowIcon, arrowIconSize } = getArrowIcon({ size, open: arrowOpen });

    return (
      <button
        className={cn(className, styles.buttonField)}
        data-size={size}
        data-variant={variant}
        data-arrow-open={arrowOpen || undefined}
        data-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={disabled ? undefined : onKeyDown}
        onFocus={disabled ? undefined : onFocus}
        onBlur={disabled ? undefined : onBlur}
        data-test-id='button-field'
        ref={ref}
        tabIndex={tabIndex}
        type='button'
        disabled={disabled}
      >
        {variant === 'after' && <Divider orientation='vertical' className={styles.divider} />}

        <div className={styles.content}>{content}</div>

        {hasArrow && <ArrowIcon size={arrowIconSize} />}

        {variant === 'before' && <Divider orientation='vertical' className={styles.divider} />}
      </button>
    );
  },
);
