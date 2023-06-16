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
      size={Typography.sizes.M}
      tag={Typography.tags.div}
      family={Typography.families.Sans}
      role={size === Size.S ? Typography.roles.Title : Typography.roles.Body}
    >
      {children}
    </Typography>
  );
}
