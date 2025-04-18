import { useRef } from 'react';

import { isBrowser } from '../utils';
import { useEventHandler } from './useEventHandler';

/**
 * Хук задерживает выполнение функции или обновление значения до тех пор,
 * пока не пройдет определенный период времени без новых вызовов.
 * @function React hook
 */
export function useDebounce(callback: () => void, timeout = 0) {
  const timeStampRef = useRef<number>(0);
  const timerIdRef = useRef<NodeJS.Timeout | number>(-1);

  return useEventHandler(() => {
    isBrowser() &&
      requestAnimationFrame(timestamp => {
        if (timestamp < timeStampRef.current) {
          clearTimeout(timerIdRef.current);
        }
        timerIdRef.current = setTimeout(callback, timeout);
        timeStampRef.current = timestamp + timeout;
      });
  });
}
