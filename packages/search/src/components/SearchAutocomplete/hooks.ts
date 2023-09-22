import { KeyboardEvent, RefObject, useCallback, useState } from 'react';

import { moveCursorToEnd, runAfterRerender } from '@snack-ui/input-private';

type UseHandlersProps = {
  localRef: RefObject<HTMLInputElement>;
  onSubmit?(value: string): void;
  onChange?(value: string): void;
  scrollRef: RefObject<HTMLElement>;
};

export function useHandlers({ localRef, onSubmit, onChange, scrollRef }: UseHandlersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [needsFocus, setNeedsFocus] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Tab': {
          e.preventDefault();
          runAfterRerender(() => {
            setIsOpen(false);
            setNeedsFocus(false);
            localRef.current?.blur();
          });
          break;
        }
        case 'Escape': {
          e.preventDefault();
          runAfterRerender(() => {
            setIsOpen(false);
            setNeedsFocus(false);
            localRef.current?.focus();
            moveCursorToEnd(localRef.current);
          });
          break;
        }
        case 'ArrowRight':
        case 'ArrowLeft': {
          break;
        }
        case 'ArrowUp': {
          e.stopPropagation();
          break;
        }
        case 'Enter': {
          e.preventDefault();
          runAfterRerender(() => {
            setNeedsFocus(false);
            setIsOpen(false);
          });
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          setNeedsFocus(true);
          setIsOpen(true);
          break;
        }
        default: {
          setIsOpen(true);
          e.stopPropagation();
        }
      }
    },
    [localRef],
  );

  const handleOptionKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      // ignoring special keys (tab, arrows, backspace and etc.)
      if (event.key.length === 1) {
        localRef.current?.focus();
        scrollRef.current?.scroll(0, 0);
      }
    },
    [localRef, scrollRef],
  );

  const handleOnFocusLeave = useCallback(
    (direction: 'common' | 'top' | 'bottom' | 'left') => {
      if (['top', 'common'].includes(direction)) {
        runAfterRerender(() => {
          localRef.current?.focus();
          moveCursorToEnd(localRef.current);
          setIsOpen(false);
        });
      }
    },
    [localRef],
  );

  const handleItemOnClick = useCallback(
    (option: string) => {
      onChange && onChange(option);
      onSubmit && onSubmit(option);
      localRef.current?.blur();
      setNeedsFocus(false);
      setIsOpen(false);
    },
    [localRef, onChange, onSubmit],
  );

  const firstElementRefCallback = useCallback(
    (el: HTMLButtonElement | null) => {
      needsFocus && el?.focus();
      setNeedsFocus(false);
    },
    [needsFocus],
  );

  return {
    isOpen,
    setIsOpen,
    needsFocus,
    handleOnFocusLeave,
    handleKeyDown,
    handleOptionKeyDown,
    handleItemOnClick,
    firstElementRefCallback,
  };
}
