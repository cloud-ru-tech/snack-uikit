import { PropsWithChildren, ReactNode } from 'react';

import { SkeletonContextProvider } from '../../context';
import { useIsLoadingValue } from '../../hooks';

type WithSkeletonProps = PropsWithChildren<{
  skeleton: ReactNode;
  loading?: boolean;
}>;

export function WithSkeleton({ children, skeleton, loading }: WithSkeletonProps) {
  const isLoading = useIsLoadingValue(loading);

  if (isLoading) {
    return <SkeletonContextProvider loading={true}>{skeleton}</SkeletonContextProvider>;
  }

  return <>{children}</>;
}
