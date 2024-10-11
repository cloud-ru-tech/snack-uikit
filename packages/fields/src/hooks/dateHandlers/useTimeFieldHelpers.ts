import { RefObject, useCallback } from 'react';

import { SlotKey, SLOTS, TIME_MODE } from '../../constants';
import { TimeMode } from '../../types';

export function useTimeFieldHelpers(inputRef: RefObject<HTMLInputElement>, timeMode: TimeMode) {
  const setFocus = useCallback(
    (slotKey: string) => {
      if (inputRef.current) {
        const { start, end } = SLOTS[timeMode][slotKey];

        inputRef.current.setSelectionRange(start, end);
      }
    },
    [inputRef, timeMode],
  );

  const isAllSelected = useCallback(
    () => inputRef.current?.value.length === inputRef.current?.selectionEnd && inputRef.current?.selectionStart === 0,
    [inputRef],
  );

  const getSlot = useCallback(
    (slotKey: string) => {
      if (inputRef.current) {
        return inputRef.current.value.slice(SLOTS[timeMode][slotKey].start, SLOTS[timeMode][slotKey].end);
      }

      return '';
    },
    [inputRef, timeMode],
  );

  const isLikeDate = useCallback(() => {
    if (inputRef.current) {
      return Object.keys(SLOTS[timeMode]).every(
        slotKey => getSlot(slotKey) && Number.isInteger(Number(getSlot(slotKey))),
      );
    }
    return false;
  }, [getSlot, inputRef, timeMode]);

  const isValidInput = useCallback(() => true, []);

  const tryToCompleteInput = useCallback((): boolean => {
    const hours = parseInt(getSlot(SlotKey.Hours), 10);
    const minutes = parseInt(getSlot(SlotKey.Minutes), 10);

    let isCompleted = Boolean(hours !== undefined && minutes !== undefined);

    if (timeMode === TIME_MODE.FullTime) {
      const seconds = parseInt(getSlot(SlotKey.Seconds), 10);

      isCompleted = isCompleted && seconds !== undefined;
    }

    if (isCompleted && inputRef.current) {
      const lastPosition = inputRef.current?.value.length;
      inputRef.current.selectionStart = lastPosition;
      inputRef.current.selectionEnd = lastPosition;
    }

    return isCompleted;
  }, [getSlot, inputRef, timeMode]);

  const updateSlot = useCallback(
    (slotKey: string, slotValue: number | string) => {
      if (inputRef.current) {
        const { start, end, max } = SLOTS[timeMode][slotKey];

        inputRef.current.value =
          inputRef.current.value.slice(0, start) +
          slotValue.toString().padStart(max.toString().length, '0') +
          inputRef.current.value.slice(end);
        setFocus(slotKey);
      }
    },
    [inputRef, setFocus, timeMode],
  );

  return {
    isAllSelected,
    tryToCompleteInput,
    getSlot,
    updateSlot,
    setFocus,
    isLikeDate,
    isValidInput,
  };
}
