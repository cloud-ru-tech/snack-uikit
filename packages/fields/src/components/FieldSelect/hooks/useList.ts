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
  showClearButton: boolean;
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
  showClearButton: showClearButtonProp,
  inputValue,
  setInputValue,
  options,
  isChecked,
}: UseListProps) {
  const touched = useRef(false);
  const localRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
  const showDropList = isOpen && !readonly && !disabled;
  const showClearButton = showClearButtonProp && !readonly && (showAdditionalButton || inputValue.length > 0);
  const showCopyButton = Boolean(showAdditionalButton && showCopyButtonProp && readonly);

  const { extendedOptions, onInputKeyDown, onButtonKeyDown, onDroplistFocusLeave, firstDroplistItemRefCallback } =
    useListNavigation({
      inputRef: localRef,
      options: useFilteredOptions({ searchable, options, touched: touched.current, inputValue }),
      toggleListOpen: setIsOpen,
      isChecked,
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
    copyButtonRef,
    showCopyButton,
    extendedOptions,
    onInputKeyDown,
    onButtonKeyDown,
    onInputValueChange: handleInputValueChange,
    firstDroplistItemRefCallback,
    onDroplistFocusLeave,
  };
}
