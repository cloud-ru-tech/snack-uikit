import { KeyboardEvent, KeyboardEventHandler, RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { Option } from '../types';

export function useListNavigation({
  options,
  toggleListOpen,
  inputRef,
  searchable,
  isChecked,
}: {
  options: Option[];
  toggleListOpen(value: boolean): void;
  inputRef: RefObject<HTMLInputElement>;
  searchable: boolean;
  isChecked(option: Option): boolean;
}) {
  const getInitialTabIndices = useCallback(() => options.map(() => -1), [options]);

  const getClosestAvailableIndex = useCallback(
    (index: number, direction: 'ArrowUp' | 'ArrowDown') => {
      const delta = direction === 'ArrowUp' ? -1 : 1;
      const outOfLimitIndex = direction === 'ArrowUp' ? -1 : options.length;
      const edgeOfListIndex = direction === 'ArrowUp' ? options.length - 1 : 0;
      let availableIndex: number;

      for (availableIndex = index + delta; availableIndex !== index; availableIndex += delta) {
        if (availableIndex === outOfLimitIndex) {
          if (searchable) {
            availableIndex = -1;
            break;
          }
          availableIndex = edgeOfListIndex;
        }
        if (!options[availableIndex].disabled) {
          break;
        }
      }

      return availableIndex;
    },
    [options, searchable],
  );

  const optionsRef = useRef<(HTMLElement | null)[]>([]);
  const [tabIndexes, setTabIndexes] = useState(getInitialTabIndices);

  const setInputFocus = useCallback(() => {
    inputRef.current?.focus();
    setTabIndexes(getInitialTabIndices());
  }, [getInitialTabIndices, inputRef]);

  const setOptionFocus = useCallback(
    (index: number) => {
      const option = optionsRef.current[index];

      if (option) {
        option.focus();
        setTabIndexes(tabIndexes.map((_, i) => (i === index ? 0 : -1)));
      }
    },
    [tabIndexes],
  );

  const onInputKeyDown: KeyboardEventHandler<HTMLElement> = event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      toggleListOpen(true);
      const startIndex = event.key === 'ArrowUp' ? options.length : -1;
      setOptionFocus(getClosestAvailableIndex(startIndex, event.key));
    }

    if (event.key === 'Enter') {
      toggleListOpen(true);
      setOptionFocus(getClosestAvailableIndex(-1, 'ArrowDown'));
    }

    if (event.key === 'Tab') {
      toggleListOpen(false);
    }
  };

  const onOptionKeyDown = useCallback(
    (index: number) => (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const ind = getClosestAvailableIndex(index, event.key);

        if (ind === -1) {
          setInputFocus();
        } else {
          setOptionFocus(ind);
        }
      }

      if (event.key === 'Enter') {
        optionsRef.current[index]?.click();
      }

      if (event.key === 'Tab') {
        toggleListOpen(false);
        // TODO: find out why it works not as expected, maybe floating-ui causes the pronlem
        setInputFocus();
      }
    },
    [getClosestAvailableIndex, setInputFocus, setOptionFocus, toggleListOpen],
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
    onInputKeyDown,
    extendedOptions,
  };
}
