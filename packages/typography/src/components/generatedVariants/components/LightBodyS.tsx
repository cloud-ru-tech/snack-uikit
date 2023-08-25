// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function LightBodyS({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Light}
      role={Typography.roles.Body}
      size={Typography.sizes.S}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
