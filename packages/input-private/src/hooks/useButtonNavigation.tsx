import { KeyboardEventHandler, MouseEventHandler, RefObject, useCallback, useState } from 'react';

import { useEventHandler } from '@snack-ui/utils';

import { isCursorInTheEnd, runAfterRerender, selectAll } from '../helpers';
import { ButtonProps } from './types';

type UseButtonNavigationProps<T extends HTMLInputElement | HTMLTextAreaElement> = {
  setInputFocus?(): void;
  inputRef: RefObject<T>;
  buttons: ButtonProps[];
  onButtonKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  readonly: boolean;
  submitKeys: string[];
};

/**
 * Позволяет использовать клавиатуру для навигации по элементам управления
 * @function hook
 */
export function useButtonNavigation<T extends HTMLInputElement | HTMLTextAreaElement>({
  inputRef,
  setInputFocus = () => inputRef.current?.focus(),
  buttons,
  onButtonKeyDown = () => {},
  readonly,
  submitKeys,
}: UseButtonNavigationProps<T>) {
  const getInitialButtonTabIndices = useCallback(() => buttons.map(() => -1), [buttons]);
  const [inputTabIndex, setInputTabIndex] = useState(0);
  const [buttonTabIndices, setButtonTabIndices] = useState(getInitialButtonTabIndices);
  const buttonKeyDownEventHandler = useEventHandler(onButtonKeyDown);

  const findVisibleButton = useCallback(
    (index: number, direction: 'ArrowRight' | 'ArrowLeft') => {
      const delta = direction === 'ArrowLeft' ? -1 : 1;
      const condition = (i: number) => (direction === 'ArrowLeft' ? i >= 0 : i < buttons.length);

      for (let i = index + delta; condition(i); i += delta) {
        if (buttons[i].show) {
          return i;
        }
      }

      return index;
    },
    [buttons],
  );

  const setInitialTabIndices = useCallback(() => {
    setInputTabIndex(0);
    setButtonTabIndices(getInitialButtonTabIndices);
  }, [getInitialButtonTabIndices]);

  const focusInput = useCallback(() => {
    setInitialTabIndices();
    setInputFocus();
  }, [setInitialTabIndices, setInputFocus]);

  const focusButton = useCallback(
    (index: number) => {
      setInputTabIndex(-1);
      setButtonTabIndices(tabIndices => tabIndices.map((_, i) => (i === index ? 0 : -1)));
      buttons[index].ref.current?.focus();
    },
    [buttons],
  );

  const handleInputKeyDown: KeyboardEventHandler<T> = useCallback(
    event => {
      setInitialTabIndices();

      if (event.key === 'ArrowRight' && (readonly || isCursorInTheEnd(inputRef.current))) {
        const index = findVisibleButton(-1, event.key);
        if (index >= 0) {
          focusButton(index);
        }
      }
    },
    [findVisibleButton, focusButton, inputRef, readonly, setInitialTabIndices],
  );

  const handleButtonKeyDown = useCallback(
    (index: number): KeyboardEventHandler<HTMLButtonElement> =>
      event => {
        if (event.key === 'ArrowLeft') {
          const nextIndex = findVisibleButton(index, event.key);
          if (index === nextIndex) {
            event.preventDefault();
            focusInput();

            if (readonly) {
              runAfterRerender(() => selectAll(inputRef.current));
            }
          } else {
            focusButton(nextIndex);
          }
        }

        if (event.key === 'ArrowRight') {
          if (index <= buttons.length - 1) {
            focusButton(findVisibleButton(index, event.key));
          }
        }

        if (submitKeys.includes(event.key)) {
          runAfterRerender(() => setInitialTabIndices());
        }

        buttonKeyDownEventHandler?.(event);
      },
    [
      buttonKeyDownEventHandler,
      buttons.length,
      findVisibleButton,
      focusButton,
      focusInput,
      inputRef,
      readonly,
      setInitialTabIndices,
      submitKeys,
    ],
  );

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    runAfterRerender(() => setInitialTabIndices());
  }, [setInitialTabIndices]);

  return {
    inputTabIndex,
    onInputKeyDown: handleInputKeyDown,
    setInitialTabIndices,
    buttons: (
      <>
        {buttons.map(({ id, render, ref, show }, index) =>
          show
            ? render({
                key: id,
                ref,
                tabIndex: buttonTabIndices[index],
                onKeyDown: handleButtonKeyDown(index),
                onClick: onButtonClick,
              })
            : null,
        )}
      </>
    ),
  };
}
