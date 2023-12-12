// DO NOT EDIT IT MANUALLY

import { FAMILY, PURPOSE, SIZE } from '../../constants';
import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function MonoBodyS({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      {...rest}
      family={FAMILY.Mono}
      purpose={PURPOSE.Body}
      size={SIZE.S}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
