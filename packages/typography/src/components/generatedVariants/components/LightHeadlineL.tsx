// DO NOT EDIT IT MANUALLY

import { FAMILY, PURPOSE, SIZE } from '../../constants';
import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function LightHeadlineL({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      {...rest}
      family={FAMILY.Light}
      purpose={PURPOSE.Headline}
      size={SIZE.L}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
