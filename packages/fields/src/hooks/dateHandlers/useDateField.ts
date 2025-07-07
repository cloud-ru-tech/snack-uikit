import { ChangeEvent, FocusEventHandler, KeyboardEvent, RefObject, useCallback, useMemo, useRef } from 'react';

import { TimePickerProps } from '@snack-uikit/calendar';
import { isBrowser } from '@snack-uikit/utils';

import {
  DEFAULT_LOCALE,
  FocusSlot,
  MASK,
  MODES,
  NO_SECONDS_MODE,
  SLOT_ORDER,
  SlotKey,
  SLOTS,
  SLOTS_PLACEHOLDER,
} from '../../constants';
import { Mode, TimeMode } from '../../types';
import { useDateFieldHelpersForMode } from './useDateFieldHelpersForMode';

type BaseProps = {
  inputRef: RefObject<HTMLInputElement>;
  readonly?: boolean;
  locale?: Intl.Locale;
  setIsOpen(v: boolean): void;
  showSeconds?: boolean;
};

type UseDateFieldProps =
  | ({
      mode: Mode;
      onChange?(value: Date | undefined): void;
    } & BaseProps)
  | ({
      mode: TimeMode;
      onChange?: TimePickerProps['onChangeValue'];
    } & BaseProps);

export function useDateField({
  inputRef,
  onChange,
  readonly,
  locale = DEFAULT_LOCALE,
  setIsOpen,
  mode,
  showSeconds,
}: UseDateFieldProps) {
  const dateTimeMode = mode === MODES.DateTime && !showSeconds ? NO_SECONDS_MODE : mode;
  const slotsInfo = SLOTS[dateTimeMode];
  const mask = MASK[dateTimeMode][locale.baseName] || MASK[dateTimeMode][DEFAULT_LOCALE.baseName];
  const slotsPlaceholder =
    SLOTS_PLACEHOLDER[dateTimeMode][locale.baseName] || SLOTS_PLACEHOLDER[dateTimeMode][DEFAULT_LOCALE.baseName];
  const slotOrder = SLOT_ORDER[dateTimeMode];
  const {
    getNextSlotKey,
    getPrevSlotKey,
    getSlotKeyFromIndex,
    setFocus,
    updateSlot,
    getSlot,
    isLikeDate,
    isAllSelected,
    tryToCompleteInput,
    isValidInput,
    parseDate,
  } = useDateFieldHelpersForMode({ inputRef, mode: dateTimeMode });

  const focusSlotKey = useMemo(() => slotOrder[0], [slotOrder]);
  const focusSlotRef = useRef<FocusSlot>(focusSlotKey);

  const setInputFocus = useCallback(
    (focusSlot?: FocusSlot) => {
      if (!inputRef.current || readonly) {
        return;
      }

      if (isBrowser() && document.activeElement !== inputRef.current) {
        focusSlotRef.current = focusSlot || focusSlotKey;
        inputRef.current.focus();
        return;
      }

      const focusSlotValue = focusSlot || focusSlotRef.current;

      if (isLikeDate() && focusSlotValue === focusSlotKey) {
        return;
      }

      if (!inputRef.current.value) {
        inputRef.current.value = mask;
        setFocus(focusSlotKey);
        return;
      }

      if (focusSlot !== 'auto') {
        setFocus(focusSlotValue);
        return;
      }

      const slotKey = getSlotKeyFromIndex(inputRef.current.selectionStart);

      if (slotKey) {
        const { start, end } = slotsInfo[slotKey];
        inputRef.current.setSelectionRange(start, end);
      }
    },
    [inputRef, readonly, isLikeDate, focusSlotKey, getSlotKeyFromIndex, mask, setFocus, slotsInfo],
  );

  const handleClick = useCallback(() => {
    setInputFocus('auto');
  }, [setInputFocus]);

  const handleChange: (value: string, e?: ChangeEvent<HTMLInputElement> | undefined) => void = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange && isLikeDate() && onChange(parseDate(inputRef.current?.value || ''));
  };

  const checkInputAndGoNext = useCallback(
    (slotKey: SlotKey | undefined) => {
      if (slotKey === slotOrder[slotOrder.length - 1] && tryToCompleteInput()) {
        return;
      }

      if (isValidInput()) {
        setFocus(getNextSlotKey(slotKey));
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
          setFocus(getNextSlotKey(slotKey));
      }
    },
    [slotOrder, tryToCompleteInput, isValidInput, setFocus, getNextSlotKey, updateSlot, slotsPlaceholder],
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
        const slotKey = getSlotKeyFromIndex(clickIndex);

        if (slotKey) {
          const value = getSlot(slotKey);
          const { max, min } = slotsInfo[slotKey];

          const numberValue = Number(value) || 0;

          if (e.key === 'ArrowRight') {
            if (isAllSelected() || slotKey === slotOrder[slotOrder.length - 1]) {
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
              setFocus(focusSlotKey);
            } else {
              updateSlot(slotKey, slotsPlaceholder[slotKey] ?? '');
            }
          }

          if (/^\d+$/.test(e.key)) {
            const digit = Number(e.key);
            const slotValue = parseInt(numberValue.toString() + e.key, 10) || 0;

            const valueLength = slotValue.toString().length;
            const maxLength = max.toString().length;
            const isTheLastInput = value.match(/^0+$/) && maxLength === 2 && digit === 0;

            if (valueLength < maxLength) {
              if (slotValue || slotValue >= min) {
                updateSlot(slotKey, slotValue);
                if (isTheLastInput) checkInputAndGoNext(slotKey);
              }

              if (slotValue * 10 > max) {
                checkInputAndGoNext(slotKey);
              }
            } else if (valueLength > maxLength) {
              if (digit * 10 > max) {
                updateSlot(slotKey, e.key);
                checkInputAndGoNext(slotKey);
              } else if (digit || digit >= min) {
                updateSlot(slotKey, e.key);
              }
            } else {
              if (slotValue <= max) {
                updateSlot(slotKey, slotValue);
                checkInputAndGoNext(slotKey);
              } else {
                if (digit * 10 > max) {
                  updateSlot(slotKey, e.key);
                  checkInputAndGoNext(slotKey);
                } else if (digit || digit >= min) {
                  updateSlot(slotKey, e.key);
                }
              }
            }
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange?.(parseDate(isLikeDate() ? inputRef.current.value : ''));
        }
      }
    },
    [
      inputRef,
      readonly,
      getSlotKeyFromIndex,
      setIsOpen,
      tryToCompleteInput,
      getSlot,
      slotsInfo,
      parseDate,
      isLikeDate,
      onChange,
      isAllSelected,
      slotOrder,
      setFocus,
      getNextSlotKey,
      getPrevSlotKey,
      mask,
      focusSlotKey,
      updateSlot,
      slotsPlaceholder,
      checkInputAndGoNext,
    ],
  );

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    if (!readonly && inputRef.current?.value === mask) {
      inputRef.current.value = '';
    }
    focusSlotRef.current = focusSlotKey;
  }, [inputRef, mask, readonly, focusSlotKey]);

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
