import { useCallback } from 'react';

import { BaseSource } from './sources/baseSource';

export type StateProps<T> = {
  source?: BaseSource<T>;
};

export const useSource = <T>({ source }: StateProps<T>) => {
  const setData = useCallback(
    (filter: T) => {
      if (!source) {
        return;
      }
      source.setFilter(filter);
    },
    [source],
  );

  const getData = useCallback(() => source?.getFilter(), [source]);

  return { getData, setData };
};
