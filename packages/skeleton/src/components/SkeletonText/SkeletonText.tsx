import cn from 'classnames';
import { useMemo } from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

import { useIsLoadingValue } from '../../hooks';
import { Skeleton, SkeletonProps } from '../Skeleton';
import styles from './styles.module.scss';
import { Variant } from './types';

export type SkeletonTextProps = WithSupportProps<
  Omit<SkeletonProps, 'height'> & {
    /** Количество строк. */
    lines?: number;
    /** CSS-класс строки */
    rowClassName?: string;
    /** CSS-класс линии */
    lineClassName?: string;
    /** Типографика */
    typography?: Variant;
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
  typography = 'body-m',
  ...restProps
}: SkeletonTextProps) {
  const lineTestId = restProps['data-test-id'] ? `${restProps['data-test-id']}_line` : undefined;

  const rows = useMemo(
    () =>
      Array(lines)
        .fill(true)
        .map((_, index) => (
          <div
            key={index}
            className={cn(styles.skeletonTextRow, rowClassName)}
            style={{
              lineHeight: `var(--sans-${typography}-line-height)`,
              fontSize: `var(--sans-${typography}-font-size)`,
            }}
          >
            <Skeleton
              data-test-id={lineTestId}
              loading
              height={`var(--sans-${typography}-font-size)`}
              borderRadius={borderRadius}
              className={cn(styles.skeletonTextLine, lineClassName)}
            />
          </div>
        )),
    [lines, rowClassName, lineTestId, typography, borderRadius, lineClassName],
  );

  const isLoading = useIsLoadingValue(loading);

  if (isLoading) {
    return (
      <div {...restProps} className={cn(className, styles.skeletonText)} style={{ width }}>
        {rows}
      </div>
    );
  }

  return <>{children}</>;
}
