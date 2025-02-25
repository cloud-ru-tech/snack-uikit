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

export const useSaveTableSettings = <TFilter extends FiltersState = Record<string, unknown>>({
  options,
  filterSettings,
}: TableSettings<TFilter>) => {
  const validate = useCallback<ValidationFn<TFilter>>(
    (data: unknown): data is Settings<TFilter> => {
      const isPaginationValid = validatePaging((data as Settings<TFilter>)?.pagination);
      const isSortingValid = validateSorting((data as Settings<TFilter>)?.sorting);
      const isSearchValid = typeof (data as Settings<TFilter>)?.search === 'string';
      const isFilterValid = Boolean(
        filterSettings && validateFilter((data as Settings<TFilter>).filter, filterSettings),
      );
      return isPaginationValid && isSortingValid && isSearchValid && isFilterValid;
    },
    [filterSettings],
  );
  const filterQueryKey = options?.filterQueryKey;
  const filterLocalStorageKey = options?.id ? `${options?.id}_filter` : '';

  const filterStateOptions = useMemo<FilterStateOptions<Settings<TFilter>> | undefined>(
    () => (filterQueryKey ? { filterQueryKey, filterLocalStorageKey, validateData: validate } : undefined),
    [filterQueryKey, validate, filterLocalStorageKey],
  );

  const { getDefaultFilter, setDataToStorages } = useDataPersist<Settings<TFilter>>({
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
