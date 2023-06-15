import { useRef } from 'react';

import { useEventHandler } from './useEventHandler';

export function useDebounce(callback: () => void, timeout = 0) {
  const timeStampRef = useRef<number>(0);
  let timerId: any = -1;

  return useEventHandler(() => {
    window.requestAnimationFrame(timestamp => {
      if (timestamp < timeStampRef.current) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(callback, timeout);
      timeStampRef.current = timestamp + timeout;
    });
  });
}
