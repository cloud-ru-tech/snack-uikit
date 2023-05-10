import cn from 'classnames';
import { CSSProperties, PropsWithChildren } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { useIsLoadingValue } from '../../hooks';
import styles from './styles.module.scss';

export type SkeletonProps = WithSupportProps<
  PropsWithChildren<{
    loading?: boolean;
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
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
