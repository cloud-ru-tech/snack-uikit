// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function CrossedOutBodyL({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.CrossedOut}
      role={Typography.roles.Body}
      size={Typography.sizes.L}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
