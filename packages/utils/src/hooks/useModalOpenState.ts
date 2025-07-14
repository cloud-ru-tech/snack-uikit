import { useEffect } from 'react';

import { useEventHandler } from './useEventHandler';
import { usePopstateSubscription } from './usePopstateSubscription';

type UseModalOpenStateOptions = {
  closeOnPopstate?: boolean;
  closeByCloseWatcher?: boolean;
  onCloseRequest?: () => boolean;
};

const defaultOnCloseRequest = () => true;

/**
 * Хук для управления состоянием модалки
 * @param open состояние модалки
 * @param onClose колбек закрытия
 * @param options.closeOnPopstate закрывать модалку при переходе по истории браузера (по умолчанию false)
 * @param options.closeByCloseWatcher закрывать модалку через CloseWatcher (по умолчанию true)
 * @param options.onCloseRequest колбек запроса закрытия модалки (если возвращает true, то модалка закроется, если false, то не закроется)
 * @returns [open, onClose]
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseWatcher
 */
export function useModalOpenState(
  open: boolean,
  onClose: () => void,
  {
    closeOnPopstate = false,
    closeByCloseWatcher = true,
    onCloseRequest = defaultOnCloseRequest,
  }: UseModalOpenStateOptions,
) {
  const closeHandler = useEventHandler(onClose);
  const onCloseRequestHandler = useEventHandler(onCloseRequest);

  usePopstateSubscription(() => open && closeHandler(), closeOnPopstate);

  useEffect(() => {
    if (open && 'CloseWatcher' in window && closeByCloseWatcher) {
      const watcher = new CloseWatcher();
      watcher.oncancel = e => !onCloseRequestHandler() && e.preventDefault();
      watcher.onclose = () => closeHandler();

      return () => watcher.destroy();
    }
  }, [open, closeHandler, closeByCloseWatcher, onCloseRequestHandler]);
}
