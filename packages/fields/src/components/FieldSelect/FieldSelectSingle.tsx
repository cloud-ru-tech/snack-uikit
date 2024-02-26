import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, KeyboardEventHandler, useEffect, useMemo, useRef } from 'react';

import { InputPrivate } from '@snack-uikit/input-private';
import { Droplist, ItemProps, SelectionSingleValueType, useFuzzySearch } from '@snack-uikit/list';
import { extractSupportProps } from '@snack-uikit/utils';

import { FieldContainerPrivate } from '../../helperComponents';
import { useValueControl } from '../../hooks';
import { FieldDecorator } from '../FieldDecorator';
import { extractFieldDecoratorProps } from '../FieldDecorator/utils';
import { useButtons, useHandleOnKeyDown, useSearchInput } from './hooks';
import styles from './styles.module.scss';
import { FieldSelectSingleProps } from './types';
import { extractListProps, findSelectedOption, getArrowIcon, transformOptionsToItems } from './utils';

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
      disabled = false,
      readonly = false,
      searchable = true,
      showCopyButton = true,
      showClearButton = true,
      onKeyDown: onInputKeyDownProp,
      required = false,
      validationState = 'default',
      search,
      autocomplete = false,
      prefixIcon,
      addOptionByEnter = false,
      open: openProp,
      onOpenChange,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });
    const [value, setValue] = useValueControl<SelectionSingleValueType>({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const items = useMemo(() => transformOptionsToItems(options), [options]);
    const { selected, itemsWithPlaceholder } = useMemo(() => {
      const [fonded, placeholder] = findSelectedOption(items, value);

      return {
        selected: fonded ?? placeholder,
        itemsWithPlaceholder: ((placeholder ? [placeholder] : []) as ItemProps[]).concat(items),
      };
    }, [items, value]);

    const { inputValue, onInputValueChange, prevInputValue } = useSearchInput({
      ...search,
      defaultValue: selected?.content.option ?? '',
    });

    useEffect(() => {
      if (selected?.content.option && prevInputValue.current !== selected?.content.option) {
        onInputValueChange(selected.content.option);
        prevInputValue.current = selected?.content.option;
      }
    }, [onInputValueChange, selected?.content.option, prevInputValue]);

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!open && selected?.content.option !== inputValue) {
        onInputValueChange(selected?.content.option ?? '');
      }

      rest?.onBlur?.(e);
    };

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
      showClearButton: showClearButton && !disabled && !readonly && Boolean(value),
      showCopyButton,
      inputRef: localRef,
      onClear,
      valueToCopy: selected?.content.option ?? '',
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

      if (e.code === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
      }

      if (addOptionByEnter && e.code === 'Enter' && inputValue !== '') {
        setValue(inputValue);
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

        if (!open) {
          onInputValueChange(selected?.content.option ?? '');
          prevInputValue.current = selected?.content.option ?? '';
        }
      }
    };

    const fuzzySearch = useFuzzySearch(itemsWithPlaceholder);
    const result =
      autocomplete || !searchable || prevInputValue.current === inputValue
        ? itemsWithPlaceholder
        : fuzzySearch(inputValue);

    return (
      <FieldDecorator
        {...extractSupportProps(rest)}
        {...extractFieldDecoratorProps(rest)}
        validationState={validationState}
        required={required}
        readonly={readonly}
        labelFor={id}
        disabled={disabled}
        size={size}
      >
        <Droplist
          {...extractListProps(rest)}
          items={result}
          selection={{
            mode: 'single',
            value: value,
            onChange: handleSelectionChange,
          }}
          size={size}
          open={open}
          onOpenChange={handleOpenChange}
          triggerElemRef={localRef}
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
                onBlur={handleBlur}
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
