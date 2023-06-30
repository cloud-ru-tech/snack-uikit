import { useEffect, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { FieldSelectProps } from '../FieldSelect';
import { Option, SelectionMode } from '../types';
import { useFilteredOptions } from './useFilteredOptions';
import { useListNavigation } from './useListNavigation';

type UseListProps = Pick<
  FieldSelectProps,
  'readonly' | 'disabled' | 'open' | 'onOpenChange' | 'selectionMode' | 'options'
> & {
  searchable: NonNullable<FieldSelectProps['searchable']>;
  displayedValue: string;
  inputValue: string;
  setInputValue(value: string): void;
  isChecked(option: Option): boolean;
};

export function useList({
  selectionMode,
  open,
  onOpenChange,
  readonly,
  disabled,
  searchable,
  displayedValue,
  inputValue,
  setInputValue,
  options,
  isChecked,
}: UseListProps) {
  const touched = useRef(false);
  const localRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
  const showDropList = isOpen && !readonly && !disabled;

  const { extendedOptions, onInputKeyDown } = useListNavigation({
    inputRef: localRef,
    options: useFilteredOptions({ searchable, options, touched: touched.current, inputValue }),
    toggleListOpen: setIsOpen,
    searchable,
    isChecked,
  });

  const handleOpenChange = (value: boolean) => {
    if (value) {
      if (selectionMode === SelectionMode.Multi) {
        setInputValue('');
      }
      localRef.current?.setSelectionRange(0, localRef.current?.value.length);
    } else {
      setInputValue(displayedValue);
      touched.current = false;
    }

    setIsOpen(value);
  };

  const handleInputValueChange = (value: string) => {
    touched.current = true;
    setIsOpen(true);
    setInputValue(value);
  };

  useEffect(() => {
    if (open) {
      localRef.current?.focus();
    }
  }, [localRef, open]);

  return {
    isOpen: showDropList,
    setIsOpen: handleOpenChange,
    touched,
    localRef,
    extendedOptions,
    onInputKeyDown,
    onInputValueChange: handleInputValueChange,
  };
}
