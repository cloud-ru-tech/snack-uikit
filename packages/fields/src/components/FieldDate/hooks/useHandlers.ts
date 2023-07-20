import { useCallback } from 'react';

type Handler<T> = (e: T) => void;

/**
 * Вызывает обработчики события по порядку
 */
export function useHandlers<T>(handlers: (Handler<T> | undefined)[]) {
  return useCallback(
    (e: T) => {
      handlers.forEach(handler => handler?.(e));
    },
    [handlers],
  );
}
