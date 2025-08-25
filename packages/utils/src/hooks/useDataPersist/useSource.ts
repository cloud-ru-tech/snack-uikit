import { useCallback } from 'react';

import { BaseSource } from './sources';

export type StateProps<T> = {
  source?: BaseSource<T>;
};

export const useSource = <T>({ source }: StateProps<T>) => {
  const setData = useCallback(
    (data: T) => {
      if (!source) {
        return;
      }
      source.setData(data);
    },
    [source],
  );

  const getData = useCallback(() => source?.getData(), [source]);

  return { getData, setData };
};
