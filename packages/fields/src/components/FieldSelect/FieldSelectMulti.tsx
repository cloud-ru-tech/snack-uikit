import { forwardRef, useCallback, useLayoutEffect, useMemo, useState } from 'react';
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
      setValue([]);
      setInputValue('');
      localRef.current?.focus();

      if (required) {
        setIsOpen(true);
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

    useLayoutEffect(() => {
      if (!isOpen) {
        setInputValue(displayedValue);
      }
    }, [displayedValue, isOpen, selected]);

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
        valueToCopy={valueToCopy}
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
