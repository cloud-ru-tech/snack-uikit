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

enum TriggerType {
  Button = 'button',
  Input = 'input',
}

const TRIGGER_OPEN_DROPLIST_KEY_KEYS = {
  [TriggerType.Input]: ['ArrowDown', 'ArrowUp'],
  [TriggerType.Button]: [
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
  triggerType = TriggerType.Button,
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

useKeyboardNavigation.triggerTypes = TriggerType;
