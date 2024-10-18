import { RefObject, useCallback } from 'react';

import { MODES, NO_SECONDS_MODE, SlotKey, SLOTS } from '../../constants';

export function useDateTimeFieldHelpers(inputRef: RefObject<HTMLInputElement>, showSeconds?: boolean) {
  const mode = showSeconds ? MODES.DateTime : NO_SECONDS_MODE;

  const setFocus = useCallback(
    (slotKey: string) => {
      if (inputRef.current) {
        const { start, end } = SLOTS[mode][slotKey];

        inputRef.current.setSelectionRange(start, end);
      }
    },
    [inputRef, mode],
  );

  const isAllSelected = useCallback(
    () => inputRef.current?.value.length === inputRef.current?.selectionEnd && inputRef.current?.selectionStart === 0,
    [inputRef],
  );

  const getSlot = useCallback(
    (slotKey: string) => {
      if (inputRef.current) {
        return inputRef.current.value.slice(SLOTS[mode][slotKey].start, SLOTS[mode][slotKey].end);
      }

      return '';
    },
    [inputRef, mode],
  );

  const isLikeDate = useCallback(() => {
    if (inputRef.current) {
      return Object.keys(SLOTS[mode]).every(slotKey => getSlot(slotKey) && Number.isInteger(Number(getSlot(slotKey))));
    }
    return false;
  }, [getSlot, inputRef, mode]);

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
    const hours = parseInt(getSlot(SlotKey.Hours), 10);
    const minutes = parseInt(getSlot(SlotKey.Minutes), 10);
    const seconds = parseInt(getSlot(SlotKey.Seconds), 10);

    const { min, max } = SLOTS[mode][SlotKey.Year];

    const isCompleted = Boolean(
      day &&
        month &&
        year >= min &&
        year <= max &&
        [hours, minutes, ...(showSeconds ? [seconds] : [])].every(value => value !== undefined),
    );

    if (isCompleted && inputRef.current) {
      const lastPosition = inputRef.current?.value.length;
      inputRef.current.selectionStart = lastPosition;
      inputRef.current.selectionEnd = lastPosition;
    }

    return isCompleted;
  }, [getSlot, inputRef, mode, showSeconds]);

  const updateSlot = useCallback(
    (slotKey: string, slotValue: number | string) => {
      if (inputRef.current) {
        const { start, end, max } = SLOTS[mode][slotKey];

        inputRef.current.value =
          inputRef.current.value.slice(0, start) +
          slotValue.toString().padStart(max.toString().length, '0') +
          inputRef.current.value.slice(end);
        setFocus(slotKey);
      }
    },
    [inputRef, mode, setFocus],
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
