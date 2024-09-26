import { KeyboardEventHandler, MouseEventHandler, RefObject, useCallback, useState } from 'react';

import { useEventHandler } from '@snack-uikit/utils';

import { isCursorInTheBeginning, isCursorInTheEnd, runAfterRerender, selectAll } from '../helpers';
import { ButtonProps } from './types';

type UseButtonNavigationProps<T extends HTMLInputElement | HTMLTextAreaElement> = {
  setInputFocus?(): void;
  inputRef: RefObject<T>;
  postfixButtons: ButtonProps[];
  prefixButtons?: ButtonProps[];
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
  postfixButtons,
  prefixButtons = [],
  onButtonKeyDown = () => {},
  readonly,
  submitKeys,
}: UseButtonNavigationProps<T>) {
  const [inputTabIndex, setInputTabIndex] = useState(0);
  const buttonKeyDownEventHandler = useEventHandler(onButtonKeyDown);

  const getInitialPrefixButtonTabIndices = useCallback(() => prefixButtons.map(() => -1), [prefixButtons]);
  const [prefixButtonTabIndices, setPrefixButtonTabIndices] = useState(getInitialPrefixButtonTabIndices);

  const getInitialPostfixButtonTabIndices = useCallback(() => postfixButtons.map(() => -1), [postfixButtons]);
  const [postfixButtonTabIndices, setPostfixButtonTabIndices] = useState(getInitialPostfixButtonTabIndices);

  const findVisiblePrefixButton = useCallback(
    (index: number, direction: 'ArrowRight' | 'ArrowLeft') => {
      const delta = direction === 'ArrowLeft' ? -1 : 1;
      const condition = (i: number) => (direction === 'ArrowLeft' ? i >= 0 : i < prefixButtons.length);

      for (let i = index + delta; condition(i); i += delta) {
        if (prefixButtons[i].active && prefixButtons[i].show) {
          return i;
        }
      }

      return index;
    },
    [prefixButtons],
  );

  const findVisiblePostfixButton = useCallback(
    (index: number, direction: 'ArrowRight' | 'ArrowLeft') => {
      const delta = direction === 'ArrowLeft' ? -1 : 1;
      const condition = (i: number) => (direction === 'ArrowLeft' ? i >= 0 : i < postfixButtons.length);

      for (let i = index + delta; condition(i); i += delta) {
        if (postfixButtons[i].active && postfixButtons[i].show) {
          return i;
        }
      }

      return index;
    },
    [postfixButtons],
  );

  const setInitialTabIndices = useCallback(() => {
    setInputTabIndex(0);
    setPrefixButtonTabIndices(getInitialPrefixButtonTabIndices);
    setPostfixButtonTabIndices(getInitialPostfixButtonTabIndices);
  }, [getInitialPrefixButtonTabIndices, getInitialPostfixButtonTabIndices]);

  const focusInput = useCallback(() => {
    setInitialTabIndices();
    setInputFocus();
  }, [setInitialTabIndices, setInputFocus]);

  const focusPrefixButton = useCallback(
    (index: number) => {
      setInputTabIndex(-1);
      setPrefixButtonTabIndices(tabIndices => tabIndices.map((_, i) => (i === index ? 0 : -1)));
      setPostfixButtonTabIndices(getInitialPostfixButtonTabIndices);
      prefixButtons[index].active && prefixButtons[index].ref.current?.focus();
    },
    [getInitialPostfixButtonTabIndices, prefixButtons],
  );

  const focusPostfixButton = useCallback(
    (index: number) => {
      setInputTabIndex(-1);
      setPrefixButtonTabIndices(getInitialPrefixButtonTabIndices);
      setPostfixButtonTabIndices(tabIndices => tabIndices.map((_, i) => (i === index ? 0 : -1)));
      postfixButtons[index].active && postfixButtons[index].ref.current?.focus();
    },
    [getInitialPrefixButtonTabIndices, postfixButtons],
  );

  const handleInputKeyDown: KeyboardEventHandler<T> = useCallback(
    event => {
      setInitialTabIndices();

      if (event.key === 'ArrowRight' && (readonly || isCursorInTheEnd(inputRef.current))) {
        const index = findVisiblePostfixButton(-1, event.key);
        if (index >= 0) {
          focusPostfixButton(index);
        }
      }

      if (event.key === 'ArrowLeft' && (readonly || isCursorInTheBeginning(inputRef.current))) {
        const index = findVisiblePrefixButton(prefixButtons.length, event.key);
        if (index >= 0) {
          focusPrefixButton(index);
        }
      }
    },
    [
      findVisiblePostfixButton,
      findVisiblePrefixButton,
      focusPostfixButton,
      focusPrefixButton,
      inputRef,
      prefixButtons.length,
      readonly,
      setInitialTabIndices,
    ],
  );

  const handlePrefixButtonKeyDown = useCallback(
    (index: number): KeyboardEventHandler<HTMLButtonElement> =>
      event => {
        if (event.key === 'ArrowRight') {
          const nextIndex = findVisiblePrefixButton(index, event.key);
          if (index === nextIndex) {
            event.preventDefault();
            focusInput();

            if (readonly) {
              runAfterRerender(() => selectAll(inputRef.current));
            }
          } else {
            focusPrefixButton(nextIndex);
          }
        }

        if (event.key === 'ArrowLeft') {
          if (index <= prefixButtons.length - 1) {
            focusPrefixButton(findVisiblePrefixButton(index, event.key));
          }
        }

        if (submitKeys.includes(event.key)) {
          runAfterRerender(() => setInitialTabIndices());
        }

        buttonKeyDownEventHandler?.(event);
      },
    [
      buttonKeyDownEventHandler,
      prefixButtons.length,
      findVisiblePrefixButton,
      focusPrefixButton,
      focusInput,
      inputRef,
      readonly,
      setInitialTabIndices,
      submitKeys,
    ],
  );

  const handlePostfixButtonKeyDown = useCallback(
    (index: number): KeyboardEventHandler<HTMLButtonElement> =>
      event => {
        if (event.key === 'ArrowLeft') {
          const nextIndex = findVisiblePostfixButton(index, event.key);
          if (index === nextIndex) {
            event.preventDefault();
            focusInput();

            if (readonly) {
              runAfterRerender(() => selectAll(inputRef.current));
            }
          } else {
            focusPostfixButton(nextIndex);
          }
        }

        if (event.key === 'ArrowRight') {
          if (index <= postfixButtons.length - 1) {
            focusPostfixButton(findVisiblePostfixButton(index, event.key));
          }
        }

        if (submitKeys.includes(event.key)) {
          runAfterRerender(() => setInitialTabIndices());
        }

        buttonKeyDownEventHandler?.(event);
      },
    [
      buttonKeyDownEventHandler,
      postfixButtons.length,
      findVisiblePostfixButton,
      focusPostfixButton,
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
    prefixButtons: prefixButtons.some(button => button.show) ? (
      <>
        {prefixButtons.map((props, index) => {
          if (!props.show) {
            return null;
          }

          return props.active
            ? props.render({
                key: props.id,
                ref: props.ref,
                tabIndex: prefixButtonTabIndices[index],
                onKeyDown: handlePrefixButtonKeyDown(index),
                onClick: onButtonClick,
              })
            : props.render({ key: props.id });
        })}
      </>
    ) : undefined,
    postfixButtons: postfixButtons.some(button => button.show) ? (
      <>
        {postfixButtons.map((props, index) => {
          if (!props.show) {
            return null;
          }

          return props.active
            ? props.render({
                key: props.id,
                ref: props.ref,
                tabIndex: postfixButtonTabIndices[index],
                onKeyDown: handlePostfixButtonKeyDown(index),
                onClick: onButtonClick,
              })
            : props.render({ key: props.id });
        })}
      </>
    ) : undefined,
  };
}
