// DO NOT EDIT IT MANUALLY

import { FAMILY, PURPOSE, SIZE } from '../../constants';
import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function LinkTitleM({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      {...rest}
      family={FAMILY.Link}
      purpose={PURPOSE.Title}
      size={SIZE.M}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
