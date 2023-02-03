import { useMemo } from 'react';

import { uniqueId } from '../utils';

export function useUniqueId(namespace?: string) {
  return useMemo(() => uniqueId(namespace), [namespace]);
}
