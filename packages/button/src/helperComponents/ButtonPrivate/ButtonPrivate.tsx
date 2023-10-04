import cn from 'classnames';
import { MouseEvent } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, HtmlType, IconPosition, Target } from '../../constants';
import { CommonButtonProps, CounterButtonProps } from '../../types';
import { APPEARANCE_TO_COLOR_MAP } from './constants';
import styles from './styles.module.scss';
import { getChildren, getVariant } from './utils';

export type ButtonPrivateProps = WithSupportProps<
  Omit<CommonButtonProps, 'size'> &
    CounterButtonProps & {
      iconClassName: string;
      labelClassName: string;
      size?: string;
    }
>;

export function ButtonPrivate({
  className,
  disabled,
  href,
  icon,
  iconClassName,
  iconPosition = IconPosition.After,
  label,
  labelClassName,
  loading,
  onClick,
  onKeyDown,
  counter,
  size,
  target = Target.Blank,
  type = HtmlType.Button,
  appearance = Appearance.Primary,
  tabIndex: tabIndexProp = 0,
  ...rest
}: ButtonPrivateProps) {
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
    'data-appearance': APPEARANCE_TO_COLOR_MAP[appearance],
    'data-variant': variant,
    onClick: handleClick,
    onKeyDown,
    tabIndex,
  };

  if (href) {
    return (
      <a role='button' href={href} target={target} {...buttonProps}>
        {children}
      </a>
    );
  }

  return (
    <button {...buttonProps} type={type}>
      {children}
    </button>
  );
}
