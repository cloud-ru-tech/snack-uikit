import { KeyboardEvent, KeyboardEventHandler, MouseEvent, RefObject, useCallback, useMemo, useRef } from 'react';
import { Handler } from 'uncontrollable';

import { useButtonNavigation, useClearButton } from '@snack-uikit/input-private';
import {
  extractChildIds,
  isAccordionItemProps,
  isNextListItemProps,
  SelectionSingleValueType,
} from '@snack-uikit/list';

import { useCopyButton, useValueControl } from '../../hooks';
import { ItemWithId, SearchState, SelectedOptionFormatter } from './types';
import { isBaseOptionProps } from './utils';

type UseHandleOnKeyDownProps = {
  inputKeyDownNavigationHandler: KeyboardEventHandler<HTMLInputElement>;
  onInputKeyDownProp: KeyboardEventHandler<HTMLInputElement> | undefined;
  setOpen(open: boolean): void;
};

export function useHandleOnKeyDown({
  setOpen,
  inputKeyDownNavigationHandler,
  onInputKeyDownProp,
}: UseHandleOnKeyDownProps) {
  return useCallback(
    (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Space') {
        e.stopPropagation();
      } else {
        onKeyDown?.(e);
      }

      if (e.code === 'ArrowUp') {
        setOpen(false);
      }

      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Tab') {
        setOpen(false);
      }

      inputKeyDownNavigationHandler(e);
      onInputKeyDownProp?.(e);
    },
    [inputKeyDownNavigationHandler, onInputKeyDownProp, setOpen],
  );
}

type UseButtonsProps = {
  readonly: boolean;
  showClearButton: boolean;
  showCopyButton: boolean;
  size: 's' | 'm' | 'l';
  onClear(): void;
  inputRef: RefObject<HTMLInputElement>;
  valueToCopy?: string;
};

export function useButtons({
  readonly,
  showClearButton,
  showCopyButton,
  size,
  onClear,
  inputRef,
  valueToCopy = '',
}: UseButtonsProps) {
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  const buttonsRefs: (Element | null)[] = [copyButtonRef.current, clearButtonRef.current];

  const clearButtonSettings = useClearButton({
    clearButtonRef,
    showClearButton: !readonly && showClearButton,
    size,
    onClear,
  });
  const copyButtonSettings = useCopyButton({
    copyButtonRef,
    showCopyButton: readonly && showCopyButton,
    size,
    valueToCopy,
  });
  const { onInputKeyDown: inputKeyDownNavigationHandler, buttons } = useButtonNavigation({
    inputRef,
    buttons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
    onButtonKeyDown: undefined,
    readonly,
    submitKeys: ['Enter', 'Space', 'Tab'],
  });

  return { buttons, inputKeyDownNavigationHandler, buttonsRefs };
}

export function useSearchInput({
  value,
  onChange,
  defaultValue,
  selectedOptionFormatter,
}: SearchState & { selectedOptionFormatter: SelectedOptionFormatter }) {
  const [inputValue = '', setInputValue] = useValueControl<string>({ value, onChange, defaultValue });

  const prevInputValue = useRef<string>(inputValue);

  const updateInputValue = useCallback(
    (selectedItem?: ItemWithId) => {
      const newInputValue = selectedOptionFormatter(selectedItem);

      if (inputValue !== newInputValue || prevInputValue.current !== newInputValue) {
        setInputValue(newInputValue);

        prevInputValue.current = newInputValue;
      }
    },
    [inputValue, selectedOptionFormatter, setInputValue],
  );

  return { inputValue, setInputValue, prevInputValue, onInputValueChange: setInputValue, updateInputValue };
}

export function useHandleDeleteItem(setValue: Handler) {
  return useCallback(
    (item?: ItemWithId) => (e?: MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();

      if (!item) {
        return;
      }

      if (isAccordionItemProps(item) || isNextListItemProps(item)) {
        const removeIds = extractChildIds({ items: item.items }).concat(item.id ?? '');

        setValue((value: SelectionSingleValueType[]) => value?.filter(v => !removeIds.includes(v ?? '')));
        return;
      }

      if (isBaseOptionProps(item)) {
        setValue((value: SelectionSingleValueType[]) => value?.filter(v => v !== item.id));
      }
    },
    [setValue],
  );
}
