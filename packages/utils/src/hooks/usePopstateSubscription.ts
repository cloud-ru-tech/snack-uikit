import { useEffect } from 'react';

import { useEventHandler } from './useEventHandler';

export function usePopstateSubscription(callback: (e: PopStateEvent) => void, enabled: boolean = true) {
  const handler = useEventHandler(callback);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [enabled, handler]);
}
