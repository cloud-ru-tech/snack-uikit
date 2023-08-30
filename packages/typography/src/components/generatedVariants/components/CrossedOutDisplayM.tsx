// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function CrossedOutDisplayM({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.CrossedOut}
      role={Typography.roles.Display}
      size={Typography.sizes.M}
      tag={tag}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  );
}
