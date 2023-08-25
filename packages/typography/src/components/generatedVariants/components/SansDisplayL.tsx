// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function SansDisplayL({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Sans}
      role={Typography.roles.Display}
      size={Typography.sizes.L}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
