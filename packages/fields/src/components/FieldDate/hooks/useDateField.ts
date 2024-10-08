import { ChangeEvent, FocusEventHandler, KeyboardEvent, RefObject, useCallback, useMemo, useRef } from 'react';

import { isBrowser } from '@snack-uikit/utils';

import { DEFAULT_LOCALE, MASK, SlotKey, SLOTS, SLOTS_PLACEHOLDER } from '../constants';
import { Mode } from '../types';
import { getNextSlotKey, getPrevSlotKey, getSlotKey, parseDate } from '../utils';
import { useDateFieldHelpers } from './useDateFieldHelpers';
import { useDateTimeFieldHelpers } from './useDateTimeFieldHelpers';

type UseDateFieldProps = {
  inputRef: RefObject<HTMLInputElement>;
  onChange?(value: Date | undefined): void;
  readonly?: boolean;
  locale?: Intl.Locale;
  setIsOpen(v: boolean): void;
  mode: Mode;
};

type FocusSlot = SlotKey.Day | SlotKey.Year | SlotKey.Seconds | 'auto';

export function useDateField({
  inputRef,
  onChange,
  readonly,
  locale = DEFAULT_LOCALE,
  setIsOpen,
  mode,
}: UseDateFieldProps) {
  const dateHelpers = useDateFieldHelpers(inputRef);
  const dateTimeHelpers = useDateTimeFieldHelpers(inputRef);

  const { setFocus, updateSlot, getSlot, isLikeDate, isAllSelected, tryToCompleteInput, isValidInput } =
    mode === 'date' ? dateHelpers : dateTimeHelpers;

  const focusSlotRef = useRef<FocusSlot>(SlotKey.Day);

  const mask = useMemo(
    () => MASK[mode][locale.baseName] || MASK[mode][DEFAULT_LOCALE.baseName],
    [locale.baseName, mode],
  );
  const getNextSlotKeyHandler = getNextSlotKey(mode);
  const getPrevSlotKeyHandler = getPrevSlotKey(mode);

  const slotsPlaceholder = useMemo(
    () => SLOTS_PLACEHOLDER[mode][locale.baseName] || SLOTS_PLACEHOLDER[mode][DEFAULT_LOCALE.baseName],
    [locale.baseName, mode],
  );

  const setInputFocus = useCallback(
    (focusSlot?: FocusSlot) => {
      if (!inputRef.current || readonly) {
        return;
      }

      if (isBrowser() && document.activeElement !== inputRef.current) {
        focusSlotRef.current = focusSlot || SlotKey.Day;
        inputRef.current.focus();
        return;
      }

      const focusSlotValue = focusSlot || focusSlotRef.current;

      if (isLikeDate() && focusSlotValue === SlotKey.Day) {
        return;
      }

      if (!inputRef.current.value) {
        inputRef.current.value = mask;
        setFocus(SlotKey.Day);
        return;
      }

      if (focusSlot !== 'auto') {
        setFocus(focusSlotValue);
        return;
      }

      const slotKey = getSlotKey(inputRef.current.selectionStart, mode);

      if (slotKey) {
        const { start, end } = SLOTS[mode][slotKey];
        inputRef.current.setSelectionRange(start, end);
      }
    },
    [inputRef, isLikeDate, mask, mode, readonly, setFocus],
  );

  const handleClick = useCallback(() => {
    setInputFocus('auto');
  }, [setInputFocus]);

  const handleChange: (value: string, e?: ChangeEvent<HTMLInputElement> | undefined) => void = () => {
    onChange && isLikeDate() && onChange(parseDate(inputRef.current?.value || ''));
  };

  const checkInputAndGoNext = useCallback(
    (slotKey: string) => {
      if (slotKey === (mode === 'date' ? SlotKey.Year : SlotKey.Seconds) && tryToCompleteInput()) {
        return;
      }

      if (isValidInput()) {
        setFocus(getNextSlotKeyHandler(slotKey));
        return;
      }

      switch (slotKey) {
        case SlotKey.Day:
          updateSlot(SlotKey.Month, slotsPlaceholder?.[SlotKey.Month] ?? '');
          setFocus(SlotKey.Month);
          return;
        case SlotKey.Year:
        case SlotKey.Month:
          updateSlot(SlotKey.Day, slotsPlaceholder?.[SlotKey.Day] ?? '');
          setFocus(SlotKey.Day);
          return;
        default:
          setFocus(getNextSlotKeyHandler(slotKey));
      }
    },
    [mode, tryToCompleteInput, isValidInput, setFocus, getNextSlotKeyHandler, updateSlot, slotsPlaceholder],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (inputRef.current && !readonly) {
        if (e.key !== 'Tab') {
          e.preventDefault();
          e.stopPropagation();
        }

        if (e.key !== 'ArrowDown') {
          setIsOpen(false);
        }

        if (e.key === 'Escape') {
          inputRef.current.blur();
          return;
        }

        if (e.key === 'Enter') {
          tryToCompleteInput();
        }

        const clickIndex = inputRef.current.selectionStart;
        const slotKey = getSlotKey(clickIndex, mode);

        if (slotKey) {
          const value = getSlot(slotKey);
          const { max } = SLOTS[mode][slotKey];

          const numberValue = Number(value) || 0;

          if (e.key === 'ArrowRight') {
            if (isAllSelected() || slotKey === (mode === 'date' ? SlotKey.Year : SlotKey.Seconds)) {
              inputRef.current.selectionStart = inputRef.current.value.length;
              return;
            }
            setFocus(getNextSlotKeyHandler(slotKey));
            return;
          }

          if (e.key === 'ArrowLeft') {
            setFocus(getPrevSlotKeyHandler(slotKey));
            return;
          }

          if (e.key === 'Backspace') {
            if (isAllSelected()) {
              inputRef.current.value = mask;
              setFocus(SlotKey.Day);
            } else {
              updateSlot(slotKey, slotsPlaceholder[slotKey] ?? '');
            }
          }

          if (/^\d+$/.test(e.key)) {
            const slotValue = parseInt(numberValue.toString() + e.key, 10) || 0;

            const valueLength = slotValue.toString().length;
            const maxLength = max.toString().length;

            if (valueLength < maxLength) {
              slotValue && updateSlot(slotKey, slotValue);

              if (slotValue * 10 > max) {
                checkInputAndGoNext(slotKey);
              }
            } else if (valueLength > maxLength) {
              if (Number(e.key) * 10 > max) {
                updateSlot(slotKey, e.key);
                checkInputAndGoNext(slotKey);
              } else {
                Number(e.key) && updateSlot(slotKey, e.key);
              }
            } else {
              if (slotValue <= max) {
                updateSlot(slotKey, slotValue);
                checkInputAndGoNext(slotKey);
              } else {
                if (Number(e.key) * 10 > max) {
                  updateSlot(slotKey, e.key);
                  checkInputAndGoNext(slotKey);
                } else {
                  Number(e.key) && updateSlot(slotKey, e.key);
                }
              }
            }
          }
          const newDate = parseDate(isLikeDate() ? inputRef.current.value : '');
          onChange?.(newDate);
        }
      }
    },
    [
      checkInputAndGoNext,
      getNextSlotKeyHandler,
      getPrevSlotKeyHandler,
      getSlot,
      inputRef,
      isAllSelected,
      isLikeDate,
      mask,
      mode,
      onChange,
      readonly,
      setFocus,
      setIsOpen,
      slotsPlaceholder,
      tryToCompleteInput,
      updateSlot,
    ],
  );

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    if (!readonly && inputRef.current?.value === mask) {
      inputRef.current.value = '';
    }
    focusSlotRef.current = SlotKey.Day;
  }, [inputRef, mask, readonly]);

  return {
    handleKeyDown,
    handleChange,
    handleClick,
    setInputFocus,
    value: inputRef.current?.value,
    mask,
    handleBlur,
  };
}
