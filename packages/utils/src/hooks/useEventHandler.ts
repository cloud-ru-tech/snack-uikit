import { useCallback, useLayoutEffect, useRef } from 'react';

import { warning } from '../utils';

export function useEventHandler<T extends (...args: never[]) => unknown>(handler: T) {
  const handlerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Parameters<T>) => {
    const handler = handlerRef.current;

    warning(handler === null, 'The event handler cannot be called during render');

    return handler?.(...args);
  }, []) as T;
}
