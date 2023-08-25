// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function LightLabelL({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Light}
      role={Typography.roles.Label}
      size={Typography.sizes.L}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
