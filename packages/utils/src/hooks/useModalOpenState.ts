import { useEffect } from 'react';

import { useEventHandler } from './useEventHandler';
import { usePopstateSubscription } from './usePopstateSubscription';

type UseModalOpenStateOptions = {
  /** закрывать модалку при переходе по истории браузера (по умолчанию false) */
  closeOnPopstate?: boolean;
  /** закрывать модалку через CloseWatcher (по умолчанию true) */
  closeByCloseWatcher?: boolean;
};

/**
 * Хук для управления состоянием модалки
 * @returns [open, onClose]
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseWatcher
 * @function hook
 */
export function useModalOpenState(
  /** состояние модалки */
  open: boolean,
  /** колбек закрытия */
  onClose: () => void,
  { closeOnPopstate = false, closeByCloseWatcher = true }: UseModalOpenStateOptions,
) {
  const closeHandler = useEventHandler(onClose);

  usePopstateSubscription(() => open && closeHandler(), closeOnPopstate);

  useEffect(() => {
    if (open && 'CloseWatcher' in window && closeByCloseWatcher) {
      const watcher = new CloseWatcher();
      watcher.onclose = () => closeHandler();
      return () => watcher.destroy();
    }
  }, [open, closeHandler, closeByCloseWatcher]);
}
