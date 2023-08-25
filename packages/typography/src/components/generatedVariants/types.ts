import { FC, ReactNode } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { Tag } from '../contants';
import { VARIANTS } from './constants';

export type GeneratedTypographyProps = WithSupportProps<{
  tag?: Tag;
  className?: string;
  children?: ReactNode;
}>;

type AvailableVariants = typeof VARIANTS;
export type GeneratedTypography = {
  [name in AvailableVariants[number]]: FC<GeneratedTypographyProps>;
};
