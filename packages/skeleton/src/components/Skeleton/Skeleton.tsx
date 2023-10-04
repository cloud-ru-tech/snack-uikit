import cn from 'classnames';
import { CSSProperties, PropsWithChildren } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { useIsLoadingValue } from '../../hooks';
import styles from './styles.module.scss';

export type SkeletonProps = WithSupportProps<
  PropsWithChildren<{
    /** Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. */
    loading?: boolean;
    /** Ширина блока. Можно указать значение допустимое для CSSProperty.width (пример `'60%'`, `'400px'` и т.д) */
    width?: CSSProperties['width'];
    /** Высота блока. Можно указать значение допустимое для CSSProperty.height (пример `'60%'`, `'400px'` и т.д) */
    height?: CSSProperties['height'];
    /** Радиус скругления. Можно указать значение допустимое для CSSProperty.borderRadius (пример `'10px'`, `'50%'` и т.д) */
    borderRadius?: CSSProperties['borderRadius'];
    className?: string;
  }>
>;

export function Skeleton({ width, height, className, borderRadius, loading, children, ...restProps }: SkeletonProps) {
  const isLoading = useIsLoadingValue(loading);

  if (isLoading) {
    return <div {...restProps} style={{ width, height, borderRadius }} className={cn(styles.skeleton, className)} />;
  }

  return <>{children}</>;
}
