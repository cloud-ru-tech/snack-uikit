import cn from 'classnames';
import { useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { FiltersState, hasFilterBeenApplied } from '@snack-uikit/chips';

import { FilterButtonProps } from '../../helperComponents';
import styles from './styles.module.scss';
import { FilterRow } from './types';

type UseFiltersProps<TState extends FiltersState> = {
  filterRow?: FilterRow<TState>;
};

type UseFiltersReturnType<TState extends FiltersState> = {
  filterButton?: FilterButtonProps;
  filterRow?: FilterRow<TState>;
};

export function useFilters<TState extends FiltersState>({
  filterRow,
}: UseFiltersProps<TState>): UseFiltersReturnType<TState> {
  const [filtersOpen, setFiltersOpen] = useUncontrolledProp<boolean>(filterRow?.open, false, newValue => {
    const result = typeof newValue === 'function' ? newValue(filtersOpen) : newValue;
    filterRow?.onOpenChange?.(result);
  });

  const [value, setValue] = useUncontrolledProp<TState>(
    filterRow?.value,
    (filterRow?.defaultValue ?? {}) as TState,
    newValue => {
      const result = typeof newValue === 'function' ? newValue(value) : newValue;
      filterRow?.onChange?.(result);
    },
  );

  const [visibleFilters, setVisibleFilters] = useUncontrolledProp<string[]>(
    filterRow?.visibleFilters,
    Object.keys(value),
    newState => {
      const result = typeof newState === 'function' ? newState(visibleFilters) : newState;
      filterRow?.onVisibleFiltersChange?.(result);
    },
  );

  const patchedFilters = useMemo(
    () =>
      (filterRow?.filters ?? []).map(filter => {
        if (['single', 'multiple'].includes(filter.type)) {
          return {
            ...filter,
            dropDownClassName: cn(filter.dropDownClassName, styles.list),
          };
        }

        return filter;
      }),
    [filterRow?.filters],
  );

  const numberOfFilters = useMemo(
    () => Object.keys(value).reduce((result, filterKey) => result + Number(hasFilterBeenApplied(value[filterKey])), 0),
    [value],
  );

  return {
    filterButton: filterRow ? { open: filtersOpen, onOpenChange: setFiltersOpen, numberOfFilters } : undefined,
    filterRow:
      filtersOpen && filterRow
        ? {
            ...filterRow,
            open: undefined,
            onOpenChange: undefined,
            filters: patchedFilters,
            value,
            onChange: setValue,
            visibleFilters,
            onVisibleFiltersChange: setVisibleFilters,
          }
        : undefined,
  };
}
