import { Dispatch, KeyboardEvent, RefObject, SetStateAction, useCallback } from 'react';

import { TRIGGER_CLOSE_DROPLIST_KEY_CODES, TRIGGER_OPEN_DROPLIST_KEY_KEYS } from './constants';

type UseHandlersProps = {
  triggerRef: RefObject<HTMLButtonElement>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setNeedsFocus: Dispatch<SetStateAction<boolean>>;
  needsFocus: boolean;
};

export function useHandlers({ triggerRef, setIsOpen, setNeedsFocus, needsFocus }: UseHandlersProps) {
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (TRIGGER_OPEN_DROPLIST_KEY_KEYS.includes(e.key)) {
        e.preventDefault();
        setNeedsFocus(true);
        setIsOpen(true);
      }

      if (TRIGGER_CLOSE_DROPLIST_KEY_CODES.includes(e.code)) {
        setNeedsFocus(false);
        setIsOpen(false);
      }
    },
    [setIsOpen, setNeedsFocus],
  );

  const firstElementRefCallback = (el: HTMLButtonElement | null) => {
    needsFocus && el?.focus();
    setNeedsFocus(false);
  };

  const onFocusLeave = useCallback(
    (direction: 'common' | 'top' | 'bottom' | 'left' | 'right') => {
      if (direction === 'top') {
        triggerRef.current?.focus();
        setIsOpen(false);
        setNeedsFocus(false);
      }
    },
    [triggerRef, setIsOpen, setNeedsFocus],
  );

  return { onFocusLeave, onKeyDown, firstElementRefCallback };
}
