// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function SansLabelM({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Sans}
      role={Typography.roles.Label}
      size={Typography.sizes.M}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
