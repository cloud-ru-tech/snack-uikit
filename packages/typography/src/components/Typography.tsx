import cn from 'classnames';
import { createElement, ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { attachVariants } from '../utils';
import { TAG } from './constants';
import { generatedVariants } from './generatedVariants';
import styles from './styles.module.scss';
import { Family, Purpose, Size, Tag } from './types';

export type TypographyProps = WithSupportProps<{
  /**
   * HTML-тег
   * @default span
   */
  tag?: Tag;
  /** CSS-класс */
  className?: string;
  /** Контент */
  children?: ReactNode;
  /** Шрифт */
  family: Family;
  /** Роль */
  purpose: Purpose;
  /** Размер */
  size: Size;
}>;

function TypographyComponent({ tag = TAG.span, className, children, family, purpose, size, ...rest }: TypographyProps) {
  return createElement(
    tag,
    {
      className: cn(styles.typography, className),
      ...extractSupportProps(rest),
      'data-family': family,
      'data-purpose': purpose,
      'data-size': size,
    },
    children,
  );
}

export const Typography = attachVariants(TypographyComponent, generatedVariants);
