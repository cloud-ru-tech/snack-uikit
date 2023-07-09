import { useEffect, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { FieldSelectProps } from '../FieldSelect';
import { Option } from '../types';
import { useFilteredOptions } from './useFilteredOptions';
import { useListNavigation } from './useListNavigation';

type UseListProps = Pick<
  FieldSelectProps,
  'readonly' | 'disabled' | 'open' | 'onOpenChange' | 'options' | 'showCopyButton'
> & {
  searchable: NonNullable<FieldSelectProps['searchable']>;
  showAdditionalButton: boolean;
  inputValue: string;
  setInputValue(value: string): void;
  isChecked(option: Option): boolean;
};

export function useList({
  open,
  onOpenChange,
  readonly,
  disabled,
  searchable,
  showAdditionalButton,
  showCopyButton: showCopyButtonProp,
  inputValue,
  setInputValue,
  options,
  isChecked,
}: UseListProps) {
  const touched = useRef(false);
  const localRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
  const showDropList = isOpen && !readonly && !disabled;
  const showClearButton = !readonly && (showAdditionalButton || inputValue.length > 0);
  const showCopyButton = showAdditionalButton && showCopyButtonProp && readonly;
  const scrollVisible = options.length > 7;

  const { extendedOptions, onInputKeyDown } = useListNavigation({
    inputRef: localRef,
    clearButtonRef,
    showClearButton,
    options: useFilteredOptions({ searchable, options, touched: touched.current, inputValue }),
    toggleListOpen: setIsOpen,
    searchable,
    isChecked,
    scrollVisible,
  });

  const handleOpenChange = (value: boolean) => {
    if (!value) {
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
    localRef,
    clearButtonRef,
    showClearButton,
    showCopyButton,
    extendedOptions,
    onInputKeyDown,
    scrollVisible,
    onInputValueChange: handleInputValueChange,
  };
}
