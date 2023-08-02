import { PropsWithChildren } from 'react';

import { Typography } from '@snack-ui/typography';

import { Size } from '../../constants';

export type CrumbsTypographyProps = PropsWithChildren<{
  size: Size;
  className?: string;
}>;

export function CrumbsTypography({ size, children, className }: CrumbsTypographyProps) {
  return (
    <Typography
      className={className}
      size={size === Size.S ? Typography.sizes.L : Typography.sizes.M}
      tag={Typography.tags.div}
      family={Typography.families.Sans}
      role={Typography.roles.Body}
    >
      {children}
    </Typography>
  );
}
