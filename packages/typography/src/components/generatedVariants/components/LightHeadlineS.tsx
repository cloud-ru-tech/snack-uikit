// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function LightHeadlineS({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.Light}
      role={Typography.roles.Headline}
      size={Typography.sizes.S}
      tag={tag}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  );
}