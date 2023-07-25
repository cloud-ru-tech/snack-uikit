import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEventHandler } from 'react';

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

enum Appearance {
  Primary = 'primary',
  Neutral = 'neutral',
}

export type LinkProps = WithSupportProps<{
  text?: string;
  className?: string;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  size?: Size;
  external?: boolean;
  appearance?: Appearance;
}>;

export function Link({
  text,
  className,
  href = '#',
  target = Target.Blank,
  onClick,
  size = Size.S,
  appearance = Appearance.Neutral,
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

  return (
    <a
      className={cn(styles.link, className)}
      href={href}
      target={target}
      onClick={onClick}
      data-size={size}
      data-appearance={appearance}
      rel={target === Target.Blank ? 'noopener noreferrer' : undefined}
      {...extractSupportProps(rest)}
    >
      {text}
      {external && getExternalIcon()}
    </a>
  );
}

Link.sizes = Size;
Link.appearances = Appearance;
Link.targets = Target;
