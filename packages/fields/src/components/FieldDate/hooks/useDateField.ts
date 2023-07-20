import { ChangeEvent, FocusEventHandler, KeyboardEvent, RefObject, useCallback, useMemo, useRef } from 'react';

import { DEFAULT_LOCALE, MASK, SlotKey, SLOTS, SLOTS_PLACEHOLDER } from '../constants';
import { getNextSlotKey, getPrevSlotKey, getSlotKey } from '../utils';
import { useDateFieldHelpers } from './useDateFieldHelpers';

type UseDateFieldProps = {
  inputRef: RefObject<HTMLInputElement>;
  onChange?(value: string): void;
  readonly?: boolean;
  locale?: Intl.Locale;
  setIsOpen(v: boolean): void;
};

type FocusSlot = SlotKey.Day | SlotKey.Year | 'auto';

export function useDateField({ inputRef, onChange, readonly, locale = DEFAULT_LOCALE, setIsOpen }: UseDateFieldProps) {
  const { setFocus, updateSlot, getSlot, isLikeDate, isAllSelected, isValidInput, tryToCompleteInput } =
    useDateFieldHelpers(inputRef);
  const focusSlotRef = useRef<FocusSlot>(SlotKey.Day);

  const mask = useMemo(() => MASK[locale.baseName] || MASK[DEFAULT_LOCALE.baseName], [locale]);

  const slotsPlaceHolder = useMemo(
    () => SLOTS_PLACEHOLDER[locale.baseName] || SLOTS_PLACEHOLDER[DEFAULT_LOCALE.baseName],
    [locale.baseName],
  );

  const setInputFocus = useCallback(
    (focusSlot?: FocusSlot) => {
      if (!inputRef.current || readonly) {
        return;
      }

      if (document.activeElement !== inputRef.current) {
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

      const slotKey = getSlotKey(inputRef.current.selectionStart);

      if (slotKey) {
        const { start, end } = SLOTS[slotKey];
        inputRef.current.setSelectionRange(start, end);
      }
    },
    [inputRef, isLikeDate, mask, readonly, setFocus],
  );

  const handleClick = useCallback(() => {
    setInputFocus('auto');
  }, [setInputFocus]);

  const handleChange: (value: string, e?: ChangeEvent<HTMLInputElement> | undefined) => void = () => {
    onChange && isLikeDate() && onChange(inputRef.current?.value || '');
  };

  const checkInputAndGoNext = useCallback(
    (slotKey: string) => {
      if (slotKey === SlotKey.Year && tryToCompleteInput()) {
        return;
      }

      if (isValidInput()) {
        setFocus(getNextSlotKey(slotKey));
        return;
      }

      switch (slotKey) {
        case SlotKey.Day:
          updateSlot(SlotKey.Month, slotsPlaceHolder[SlotKey.Month]);
          setFocus(SlotKey.Month);
          return;
        case SlotKey.Year:
        case SlotKey.Month:
          updateSlot(SlotKey.Day, slotsPlaceHolder[SlotKey.Day]);
          setFocus(SlotKey.Day);
          return;
        default:
          setFocus(getNextSlotKey(slotKey));
      }
    },
    [tryToCompleteInput, isValidInput, setFocus, slotsPlaceHolder, updateSlot],
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
        const slotKey = getSlotKey(clickIndex);

        if (slotKey) {
          const value = getSlot(slotKey);
          const { max } = SLOTS[slotKey];

          const numberValue = Number(value) || 0;

          if (e.key === 'ArrowRight') {
            if (isAllSelected() || slotKey === SlotKey.Year) {
              inputRef.current.selectionStart = inputRef.current.value.length;
              return;
            }
            setFocus(getNextSlotKey(slotKey));
            return;
          }

          if (e.key === 'ArrowLeft') {
            setFocus(getPrevSlotKey(slotKey));
            return;
          }

          if (e.key === 'Backspace') {
            if (isAllSelected()) {
              inputRef.current.value = mask;
              setFocus(SlotKey.Day);
            } else {
              updateSlot(slotKey, slotsPlaceHolder[slotKey]);
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
          onChange?.(isLikeDate() ? inputRef.current.value : '');
        }
      }
    },
    [
      checkInputAndGoNext,
      getSlot,
      inputRef,
      isAllSelected,
      isLikeDate,
      mask,
      onChange,
      readonly,
      setFocus,
      setIsOpen,
      slotsPlaceHolder,
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
