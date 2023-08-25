// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function MonoLabelS({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Mono}
      role={Typography.roles.Label}
      size={Typography.sizes.S}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
