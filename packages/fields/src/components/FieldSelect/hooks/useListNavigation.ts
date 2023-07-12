import { KeyboardEvent, KeyboardEventHandler, RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { moveCursorToEnd, runAfterRerender } from '../../../helpers';
import { Option } from '../types';

type UseListNavigationProps = {
  options: Option[];
  toggleListOpen(value: boolean): void;
  inputRef: RefObject<HTMLInputElement>;
  searchable: boolean;
  scrollVisible: boolean;
  isChecked(option: Option): boolean;
};

export function useListNavigation({
  options,
  toggleListOpen,
  inputRef,
  searchable,
  scrollVisible,
  isChecked,
}: UseListNavigationProps) {
  const scrollIndexStart = 2;
  const scrollIndexFinish = options.length - 3;

  const getInitialTabIndices = useCallback(() => options.map(() => -1), [options]);

  const getClosestAvailableIndex = useCallback(
    (index: number, direction: 'ArrowUp' | 'ArrowDown') => {
      const delta = direction === 'ArrowUp' ? -1 : 1;
      const condition = (i: number) => (direction === 'ArrowUp' ? i >= (searchable ? -1 : 0) : i < options.length);

      for (let availableIndex = index + delta; condition(availableIndex); availableIndex += delta) {
        if (availableIndex === -1) {
          return availableIndex;
        }

        if (!options[availableIndex].disabled) {
          return availableIndex;
        }
      }

      return index;
    },
    [options, searchable],
  );

  const optionsRef = useRef<(HTMLElement | null)[]>([]);
  const [tabIndexes, setTabIndexes] = useState(getInitialTabIndices);

  const setInputFocus = useCallback(() => {
    setTabIndexes(getInitialTabIndices());

    runAfterRerender(() => {
      inputRef.current?.focus();
      moveCursorToEnd(inputRef.current);
    });
  }, [getInitialTabIndices, inputRef]);

  const setOptionFocus = useCallback(
    (index: number) => {
      optionsRef.current[index]?.focus();

      runAfterRerender(() => {
        const option = optionsRef.current[index];
        if (option) {
          option.focus();
          setTabIndexes(tabIndexes.map((_, i) => (i === index ? 0 : -1)));

          if (scrollVisible && index > scrollIndexStart && index < scrollIndexFinish) {
            option.scrollIntoView({ block: 'center' });
          }
        }
      });
    },
    [scrollIndexFinish, scrollVisible, tabIndexes],
  );

  const leaveElement = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      toggleListOpen(true);
      const startIndex = -1;
      setOptionFocus(getClosestAvailableIndex(startIndex, event.key));
    }

    if (event.key === 'Tab') {
      toggleListOpen(false);
    }
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    leaveElement(event);

    if (event.key === 'Enter') {
      toggleListOpen(true);
      setOptionFocus(getClosestAvailableIndex(-1, 'ArrowDown'));
    }
  };

  const onOptionKeyDown = useCallback(
    (index: number) => (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.stopPropagation();
        event.preventDefault();

        const ind = getClosestAvailableIndex(index, event.key);
        ind === -1 ? setInputFocus() : setOptionFocus(ind);
      }

      if (event.key === 'Enter') {
        optionsRef.current[index]?.click();
      }

      if (event.key === 'Tab') {
        toggleListOpen(false);
        // TODO: find out why it works not as expected (focus is moved to the next element instead of the focused one)
        // maybe floating-ui causes the problem
        inputRef.current?.focus();
      }
    },
    [getClosestAvailableIndex, inputRef, setInputFocus, setOptionFocus, toggleListOpen],
  );

  const extendedOptions = useMemo(
    () =>
      options.map((option, index) => ({
        ...option,
        ref: (obj: HTMLElement | null) => (optionsRef.current[index] = obj),
        tabIndex: tabIndexes[index],
        checked: isChecked(option),
        onKeyDown: onOptionKeyDown(index),
      })),
    [isChecked, onOptionKeyDown, options, tabIndexes],
  );

  return {
    onInputKeyDown: handleInputKeyDown,
    onButtonKeyDown: leaveElement,
    extendedOptions,
  };
}
