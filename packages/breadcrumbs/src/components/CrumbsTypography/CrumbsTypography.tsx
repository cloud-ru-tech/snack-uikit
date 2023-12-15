import { PropsWithChildren } from 'react';

import { Typography } from '@snack-uikit/typography';

import { SIZE } from '../../constants';
import { Size } from '../../types';

export type CrumbsTypographyProps = PropsWithChildren<{
  size: Size;
  className?: string;
}>;

export function CrumbsTypography({ size, children, className }: CrumbsTypographyProps) {
  return (
    <Typography className={className} size={size === SIZE.S ? 'm' : 's'} tag='div' family='sans' purpose='body'>
      {children}
    </Typography>
  );
}
