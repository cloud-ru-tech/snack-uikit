// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function CrossedOutTitleS({ className, children, tag }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.CrossedOut}
      role={Typography.roles.Title}
      size={Typography.sizes.S}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
