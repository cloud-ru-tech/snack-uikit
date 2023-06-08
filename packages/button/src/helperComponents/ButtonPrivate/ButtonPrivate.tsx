import cn from 'classnames';
import { MouseEvent } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { HtmlType, IconPosition, Target, Type } from '../../constants';
import { CommonButtonProps, CounterButtonProps } from '../../types';
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
  counter,
  size,
  target = Target.Blank,
  type = Type.Primary,
  htmlType = HtmlType.Button,
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
    'data-type': type,
    'data-variant': variant,
    onClick: handleClick,
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
    <button {...buttonProps} type={htmlType}>
      {children}
    </button>
  );
}
