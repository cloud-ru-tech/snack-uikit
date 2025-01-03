import { useCallback, useRef } from 'react';

import { useLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Хук для создания обработчика событий с неизменной функцией.
 * @function React hook
 * @param handler коллбек события, без параметров
 */
export function useEventHandler<T extends (...args: never[]) => unknown>(handler: T) {
  const handlerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Parameters<T>) => {
    const handler = handlerRef.current;

    if (handler === null) {
      console.warn('The event handler cannot be called during render');
    }

    return handler?.(...args);
  }, []) as T;
}
