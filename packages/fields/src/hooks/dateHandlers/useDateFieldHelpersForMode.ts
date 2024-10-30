import { RefObject, useCallback, useMemo } from 'react';

import { MODES, NO_SECONDS_MODE, SlotKey, SLOTS, TIME_MODES } from '../../constants';
import { Mode, NoSecondsMode, TimeMode } from '../../types';
import { getNextSlotKeyHandler, getPrevSlotKeyHandler, getSlotKeyFromIndexHandler } from '../../utils/dateFields';

export function useDateFieldHelpersForMode({
  inputRef,
  mode,
}: {
  inputRef: RefObject<HTMLInputElement>;
  mode: Mode | TimeMode | NoSecondsMode;
}) {
  const setFocus = useCallback(
    (slotKey: string) => {
      if (inputRef.current) {
        const { start, end } = SLOTS[mode][slotKey];

        inputRef.current.setSelectionRange(start, end);
      }
    },
    [mode, inputRef],
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
    [mode, inputRef],
  );

  const isLikeDate = useCallback(() => {
    if (inputRef.current) {
      return Object.keys(SLOTS[mode]).every(slotKey => getSlot(slotKey) && Number.isInteger(Number(getSlot(slotKey))));
    }
    return false;
  }, [mode, getSlot, inputRef]);

  const isValidInput = useCallback((): boolean => {
    const isTimeMode = Object.values(TIME_MODES).includes(mode as TimeMode);

    if (isTimeMode) {
      return true;
    }

    const day = parseInt(getSlot(SlotKey.Day), 10);
    const month = parseInt(getSlot(SlotKey.Month), 10);
    const year = parseInt(getSlot(SlotKey.Year), 10);

    if (!month || !day) {
      return true;
    }

    const date = new Date(year || /* високосный год = */ 2020, month - 1, day);

    return date.getDate() === day;
  }, [getSlot, mode]);

  const tryToCompleteInput = useCallback((): boolean => {
    let isCompleted: boolean;

    const parsedSlotsData = Object.keys(SLOTS[mode]).reduce(
      (res, key) => {
        const slotKey = key as SlotKey;
        res[slotKey] = parseInt(getSlot(slotKey), 10);
        return res;
      },
      {} as Record<SlotKey, number>,
    );

    const {
      [SlotKey.Day]: day,
      [SlotKey.Month]: month,
      [SlotKey.Year]: year,
      [SlotKey.Hours]: hours,
      [SlotKey.Minutes]: minutes,
      [SlotKey.Seconds]: seconds,
    } = parsedSlotsData;

    const yearSlotMeta = SLOTS[mode][SlotKey.Year];
    const isDateCompleted = Boolean(day && month && year >= yearSlotMeta?.min && year <= yearSlotMeta?.max);
    const isTimeCompleted = [
      hours,
      minutes,
      ...(mode === MODES.DateTime || mode === TIME_MODES.FullTime ? [seconds] : []),
    ].every(value => value !== undefined);

    if (mode === MODES.DateTime || mode === NO_SECONDS_MODE) {
      isCompleted = isDateCompleted && isTimeCompleted;
    } else if (mode === TIME_MODES.FullTime || mode === TIME_MODES.NoSeconds) {
      isCompleted = isTimeCompleted;
    } else {
      isCompleted = isDateCompleted;
    }

    if (isCompleted && inputRef.current) {
      const lastPosition = inputRef.current?.value.length;
      inputRef.current.selectionStart = lastPosition;
      inputRef.current.selectionEnd = lastPosition;
    }

    return isCompleted;
  }, [getSlot, inputRef, mode]);

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
    [inputRef, setFocus, mode],
  );

  const getNextSlotKey = useMemo(() => getNextSlotKeyHandler(mode), [mode]);
  const getPrevSlotKey = useMemo(() => getPrevSlotKeyHandler(mode), [mode]);
  const getSlotKeyFromIndex = useMemo(() => getSlotKeyFromIndexHandler(mode), [mode]);

  return {
    isAllSelected,
    isValidInput,
    tryToCompleteInput,
    getSlot,
    updateSlot,
    setFocus,
    isLikeDate,
    getNextSlotKey,
    getPrevSlotKey,
    getSlotKeyFromIndex,
  };
}
