// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function MonoTitleM({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Mono}
      role={Typography.roles.Title}
      size={Typography.sizes.M}
      tag={tag}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  );
}
