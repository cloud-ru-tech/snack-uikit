import { FocusEventHandler, forwardRef, MouseEventHandler, useCallback, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { DEFAULT_LOCALE } from './constants';
import { FieldSelectBase } from './FieldSelectBase';
import { getDisplayedValue } from './helpers';
import { useList } from './hooks';
import { FieldSelectMultiProps, Option, SelectionMode } from './types';

export const FieldSelectMulti = forwardRef<HTMLInputElement, FieldSelectMultiProps>(
  (
    {
      value: valueProp,
      onChange,
      options,
      disabled = false,
      readonly = false,
      searchable = true,
      required = false,
      open,
      onOpenChange,
      locale = DEFAULT_LOCALE,
      getSelectedItemsText = number => (locale?.language === 'ru' ? `Выбрано: ${number}` : `Selected: ${number}`),
      showCopyButton: showCopyButtonProp = true,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const selectionMode = SelectionMode.Multi;
    const [value, setValue] = useUncontrolledProp(valueProp, [], onChange);
    const selected = useMemo(() => options.filter(option => value?.includes(option.value)), [options, value]);
    const displayedValue = getDisplayedValue({ selectionMode, selected, getSelectedItemsText });
    const valueToCopy = selected.map(op => op.label).join(', ');
    const [inputValue, setInputValue] = useState('');
    const showAdditionalButton = Boolean(value?.length && value.length > 0 && !disabled);
    const isChecked = useCallback(
      (option: Option) => Boolean(selected.find(op => op.value === option.value)),
      [selected],
    );
    const [isFocused, setIsFocused] = useState(false);
    const stayOpen = useRef(false);
    const waitingForSearchStart = searchable && !isFocused;
    const showDisplayValue = displayedValue && (!searchable || waitingForSearchStart);

    const {
      isOpen,
      setIsOpen,
      localRef,
      extendedOptions,
      onInputKeyDown,
      onInputValueChange,
      clearButtonRef,
      showClearButton,
      showCopyButton,
      scrollVisible,
    } = useList({
      open,
      onOpenChange,
      disabled,
      readonly,
      inputValue,
      setInputValue,
      searchable,
      options,
      isChecked,
      showAdditionalButton,
      showCopyButton: showCopyButtonProp,
    });

    const handleOpenChange = (isOpen: boolean) => {
      if (stayOpen.current) {
        stayOpen.current = false;
        return;
      }

      setInputValue('');
      setIsOpen(isOpen);
    };

    const handlePreventListClose: MouseEventHandler<HTMLElement> = event => {
      event.preventDefault();

      if (isOpen && waitingForSearchStart) {
        stayOpen.current = true;
      }
    };

    const handleClear = () => {
      setValue([]);
      setInputValue('');
      stayOpen.current = false;

      if (required) {
        localRef.current?.focus();
        setIsOpen(true);
      } else {
        localRef.current?.blur();
        setIsOpen(false);
      }
    };

    const handleChange = (option: Option) => () => {
      setValue(
        (selected.find(op => op.value === option.value)
          ? selected.filter(op => op.value !== option.value)
          : [...selected, option]
        ).map(op => op.value),
      );
    };

    const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      setIsFocused(false);
      onBlur?.(event);
    };

    return (
      <FieldSelectBase
        {...rest}
        ref={ref}
        localRef={localRef}
        selectionMode={selectionMode}
        options={extendedOptions}
        selected={selected}
        disabled={disabled}
        readonly={readonly}
        required={required}
        searchable={searchable}
        onChange={handleChange}
        onClear={handleClear}
        displayedValue={showDisplayValue ? displayedValue : ''}
        valueToCopy={valueToCopy}
        inputValue={inputValue}
        onInputValueChange={onInputValueChange}
        onInputKeyDown={onInputKeyDown}
        open={isOpen}
        onOpenChange={handleOpenChange}
        locale={locale}
        showCopyButton={showCopyButton}
        showClearButton={showClearButton}
        clearButtonRef={clearButtonRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onContainerPrivateMouseDown={handlePreventListClose}
        scrollVisible={scrollVisible}
      />
    );
  },
);
