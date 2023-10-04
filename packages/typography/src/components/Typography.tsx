import cn from 'classnames';
import { createElement, ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { attachVariants } from '../utils';
import { Family, Role, Size, Tag } from './contants';
import { generatedVariants } from './generatedVariants';
import styles from './styles.module.scss';

export type TypographyProps = WithSupportProps<{
  /**
   * HTML-тег
   * @default Typography.tags.span
   */
  tag?: Tag;
  /** CSS-класс */
  className?: string;
  /** Контент */
  children?: ReactNode;
  /** Шрифт */
  family: Family;
  /** Роль */
  role: Role;
  /** Размер */
  size: Size;
}>;

function TypographyComponent({
  tag = TypographyComponent.tags.span,
  className,
  children,
  family,
  role,
  size,
  ...rest
}: TypographyProps) {
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

export const Typography = attachVariants(TypographyComponent, generatedVariants);
