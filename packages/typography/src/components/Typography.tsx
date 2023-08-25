import cn from 'classnames';
import { createElement, ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { attachVariants } from '../utils';
import { Family, Role, Size, Tag } from './contants';
import { generatedVariants } from './generatedVariants';
import { GeneratedTypography } from './generatedVariants/types';
import styles from './styles.module.scss';

export type TypographyProps = WithSupportProps<{
  tag?: Tag;
  className?: string;
  children?: ReactNode;
  family: Family;
  role: Role;
  size: Size;
}>;

function TypographyComponent({ tag = Tag.span, className, children, family, role, size, ...rest }: TypographyProps) {
  return createElement(
    tag,
    {
      className: cn(styles.typography, className),
      'data-family': family,
      'data-role': role,
      'data-size': size,
      ...extractSupportProps(rest),
    },
    children,
  );
}

TypographyComponent.families = Family;
TypographyComponent.roles = Role;
TypographyComponent.sizes = Size;
TypographyComponent.tags = Tag;

export const Typography = TypographyComponent as typeof TypographyComponent & GeneratedTypography;

attachVariants(generatedVariants);
