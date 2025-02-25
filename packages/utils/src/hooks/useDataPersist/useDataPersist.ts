import { useCallback, useMemo } from 'react';

import { LocalStorageSource, QueryParamSource } from './sources';
import { StateProps, useSource } from './useSource';

export type FilterStateOptions<T> = {
  filterQueryKey: string;
  filterLocalStorageKey: string;
  validateData(value: unknown): value is T;
};

type FilterStateProps<TFilter> = Omit<StateProps<TFilter>, 'source'> & {
  options?: FilterStateOptions<TFilter>;
  parser?(jsonFilter: string): TFilter;
  serializer?(filter: TFilter): string;
};

export const useDataPersist = <TFilter>({ options, parser, serializer }: FilterStateProps<TFilter>) => {
  const querySource = useMemo(
    () =>
      options
        ? new QueryParamSource<TFilter>(options.filterQueryKey, options.validateData, parser, serializer)
        : undefined,
    [options, parser, serializer],
  );
  const localStorageSource = useMemo(
    () => (options ? new LocalStorageSource<TFilter>(options.filterLocalStorageKey, options.validateData) : undefined),
    [options],
  );

  const { getData: getLocalStorageData, setData: setLocalStorageData } = useSource<TFilter>({
    source: querySource,
  });
  const { getData: getQueryParamsData, setData: setQueryParamsData } = useSource<TFilter>({
    source: localStorageSource,
  });

  const setDataToStorages = useCallback(
    (data: TFilter) => {
      setLocalStorageData(data);
      setQueryParamsData(data);
    },
    [setLocalStorageData, setQueryParamsData],
  );

  const getDefaultFilter = useCallback(() => {
    const queryData = getQueryParamsData();
    return queryData ? queryData : getLocalStorageData();
  }, [getLocalStorageData, getQueryParamsData]);

  return { getDefaultFilter, setDataToStorages };
};
