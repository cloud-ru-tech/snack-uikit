import { KeyboardEventHandler, MouseEventHandler, RefObject, useCallback, useState } from 'react';

import { useEventHandler } from '@snack-ui/utils';

import { isCursorInTheEnd, runAfterRerender, selectAll } from '../helpers';
import { ButtonProps } from './types';

type UseButtonNavigationProps<T> = {
  inputRef: RefObject<T>;
  buttons: ButtonProps[];
  onButtonKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onInputKeyDown?: KeyboardEventHandler<T>;
  readonly: boolean;
};

export function useButtonNavigation<T extends HTMLInputElement | HTMLTextAreaElement>({
  inputRef,
  buttons,
  onButtonKeyDown = () => {},
  onInputKeyDown = () => {},
  readonly,
}: UseButtonNavigationProps<T>) {
  const getInitialButtonTabIndices = useCallback(() => buttons.map(() => -1), [buttons]);
  const [inputTabIndex, setInputTabIndex] = useState(0);
  const [buttonTabIndices, setButtonTabIndices] = useState(getInitialButtonTabIndices);
  const buttonKeyDownEventHandler = useEventHandler(onButtonKeyDown);
  const inputKeyDownEventHandler = useEventHandler(onInputKeyDown);

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
    inputRef.current?.focus();
  }, [inputRef, setInitialTabIndices]);

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

      inputKeyDownEventHandler?.(event);
    },
    [findVisibleButton, focusButton, inputKeyDownEventHandler, inputRef, readonly, setInitialTabIndices],
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

        if (event.key === 'Tab' || event.key === 'Enter' || event.key === 'Space') {
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
