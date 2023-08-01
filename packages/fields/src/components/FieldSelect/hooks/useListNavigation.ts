import { KeyboardEvent, KeyboardEventHandler, RefObject, useCallback, useMemo, useRef } from 'react';

import { moveCursorToEnd, runAfterRerender } from '../../../helpers';
import { Option } from '../types';

type UseListNavigationProps = {
  options: Option[];
  toggleListOpen(value: boolean): void;
  inputRef: RefObject<HTMLInputElement>;
  isChecked(option: Option): boolean;
};

export function useListNavigation({ options, toggleListOpen, inputRef, isChecked }: UseListNavigationProps) {
  const setInputFocus = useCallback(() => {
    runAfterRerender(() => {
      inputRef.current?.focus();
      moveCursorToEnd(inputRef.current);
    });
  }, [inputRef]);

  const firstDroplistItemRef = useRef<HTMLButtonElement | null>(null);

  const firstDroplistItemRefCallback = useCallback(
    (element: HTMLButtonElement | null) => {
      firstDroplistItemRef.current = element;
    },
    [firstDroplistItemRef],
  );

  const setOptionFocus = useCallback(() => {
    runAfterRerender(() => firstDroplistItemRef.current?.focus());
  }, [firstDroplistItemRef]);

  const leaveElement = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      toggleListOpen(true);
      setOptionFocus();
    }

    if (event.key === 'Tab') {
      toggleListOpen(false);
    }
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    leaveElement(event);

    if (event.key === 'Enter') {
      toggleListOpen(true);
      setOptionFocus();
    }
  };

  const onDroplistFocusLeave = useCallback(
    (direction: string) => {
      if (['top', 'common'].includes(direction)) {
        setInputFocus();
      }
    },
    [setInputFocus],
  );

  const extendedOptions = useMemo(
    () =>
      options.map(option => ({
        ...option,
        checked: isChecked(option),
      })),
    [isChecked, options],
  );

  return {
    onInputKeyDown: handleInputKeyDown,
    onButtonKeyDown: leaveElement,
    onDroplistFocusLeave,
    extendedOptions,
    firstDroplistItemRefCallback,
  };
}
