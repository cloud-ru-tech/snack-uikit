import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEvent, MouseEventHandler } from 'react';

import { ArrowLinksSSVG, ArrowLinksXsSVG } from '@snack-ui/icons';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

enum Size {
  S = 's',
  M = 'm',
  L = 'l',
}

enum Target {
  Self = '_self',
  Blank = '_blank',
  Parent = '_parent',
  Top = '_top',
}

export type LinkProps = WithSupportProps<{
  text?: string;
  className?: string;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  size?: Size;
  disabled?: boolean;
  external?: boolean;
}>;

export function Link({
  text,
  className,
  href = '#',
  target = Target.Blank,
  onClick,
  size = Size.S,
  disabled,
  external,
  ...rest
}: LinkProps) {
  const getExternalIcon = () => {
    const dataTestId = 'external-icon';

    if (size === Size.S) {
      return <ArrowLinksXsSVG size={16} data-test-id={dataTestId} />;
    }

    return <ArrowLinksSSVG size={24} data-test-id={dataTestId} />;
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <a
      className={cn(styles.link, className)}
      href={href}
      target={target}
      onClick={handleClick}
      data-size={size}
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      rel={target === Target.Blank ? 'noopener noreferrer' : undefined}
      {...extractSupportProps(rest)}
    >
      {text}
      {external && getExternalIcon()}
    </a>
  );
}

Link.sizes = Size;
Link.targets = Target;
