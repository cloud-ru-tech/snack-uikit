import mergeRefs from 'merge-refs';
import { forwardRef, KeyboardEvent, KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { InputPrivate } from '@snack-uikit/input-private';
import { Droplist, SelectionSingleValueType, useFuzzySearch } from '@snack-uikit/list';
import { extractSupportProps } from '@snack-uikit/utils';

import { FieldContainerPrivate } from '../../helperComponents';
import { FieldDecorator } from '../FieldDecorator';
import { useButtons, useHandleOnKeyDown, useSearchInput } from './hooks';
import styles from './styles.module.scss';
import { FieldSelectSingleProps } from './types';
import { extractSelectedOptions, getArrowIcon, transformOptionsToItems } from './utils';

export const FieldSelectSingle = forwardRef<HTMLInputElement, FieldSelectSingleProps>(
  (
    {
      id,
      name,
      placeholder,
      size = 's',
      options,
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
      loading,
      disabled = false,
      readonly = false,
      searchable = true,
      showCopyButton = true,
      showClearButton = true,
      onKeyDown: onInputKeyDownProp,
      label,
      labelTooltip,
      labelTooltipPlacement,
      required = false,
      hint,
      showHintIcon,
      validationState = 'default',
      footer,
      search,
      autocomplete = false,
      prefixIcon,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useUncontrolledProp<string | number | undefined>(valueProp, defaultValue, onChangeProp);

    const items = useMemo(() => transformOptionsToItems(options), [options]);
    const selectedOption = useMemo(() => extractSelectedOptions(options, value), [options, value]);

    const { inputValue, onInputValueChange, prevInputValue } = useSearchInput({
      ...search,
      defaultValue: String(selectedOption ?? ''),
    });

    useEffect(() => {
      !open && onInputValueChange(String(selectedOption?.option ?? ''));
    }, [onInputValueChange, open, selectedOption]);

    useEffect(() => {
      onInputValueChange(String(selectedOption?.option ?? ''));

      prevInputValue.current = String(selectedOption?.option ?? '');
    }, [prevInputValue, onInputValueChange, selectedOption]);

    const onClear = () => {
      setValue('');
      onInputValueChange('');

      localRef.current?.focus();
      setOpen(true);
    };

    const { ArrowIcon, arrowIconSize } = getArrowIcon({ size, open });

    const { buttons, inputKeyDownNavigationHandler, buttonsRefs } = useButtons({
      readonly,
      size,
      showClearButton: showClearButton && Boolean(value),
      showCopyButton,
      inputRef: localRef,
      onClear,
      valueToCopy: String(selectedOption?.option ?? ''),
    });

    const commonHandleOnKeyDown = useHandleOnKeyDown({
      inputKeyDownNavigationHandler,
      onInputKeyDownProp,
      setOpen,
    });

    const handleOnKeyDown = (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (!open && prevInputValue.current !== inputValue) {
        setOpen(true);
      }

      commonHandleOnKeyDown(onKeyDown)(e);
    };

    const handleSelectionChange = (newValue?: SelectionSingleValueType) => {
      setValue(newValue);
      localRef.current?.focus();

      if (newValue) {
        setOpen(false);
      }
    };

    const handleOpenChange = (open: boolean) => {
      if (!readonly && !disabled && !buttonsRefs.includes(document.activeElement)) {
        setOpen(open);
      }
    };

    const fuzzySearch = useFuzzySearch(items);
    const result = autocomplete ? items : fuzzySearch(prevInputValue.current !== inputValue ? inputValue : '');

    return (
      <FieldDecorator
        {...extractSupportProps(rest)}
        required={required}
        readonly={readonly}
        label={label}
        labelTooltip={labelTooltip}
        labelTooltipPlacement={labelTooltipPlacement}
        labelFor={id}
        hint={hint}
        disabled={disabled}
        showHintIcon={showHintIcon}
        size={size}
        validationState={validationState}
      >
        <Droplist
          trigger='clickAndFocusVisible'
          placement='bottom'
          data-test-id='field-select__list'
          items={result}
          triggerElemRef={localRef}
          scroll
          marker
          footer={footer}
          selection={{
            mode: 'single',
            value: value,
            onChange: handleSelectionChange,
          }}
          size={size}
          open={open}
          onOpenChange={handleOpenChange}
          loading={loading}
        >
          {({ onKeyDown }) => (
            <FieldContainerPrivate
              className={styles.container}
              validationState={validationState}
              disabled={disabled}
              readonly={readonly}
              focused={open}
              variant={'single-line-container'}
              inputRef={localRef}
              size={size}
              prefix={prefixIcon}
            >
              <InputPrivate
                id={id}
                name={name}
                type='text'
                disabled={disabled}
                placeholder={placeholder}
                ref={mergeRefs(ref, localRef)}
                onChange={searchable ? onInputValueChange : undefined}
                value={inputValue}
                readonly={!searchable || readonly}
                data-test-id='field-select__input'
                onKeyDown={handleOnKeyDown(onKeyDown)}
              />

              <div className={styles.postfix}>
                {buttons}
                <ArrowIcon size={arrowIconSize} className={styles.arrowIcon} />
              </div>
            </FieldContainerPrivate>
          )}
        </Droplist>
      </FieldDecorator>
    );
  },
);
