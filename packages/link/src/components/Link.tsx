import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEventHandler } from 'react';

import { ArrowLinksSSVG, ArrowLinksXsSVG } from '@snack-ui/icons';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { OnColor, OnSurface, Size, Target } from './constants';
import styles from './styles.module.scss';

const getExternalIcon = (size: Size) => {
  const dataTestId = 'external-icon';

  if (size === Size.L) {
    return <ArrowLinksSSVG size={24} data-test-id={dataTestId} />;
  }
  return <ArrowLinksXsSVG size={16} data-test-id={dataTestId} />;
};

export type LinkProps = WithSupportProps<{
  text?: string;
  className?: string;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  size?: Size;
  external?: boolean;
  onColor?: OnColor;
  onSurface?: OnSurface;
}>;

export function Link({
  text,
  className,
  href = '#',
  target = Target.Blank,
  onClick,
  onSurface = OnSurface.Background,
  size = Size.S,
  external,
  onColor = OnColor.Primary,
  ...rest
}: LinkProps) {
  return (
    <a
      className={cn(styles.link, className)}
      href={href}
      target={target}
      onClick={onClick}
      data-size={size}
      data-on-surface={onSurface}
      data-color={onColor}
      rel={target === Target.Blank ? 'noopener noreferrer' : undefined}
      {...extractSupportProps(rest)}
    >
      {text}
      {external && getExternalIcon(size)}
    </a>
  );
}

Link.sizes = Size;
Link.targets = Target;
Link.onColors = OnColor;
Link.onSurfaces = OnSurface;
