import cn from 'classnames';
import { createElement, ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Family, Role, Size, Tag } from './contants';
import styles from './styles.module.scss';

export type TypographyProps = WithSupportProps<{
  tag?: Tag;
  className?: string;
  children?: ReactNode;
  family: Family;
  role: Role;
  size: Size;
}>;

export function Typography({ tag = Tag.span, className, children, family, role, size, ...rest }: TypographyProps) {
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

Typography.families = Family;
Typography.roles = Role;
Typography.sizes = Size;
Typography.tags = Tag;
