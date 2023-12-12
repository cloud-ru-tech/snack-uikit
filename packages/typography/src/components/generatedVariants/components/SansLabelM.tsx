// DO NOT EDIT IT MANUALLY

import { FAMILY, PURPOSE, SIZE } from '../../constants';
import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function SansLabelM({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      {...rest}
      family={FAMILY.Sans}
      purpose={PURPOSE.Label}
      size={SIZE.M}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
