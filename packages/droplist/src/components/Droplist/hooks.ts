import {
  Dispatch,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';

import { ValueOf } from '@snack-uikit/utils';

const TRIGGER_TYPE = {
  Button: 'button',
  Input: 'input',
} as const;

type TriggerType = ValueOf<typeof TRIGGER_TYPE>;

const TRIGGER_OPEN_DROPLIST_KEY_KEYS = {
  [TRIGGER_TYPE.Input]: ['ArrowDown', 'ArrowUp'],
  [TRIGGER_TYPE.Button]: [
    ' ', // <- Space key
    'Enter',
    'ArrowDown',
    'ArrowUp',
  ],
};

const TRIGGER_CLOSE_DROPLIST_KEY_CODES = ['Escape', 'Tab'];

type UseDroplistKeyboardNavigationProps = {
  setDroplistOpen: Dispatch<SetStateAction<boolean>>;
  triggerType?: TriggerType;
};

export function useKeyboardNavigation<T extends HTMLElement>({
  setDroplistOpen,
  triggerType = TRIGGER_TYPE.Button,
}: UseDroplistKeyboardNavigationProps) {
  const [needsFocus, setNeedsFocus] = useState<boolean>(false);
  const triggerElementRef = useRef<T>(null);

  const handleTriggerKeyDown = useCallback(
    (e: KeyboardEvent<T>, cb?: KeyboardEventHandler) => {
      e.stopPropagation();

      if (TRIGGER_OPEN_DROPLIST_KEY_KEYS[triggerType].includes(e.key)) {
        e.preventDefault();

        setDroplistOpen(isOpen => {
          if (isOpen && e.key === 'ArrowDown') {
            setNeedsFocus(true);
            return true;
          }

          if (!isOpen && e.key === 'ArrowUp') {
            return isOpen;
          }

          return !isOpen;
        });
      }

      if (TRIGGER_CLOSE_DROPLIST_KEY_CODES.includes(e.code)) {
        setNeedsFocus(false);
        setDroplistOpen(false);
      }

      cb?.(e);
    },
    [setDroplistOpen, triggerType],
  );

  const firstElementRefCallback = (el: T | null) => {
    needsFocus && el?.focus();
    setNeedsFocus(false);
  };

  const handleDroplistFocusLeave = useCallback(
    (direction: 'common' | 'top' | 'bottom' | 'left' | 'right') => {
      if (direction === 'top') {
        triggerElementRef.current?.focus();
        setDroplistOpen(false);
        setNeedsFocus(false);
      }
    },
    [setDroplistOpen],
  );

  const handleDroplistItemClick = useCallback(
    (e: MouseEvent, cb?: MouseEventHandler) => {
      e.stopPropagation();

      setDroplistOpen(false);
      triggerElementRef.current?.focus();

      cb?.(e);
    },
    [setDroplistOpen],
  );

  const handleDroplistItemKeyDown = useCallback(
    (e: KeyboardEvent, cb?: KeyboardEventHandler) => {
      e.stopPropagation();

      if (TRIGGER_CLOSE_DROPLIST_KEY_CODES.includes(e.code)) {
        setDroplistOpen(false);
        triggerElementRef.current?.focus();
      }

      cb?.(e);
    },
    [setDroplistOpen],
  );

  return {
    handleTriggerKeyDown,
    firstElementRefCallback,
    handleDroplistFocusLeave,
    triggerElementRef,
    handleDroplistItemClick,
    handleDroplistItemKeyDown,
  };
}
