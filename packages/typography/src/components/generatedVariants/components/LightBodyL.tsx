// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function LightBodyL({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Light}
      role={Typography.roles.Body}
      size={Typography.sizes.L}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
