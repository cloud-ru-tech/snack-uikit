// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function MonoLabelM({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Mono}
      role={Typography.roles.Label}
      size={Typography.sizes.M}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
