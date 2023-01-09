import { useEffect } from 'react';

import { useForceUpdate } from './useForceUpdate';

export function useForceUpdateOnPageLoadedCompletely() {
  const rerender = useForceUpdate();
  useEffect(() => {
    window.addEventListener('load', rerender);
    return () => {
      window.removeEventListener('load', rerender);
    };
  }, [rerender]);
}
