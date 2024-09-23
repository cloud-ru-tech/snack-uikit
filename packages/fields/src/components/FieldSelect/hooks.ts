import FuzzySearch from 'fuzzy-search';
import { KeyboardEvent, KeyboardEventHandler, MouseEvent, RefObject, useCallback, useMemo, useRef } from 'react';
import { Handler } from 'uncontrollable';

import { useButtonNavigation, useClearButton } from '@snack-uikit/input-private';
import {
  isAccordionItemProps,
  isNextListItemProps,
  ItemProps,
  kindFlattenItems,
  SelectionSingleValueType,
} from '@snack-uikit/list';

import { useCopyButton, useValueControl } from '../../hooks';
import { extractChildIds } from './legacy';
import { ItemWithId, SearchState, SelectedOptionFormatter } from './types';
import { getValueByPath, isBaseOptionProps } from './utils';

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
  resetSearchOnOptionSelection = true,
}: SearchState & { selectedOptionFormatter: SelectedOptionFormatter; resetSearchOnOptionSelection?: boolean }) {
  const [inputValue = '', setInputValue] = useValueControl<string>({ value, onChange, defaultValue });

  const prevInputValue = useRef<string>(inputValue);

  const updateInputValue = useCallback(
    (selectedItem?: ItemWithId) => {
      const newInputValue = selectedOptionFormatter(selectedItem);

      if (resetSearchOnOptionSelection && (inputValue !== newInputValue || prevInputValue.current !== newInputValue)) {
        setInputValue(newInputValue);

        prevInputValue.current = newInputValue;
      }
    },
    [inputValue, resetSearchOnOptionSelection, selectedOptionFormatter, setInputValue],
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
        setValue((value: SelectionSingleValueType[]) =>
          value?.filter(
            v =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              v !== item.id,
          ),
        );
      }
    },
    [setValue],
  );
}

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 1;
const COMMON_FIELDS_TO_SEARCH = ['content.option', 'content.caption', 'content.description'];

/**
 * Четкий и нечеткий поиск среди айтемов по полям 'content.option', 'content.caption', 'content.description', 'label'
 */
export function useSearch(items: ItemProps[], enableFuzzySearch: boolean = true) {
  const flattenItems = useMemo(() => {
    const { flattenItems } = kindFlattenItems({ items });

    return Object.values(flattenItems);
  }, [items]);

  const filterFunction = useCallback(
    (search: string) => {
      if (!enableFuzzySearch) {
        return flattenItems.filter(item =>
          [...COMMON_FIELDS_TO_SEARCH, 'label'].some(key => {
            const value = getValueByPath(item, key);

            return value.toLowerCase().includes(search.toLowerCase());
          }),
        );
      }

      const searcher = new FuzzySearch(flattenItems, COMMON_FIELDS_TO_SEARCH, {});
      return searcher.search(search);
    },
    [enableFuzzySearch, flattenItems],
  );

  return useCallback(
    (search: string) => (search.length >= DEFAULT_MIN_SEARCH_INPUT_LENGTH ? filterFunction(search) : items),
    [filterFunction, items],
  );
}
