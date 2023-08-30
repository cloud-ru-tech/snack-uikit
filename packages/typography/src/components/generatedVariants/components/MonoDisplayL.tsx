// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function MonoDisplayL({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Mono}
      role={Typography.roles.Display}
      size={Typography.sizes.L}
      tag={tag}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  );
}
