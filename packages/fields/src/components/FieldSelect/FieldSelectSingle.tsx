import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

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

    const { isOpen, setIsOpen, localRef, extendedOptions, onInputKeyDown, onInputValueChange } = useList({
      open,
      onOpenChange,
      selectionMode,
      disabled,
      readonly,
      inputValue,
      setInputValue,
      displayedValue,
      searchable,
      options,
      isChecked,
    });

    const handleClear = () => {
      setValue('');
      setInputValue('');
      localRef.current?.focus();

      if (required) {
        setIsOpen(true);
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
        ref={ref}
        localRef={localRef}
        selectionMode={selectionMode}
        options={extendedOptions}
        selected={selected}
        disabled={disabled}
        readonly={readonly}
        required={required}
        searchable={searchable}
        showAdditionalButton={showAdditionalButton}
        onChange={handleChange}
        onClear={handleClear}
        displayedValue={displayedValue}
        valueToCopy={displayedValue}
        inputValue={inputValue}
        onInputValueChange={onInputValueChange}
        onInputKeyDown={onInputKeyDown}
        open={isOpen}
        onOpenChange={setIsOpen}
        locale={locale}
        {...rest}
      />
    );
  },
);
