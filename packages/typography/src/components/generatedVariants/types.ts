import { FC } from 'react';

import { TypographyProps } from '../Typography';
import { VARIANTS } from './constants';

export type GeneratedTypographyProps = Omit<TypographyProps, 'family' | 'role' | 'size'>;

type AvailableVariants = typeof VARIANTS;
export type GeneratedTypography = {
  [name in AvailableVariants[number]]: FC<GeneratedTypographyProps>;
};
