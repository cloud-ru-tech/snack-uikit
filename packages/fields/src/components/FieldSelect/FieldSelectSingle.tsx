import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { selectAll } from '@snack-ui/input-private';

import { DEFAULT_LOCALE, EMPTY_OPTION } from './constants';
import { FieldSelectBase } from './FieldSelectBase';
import { getDisplayedValue } from './helpers';
import { useList } from './hooks';
import { FieldSelectSingleProps, Option, SelectionMode } from './types';

export const FieldSelectSingle = forwardRef<HTMLInputElement, FieldSelectSingleProps>(
  (
    {
      value: valueProp,
      onChange,
      options,
      disabled = false,
      readonly = false,
      searchable = true,
      required = false,
      locale = DEFAULT_LOCALE,
      open,
      onOpenChange,
      showCopyButton: showCopyButtonProp = true,
      ...rest
    },
    ref,
  ) => {
    const selectionMode = SelectionMode.Single;
    const [value, setValue] = useUncontrolledProp(valueProp, '', onChange);
    const selected = useMemo(() => options.find(option => option.value === value) ?? EMPTY_OPTION, [options, value]);
    const displayedValue = getDisplayedValue({ selectionMode, selected });
    const [inputValue, setInputValue] = useState(selected.label);
    const showAdditionalButton = Boolean(value && !disabled);
    const isChecked = useCallback((option: Option) => selected.value === option.value, [selected.value]);

    const {
      isOpen,
      setIsOpen,
      localRef,
      extendedOptions,
      onInputKeyDown,
      onInputValueChange,
      onButtonKeyDown,
      clearButtonRef,
      copyButtonRef,
      showClearButton,
      showCopyButton,
      onDroplistFocusLeave,
      firstDroplistItemRefCallback,
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
      showCopyButton: showCopyButtonProp,
      showAdditionalButton,
    });

    const handleOpenChange = (isOpen: boolean) => {
      if (isOpen) {
        searchable && selectAll(localRef.current);
      } else {
        setInputValue(displayedValue);
      }

      setIsOpen(isOpen);
    };

    const handleClear = () => {
      setValue('');
      setInputValue('');

      if (required) {
        localRef.current?.focus();
        setIsOpen(true);
      } else {
        localRef.current?.blur();
        setIsOpen(false);
      }
    };

    const handleChange = (option: Option) => () => {
      setValue(option.value);
      setInputValue(option.label);
      setIsOpen(false);
      localRef.current?.focus();
    };

    useEffect(() => {
      setInputValue(selected.label);
    }, [selected]);

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
        valueToCopy={displayedValue}
        inputValue={searchable ? inputValue : displayedValue}
        onInputValueChange={onInputValueChange}
        onInputKeyDown={onInputKeyDown}
        clearButtonRef={clearButtonRef}
        copyButtonRef={copyButtonRef}
        onButtonKeyDown={onButtonKeyDown}
        open={isOpen}
        onOpenChange={handleOpenChange}
        locale={locale}
        showCopyButton={showCopyButton}
        showClearButton={showClearButton}
        onDroplistFocusLeave={onDroplistFocusLeave}
        firstDroplistItemRefCallback={firstDroplistItemRefCallback}
      />
    );
  },
);
