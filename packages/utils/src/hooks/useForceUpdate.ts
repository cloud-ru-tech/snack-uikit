import { useCallback, useState } from 'react';

export function useForceUpdate() {
  const [, setVersion] = useState(0);
  return useCallback(() => setVersion(version => version + 1), []);
}
