import { FocusEvent, useCallback, useRef } from 'react';

type Options = {
  onFocusByKeyboard?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocusByClick?: (e: FocusEvent<HTMLInputElement>) => void;
};

/**
 * Позволяет разделить обработку получения фокуса в результате клика или с клавиатуры.
 * Основано на том факте что событию фокуса в результате клика предшествует событие onMouseDown.
 */
export function useFocusHandlers({ onFocusByKeyboard, onFocusByClick }: Options) {
  const isFocused = useRef(false);
  const isMouseDown = useRef(false);

  const onFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      isFocused.current = true;

      if (isMouseDown.current) {
        onFocusByClick?.(e);
        isMouseDown.current = false;
      } else {
        onFocusByKeyboard?.(e);
      }
    },
    [isMouseDown, onFocusByClick, onFocusByKeyboard],
  );

  const onBlur = useCallback(() => {
    isFocused.current = false;
    isMouseDown.current = false;
  }, []);

  const onMouseDown = useCallback(() => {
    if (!isFocused.current) {
      isMouseDown.current = true;
    }
  }, [isFocused]);

  return {
    onFocus,
    onBlur,
    onMouseDown,
  };
}
