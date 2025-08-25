import { useCallback, useMemo } from 'react';

import { LocalStorageSource, QueryParamSource } from './sources';
import { StateProps, useSource } from './useSource';

export type DataPersistOptions<T> = {
  queryKey: string;
  localStorageKey: string;
  validateData(value: unknown): value is T;
};

type DataPersistProps<TData> = Omit<StateProps<TData>, 'source'> & {
  options?: DataPersistOptions<TData>;
  parser?(jsonData: string): TData;
  serializer?(data: TData): string;
};

export const useDataPersist = <TData>({ options, parser, serializer }: DataPersistProps<TData>) => {
  const querySource = useMemo(
    () =>
      options ? new QueryParamSource<TData>(options.queryKey, options.validateData, parser, serializer) : undefined,
    [options, parser, serializer],
  );
  const localStorageSource = useMemo(
    () => (options ? new LocalStorageSource<TData>(options.localStorageKey, options.validateData) : undefined),
    [options],
  );

  const { getData: getLocalStorageData, setData: setLocalStorageData } = useSource<TData>({
    source: querySource,
  });

  const { getData: getQueryParamsData, setData: setQueryParamsData } = useSource<TData>({
    source: localStorageSource,
  });

  const setDataToStorages = useCallback(
    (data: TData) => {
      setLocalStorageData(data);
      setQueryParamsData(data);
    },
    [setLocalStorageData, setQueryParamsData],
  );

  const getDefaultData = useCallback(() => {
    const queryData = getQueryParamsData();
    return queryData ? queryData : getLocalStorageData();
  }, [getLocalStorageData, getQueryParamsData]);

  return { getDefaultData, setDataToStorages };
};
