import cn from 'classnames';
import { useMemo } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { useIsLoadingValue } from '../../hooks';
import { Skeleton, SkeletonProps } from '../Skeleton';
import styles from './styles.module.scss';

export type SkeletonTextProps = WithSupportProps<
  Omit<SkeletonProps, 'height'> & {
    lines?: number;
    rowClassName?: string;
    lineClassName?: string;
  }
>;

export function SkeletonText({
  width,
  className,
  rowClassName,
  lineClassName,
  children,
  loading,
  lines = 3,
  borderRadius = '0.4em',
  ...restProps
}: SkeletonTextProps) {
  const lineTestId = restProps['data-test-id'] ? `${restProps['data-test-id']}_line` : undefined;

  const rows = useMemo(
    () =>
      Array(lines)
        .fill(true)
        .map((_, index) => (
          <div key={index} className={cn(styles.skeletonTextRow, rowClassName)}>
            <Skeleton
              data-test-id={lineTestId}
              loading
              borderRadius={borderRadius}
              className={cn(styles.skeletonTextLine, lineClassName)}
            />
          </div>
        )),
    [lines, borderRadius, rowClassName, lineClassName, lineTestId],
  );

  const isLoading = useIsLoadingValue(loading);

  if (isLoading) {
    return (
      <div {...restProps} style={{ width }} className={cn(className, styles.skeletonText)}>
        {rows}
      </div>
    );
  }

  return <>{children}</>;
}
