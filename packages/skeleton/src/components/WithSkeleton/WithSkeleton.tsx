import { PropsWithChildren, ReactNode } from 'react';

import { SkeletonContextProvider } from '../../context';
import { useIsLoadingValue } from '../../hooks';

type WithSkeletonProps = PropsWithChildren<{
  /** JSX скелетон */
  skeleton: ReactNode;
  /** Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children. */
  loading?: boolean;
}>;

export function WithSkeleton({ children, skeleton, loading }: WithSkeletonProps) {
  const isLoading = useIsLoadingValue(loading);

  if (isLoading) {
    return <SkeletonContextProvider loading={true}>{skeleton}</SkeletonContextProvider>;
  }

  return <>{children}</>;
}
