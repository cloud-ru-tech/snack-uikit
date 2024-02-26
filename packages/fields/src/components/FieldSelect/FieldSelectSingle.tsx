import mergeRefs from 'merge-refs';
import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { InputPrivate } from '@snack-uikit/input-private';
import { Droplist, SelectionSingleValueType, useFuzzySearch } from '@snack-uikit/list';
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
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useValueControl<SelectionSingleValueType>({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const items = useMemo(() => transformOptionsToItems(options), [options]);
    const selectedOption = useMemo(() => findSelectedOption(items, value), [items, value]);

    const { inputValue, onInputValueChange, prevInputValue } = useSearchInput({
      ...search,
      defaultValue: selectedOption?.content.option ?? '',
    });

    useEffect(() => {
      selectedOption?.content.option && onInputValueChange(selectedOption.content.option);
    }, [onInputValueChange, selectedOption?.content.option]);

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!open && selectedOption?.content.option !== inputValue) {
        onInputValueChange(selectedOption?.content.option ?? '');
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
      valueToCopy: selectedOption?.content.option ?? '',
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
      const selected = findSelectedOption(items, newValue)?.content.option;
      onInputValueChange(selected);
      prevInputValue.current = selected ?? '';
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
    const result =
      autocomplete || !searchable || prevInputValue.current === inputValue ? items : fuzzySearch(inputValue);

    return (
      <FieldDecorator
        {...extractSupportProps(rest)}
        {...extractFieldDecoratorProps(rest)}
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
