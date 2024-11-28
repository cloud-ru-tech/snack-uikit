import cn from 'classnames';
import { useMemo } from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

import { useIsLoadingValue } from '../../hooks';
import { Skeleton, SkeletonProps } from '../Skeleton';
import styles from './styles.module.scss';
import { Variant } from './types';

export type SkeletonTextProps = WithSupportProps<
  Omit<SkeletonProps, 'height' | 'borderRadius'> & {
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
              lineHeight: `var(--size-skeleton-text-line-height-${typography})`,
            }}
          >
            <Skeleton
              data-test-id={lineTestId}
              loading
              height={`var(--size-skeleton-text-font-size-${typography})`}
              borderRadius={`var(--radius-skeleton-text-${typography})`}
              className={cn(styles.skeletonTextLine, lineClassName)}
            />
          </div>
        )),
    [lines, rowClassName, lineTestId, typography, lineClassName],
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
