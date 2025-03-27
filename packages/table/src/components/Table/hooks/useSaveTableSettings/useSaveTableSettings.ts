import { useCallback, useMemo } from 'react';

import { ChipChoiceRowProps, FiltersState } from '@snack-uikit/chips';
import { FilterStateOptions, useDataPersist } from '@snack-uikit/utils';

import { TableProps } from '../../../types';
import { Settings } from './types';
import { parser, serializer } from './utils';
import { validateFilter, validatePaging, validateSorting } from './vallidators';

type ValidationFn<TFilter> = (value: unknown) => value is Settings<TFilter>;

type TableSettings<TFilter extends FiltersState = Record<string, unknown>> = {
  options?: TableProps<TFilter>['savedState'];
  filterSettings?: ChipChoiceRowProps<TFilter>['filters'];
};

export const useSaveTableSettings = <TFilters extends FiltersState = Record<string, unknown>>({
  options,
  filterSettings,
}: TableSettings<TFilters>) => {
  const validate = useCallback<ValidationFn<TFilters>>(
    (data: unknown): data is Settings<TFilters> => {
      const isPaginationValid = validatePaging((data as Settings<TFilters>)?.pagination);
      const isSortingValid = validateSorting((data as Settings<TFilters>)?.sorting);
      const isSearchValid = typeof (data as Settings<TFilters>)?.search === 'string';
      const isFilterValid = Boolean(
        filterSettings && validateFilter((data as Settings<TFilters>).filter, filterSettings),
      );
      return isPaginationValid && isSortingValid && isSearchValid && isFilterValid;
    },
    [filterSettings],
  );
  const filterQueryKey = options?.filterQueryKey;
  const filterLocalStorageKey = options?.id ? `${options?.id}_filter` : '';

  const filterStateOptions = useMemo<FilterStateOptions<Settings<TFilters>> | undefined>(
    () => (filterQueryKey ? { filterQueryKey, filterLocalStorageKey, validateData: validate } : undefined),
    [filterQueryKey, validate, filterLocalStorageKey],
  );

  const { getDefaultFilter, setDataToStorages } = useDataPersist<Settings<TFilters>>({
    options: filterStateOptions,
    serializer,
    parser,
  });

  const defaultFilter = useMemo(getDefaultFilter, [getDefaultFilter]);

  return {
    defaultFilter,
    setDataToStorages,
  };
};
