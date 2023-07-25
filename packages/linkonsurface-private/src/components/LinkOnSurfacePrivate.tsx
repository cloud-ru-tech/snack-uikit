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

export type LinkOnSurfacePrivateProps = WithSupportProps<{
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

export function LinkOnSurfacePrivate({
  text,
  className,
  href = '#',
  target = Target.Blank,
  onClick,
  onSurface = OnSurface.Background,
  size = Size.S,
  external,
  onColor = OnColor.Neutral,
  ...rest
}: LinkOnSurfacePrivateProps) {
  return (
    <a
      className={cn(styles.linkOnSurface, className)}
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

LinkOnSurfacePrivate.sizes = Size;
LinkOnSurfacePrivate.targets = Target;
LinkOnSurfacePrivate.onColors = OnColor;
LinkOnSurfacePrivate.onSurfaces = OnSurface;
