// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function MonoDisplayS({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Mono}
      role={Typography.roles.Display}
      size={Typography.sizes.S}
      tag={tag}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  );
}
