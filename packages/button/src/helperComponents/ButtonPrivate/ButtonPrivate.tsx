import cn from 'classnames';
import { ForwardedRef, forwardRef, MouseEvent } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, HTML_TYPE, ICON_POSITION, TARGET } from '../../constants';
import { CommonButtonProps, CounterButtonProps } from '../../types';
import { APPEARANCE_TO_COLOR_MAP } from './constants';
import styles from './styles.module.scss';
import { getChildren, getVariant } from './utils';

export type ButtonPrivateProps = WithSupportProps<
  CommonButtonProps &
    CounterButtonProps & {
      iconClassName: string;
      labelClassName: string;
      fullWidth?: boolean;
    }
>;

export const ButtonPrivate = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonPrivateProps>(
  (
    {
      className,
      disabled,
      href,
      icon,
      iconClassName,
      iconPosition = ICON_POSITION.After,
      label,
      labelClassName,
      loading,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      counter,
      size,
      target = TARGET.Blank,
      type = HTML_TYPE.Button,
      appearance = APPEARANCE.Primary,
      tabIndex: tabIndexProp = 0,
      fullWidth,
      ...rest
    },
    ref,
  ) => {
    const variant = getVariant({ label, iconPosition, icon });
    const children = getChildren({
      icon,
      iconClassName,
      iconPosition,
      label,
      labelClassName,
      loading,
      disabled,
      counter,
    });
    const tabIndex = loading || disabled ? -1 : tabIndexProp;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }

      if (onClick) {
        onClick(event);
      }
    };

    const buttonProps = {
      ...extractSupportProps(rest),
      className: cn(styles.button, className),
      'data-disabled': disabled || undefined,
      'aria-disabled': disabled || undefined,
      'data-loading': loading || undefined,
      'data-size': size,
      'data-full-width': fullWidth || undefined,
      'data-appearance': APPEARANCE_TO_COLOR_MAP[appearance],
      'data-variant': variant,
      onClick: handleClick,
      onKeyDown,
      onFocus,
      onBlur,
      tabIndex,
    };

    if (href) {
      return (
        <a role='button' href={href} target={target} {...buttonProps} ref={ref as ForwardedRef<HTMLAnchorElement>}>
          {children}
        </a>
      );
    }

    return (
      <button {...buttonProps} type={type} ref={ref as ForwardedRef<HTMLButtonElement>}>
        {children}
      </button>
    );
  },
);
