import { useContext } from 'react';

import { SkeletonContext } from './context';

export function useIsLoadingValue(loadingByProp?: boolean) {
  const loadingByContext = useContext(SkeletonContext);
  return loadingByContext || loadingByProp;
}
