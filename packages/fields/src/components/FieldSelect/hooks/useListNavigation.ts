import { KeyboardEvent, KeyboardEventHandler, RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { moveCursorToEnd } from '../../../helpers';
import { Option } from '../types';

type UseListNavigationProps = {
  options: Option[];
  toggleListOpen(value: boolean): void;
  inputRef: RefObject<HTMLInputElement>;
  clearButtonRef: RefObject<HTMLButtonElement>;
  showClearButton: boolean;
  searchable: boolean;
  scrollVisible: boolean;
  isChecked(option: Option): boolean;
};

export function useListNavigation({
  options,
  toggleListOpen,
  inputRef,
  clearButtonRef,
  showClearButton,
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

  const setClearButtonFocus = useCallback(() => {
    clearButtonRef.current?.focus();
  }, [clearButtonRef]);

  const setInputFocus = useCallback(() => {
    setTabIndexes(getInitialTabIndices());
    inputRef.current?.focus();

    setTimeout(() => {
      moveCursorToEnd(inputRef.current);
    }, 0);
  }, [getInitialTabIndices, inputRef]);

  const setOptionFocus = useCallback(
    (index: number) => {
      setTimeout(() => {
        const option = optionsRef.current[index];

        if (option) {
          setTabIndexes(tabIndexes.map((_, i) => (i === index ? 0 : -1)));
          option.focus();

          if (scrollVisible && index > scrollIndexStart && index < scrollIndexFinish) {
            option.scrollIntoView({ block: 'center' });
          }
        }
      }, 0);
    },
    [scrollIndexFinish, scrollVisible, tabIndexes],
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
        event.stopPropagation();
        event.preventDefault();

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

        // TODO: find out why it works not as expected (focus is moved to the next element instead of the focused one)
        // maybe floating-ui causes the problem
        if (showClearButton) {
          setClearButtonFocus();
        } else {
          setInputFocus();
        }
      }
    },
    [getClosestAvailableIndex, setClearButtonFocus, setInputFocus, setOptionFocus, showClearButton, toggleListOpen],
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
