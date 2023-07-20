import { RefObject, useCallback } from 'react';

import { SlotKey, SLOTS } from '../constants';

export function useDateFieldHelpers(inputRef: RefObject<HTMLInputElement>) {
  const setFocus = useCallback(
    (slotKey: string) => {
      if (inputRef.current) {
        const { start, end } = SLOTS[slotKey];

        inputRef.current.setSelectionRange(start, end);
      }
    },
    [inputRef],
  );

  const isAllSelected = useCallback(
    () => inputRef.current?.value.length === inputRef.current?.selectionEnd && inputRef.current?.selectionStart === 0,
    [inputRef],
  );

  const getSlot = useCallback(
    (slotKey: string) => {
      if (inputRef.current) {
        return inputRef.current.value.slice(SLOTS[slotKey].start, SLOTS[slotKey].end);
      }

      return '';
    },
    [inputRef],
  );

  const isLikeDate = useCallback(() => {
    if (inputRef.current) {
      return Object.keys(SLOTS).every(slotKey => getSlot(slotKey) && Number.isInteger(Number(getSlot(slotKey))));
    }
    return false;
  }, [getSlot, inputRef]);

  const isValidInput = useCallback((): boolean => {
    const day = parseInt(getSlot(SlotKey.Day), 10);
    const month = parseInt(getSlot(SlotKey.Month), 10);
    const year = parseInt(getSlot(SlotKey.Year), 10);

    if (!month || !day) {
      return true;
    }

    const date = new Date(year || /* високосный год = */ 2020, month - 1, day);

    return date.getDate() === day;
  }, [getSlot]);

  const tryToCompleteInput = useCallback((): boolean => {
    const day = parseInt(getSlot(SlotKey.Day), 10);
    const month = parseInt(getSlot(SlotKey.Month), 10);
    const year = parseInt(getSlot(SlotKey.Year), 10);

    const { min, max } = SLOTS[SlotKey.Year];

    const isCompleted = Boolean(day && month && year >= min && year <= max);

    if (isCompleted && inputRef.current) {
      const lastPosition = inputRef.current?.value.length;
      inputRef.current.selectionStart = lastPosition;
      inputRef.current.selectionEnd = lastPosition;
    }

    return isCompleted;
  }, [getSlot, inputRef]);

  const updateSlot = useCallback(
    (slotKey: string, slotValue: number | string) => {
      if (inputRef.current) {
        const { start, end, max } = SLOTS[slotKey];

        inputRef.current.value =
          inputRef.current.value.slice(0, start) +
          slotValue.toString().padStart(max.toString().length, '0') +
          inputRef.current.value.slice(end);
        setFocus(slotKey);
      }
    },
    [inputRef, setFocus],
  );

  return {
    isAllSelected,
    isValidInput,
    tryToCompleteInput,
    getSlot,
    updateSlot,
    setFocus,
    isLikeDate,
  };
}
