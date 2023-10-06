import { Dispatch, KeyboardEvent, SetStateAction, useCallback, useRef, useState } from 'react';

const TRIGGER_OPEN_DROPLIST_KEY_KEYS = [
  ' ', // <- Space key
  'ArrowDown',
];

const TRIGGER_CLOSE_DROPLIST_KEY_CODES = ['Escape', 'Tab'];

type UseDroplistKeyboardNavigationProps = {
  setDroplistOpen: Dispatch<SetStateAction<boolean>>;
};

export function useDroplistKeyboardNavigation({ setDroplistOpen }: UseDroplistKeyboardNavigationProps) {
  const [needsFocus, setNeedsFocus] = useState<boolean>(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const handleTriggerButtonKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (TRIGGER_OPEN_DROPLIST_KEY_KEYS.includes(e.key)) {
        e.preventDefault();
        setNeedsFocus(true);
        setDroplistOpen(true);
      }

      if (TRIGGER_CLOSE_DROPLIST_KEY_CODES.includes(e.code)) {
        setNeedsFocus(false);
        setDroplistOpen(false);
      }
    },
    [setDroplistOpen],
  );

  const firstElementRefCallback = (el: HTMLButtonElement | null) => {
    needsFocus && el?.focus();
    setNeedsFocus(false);
  };

  const handleDroplistFocusLeave = useCallback(
    (direction: 'common' | 'top' | 'bottom' | 'left' | 'right') => {
      if (direction === 'top') {
        triggerButtonRef.current?.focus();
        setDroplistOpen(false);
        setNeedsFocus(false);
      }
    },
    [setDroplistOpen],
  );

  return {
    handleTriggerButtonKeyDown,
    firstElementRefCallback,
    handleDroplistFocusLeave,
    triggerButtonRef,
  };
}
