import { useEffect, useMemo, useRef } from 'react';

import { FiltersState } from '@snack-uikit/chips';
import { DataPersistOptions, useDataPersist } from '@snack-uikit/utils';

import { PersistedFilterState, ToolbarPersistConfig } from '../../types';
import { defaultParser, defaultSerializer, prepareDataForFilter } from './utils';

type usePersistStateProps<TState extends FiltersState = Record<string, unknown>> = {
  persist?: ToolbarPersistConfig<TState>;
  filter?: TState;
  search?: string;
};

export function usePersistState<TState extends FiltersState = Record<string, unknown>>({
  persist,
  filter,
  search,
}: usePersistStateProps<TState>) {
  const hasHydratedRef = useRef(false);

  const dataPersistOptions = useMemo<DataPersistOptions<PersistedFilterState<TState>> | undefined>(() => {
    if (!persist?.filterQueryKey || !persist?.id) return undefined;

    const defaultValidate = (value: PersistedFilterState<TState>): boolean => {
      const filterOk = value?.filter === undefined || (typeof value.filter === 'object' && value.filter !== null);
      const searchOk = value?.search === undefined || typeof value.search === 'string';
      return Boolean(filterOk && searchOk);
    };

    const combinedValidate = (value: PersistedFilterState<TState>): boolean => {
      const baseValid = defaultValidate(value);
      return persist?.validateData ? baseValid && persist.validateData(value) : baseValid;
    };

    return {
      queryKey: persist.filterQueryKey,
      localStorageKey: `${persist.id}_filter`,
      validateData: combinedValidate as unknown as (value: unknown) => value is PersistedFilterState<TState>,
    };
  }, [persist]);

  const { getDefaultData, setDataToStorages } = useDataPersist<PersistedFilterState<TState>>({
    options: dataPersistOptions,
    serializer: value => (persist?.serializer ? persist.serializer(value) : defaultSerializer<TState>(value)),
    parser: (value: string) => (persist?.parser ? persist.parser(value) : defaultParser<TState>(value)),
  });

  const defaultState = useMemo(getDefaultData, [getDefaultData]);

  useEffect(() => {
    if (hasHydratedRef.current) {
      return;
    }

    if (defaultState) {
      persist?.onLoad?.({
        ...defaultState,
        filter: prepareDataForFilter(defaultState.filter ?? {}),
      });
    }

    // mark as hydrated after attempting to load defaultState
    hasHydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultState]);

  useEffect(() => {
    if (!persist?.id || !persist?.filterQueryKey || !hasHydratedRef.current) {
      return;
    }

    const snapshot = persist.state ?? getDefaultData() ?? ({} as PersistedFilterState<TState>);

    if (filter) {
      snapshot.filter = filter;
    }

    if (search !== undefined) {
      snapshot.search = search;
    }

    if (Object.keys(snapshot).length === 0) return;

    setDataToStorages(snapshot);
  }, [persist?.id, persist?.filterQueryKey, persist?.state, filter, search, setDataToStorages, getDefaultData]);
}
