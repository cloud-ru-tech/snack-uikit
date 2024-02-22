import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, KeyboardEventHandler, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { InputPrivate } from '@snack-uikit/input-private';
import { Droplist, SelectionSingleValueType, useFuzzySearch } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';
import { extractSupportProps } from '@snack-uikit/utils';

import { FieldContainerPrivate } from '../../helperComponents';
import { FieldDecorator } from '../FieldDecorator';
import { useButtons, useHandleDeleteItem, useHandleOnKeyDown, useSearchInput } from './hooks';
import styles from './styles.module.scss';
import { FieldSelectMultipleProps } from './types';
import { extractSelectedMultipleOptions, getArrowIcon, transformOptionsToItems } from './utils';

const BASE_MIN_WIDTH = 4;

export const FieldSelectMultiple = forwardRef<HTMLInputElement, FieldSelectMultipleProps>(
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
    const inputPlugRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const items = useMemo(() => transformOptionsToItems(options), [options]);
    const [value, setValue] = useUncontrolledProp<SelectionSingleValueType[] | undefined>(
      valueProp,
      defaultValue,
      onChangeProp,
    );

    const selectedOption = useMemo(() => extractSelectedMultipleOptions(options, value), [options, value]);

    const { inputValue, onInputValueChange, prevInputValue } = useSearchInput({
      ...search,
      defaultValue: String(selectedOption ?? ''),
    });

    const onClear = () => {
      setValue(undefined);
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
      valueToCopy: String(selectedOption?.map(option => option.option).join(', ') ?? ''),
    });

    const commonHandleOnKeyDown = useHandleOnKeyDown({
      inputKeyDownNavigationHandler,
      onInputKeyDownProp,
      setOpen,
    });

    const handleItemDelete = useHandleDeleteItem(setValue);
    const handleOnKeyDown = (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Backspace' && inputValue === '') {
        if (selectedOption?.length) {
          handleItemDelete(selectedOption.pop())();
        }
      }

      if (!open && prevInputValue.current !== inputValue) {
        setOpen(true);
      }

      commonHandleOnKeyDown(onKeyDown)(e);
    };

    const handleOpenChange = (open: boolean) => {
      if (!readonly && !disabled && !buttonsRefs.includes(document.activeElement)) {
        setOpen(open);
        if (!open) {
          prevInputValue.current = inputValue;
        }
        if (open) {
          prevInputValue.current = '';
        }
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!open) {
        onInputValueChange('');
      }

      rest?.onBlur?.(e);
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
            mode: 'multiple',
            value: value,
            onChange: setValue,
          }}
          size={size}
          open={!disabled && !readonly && open}
          onOpenChange={handleOpenChange}
          loading={loading}
        >
          {({ onKeyDown }) => (
            <FieldContainerPrivate
              className={cn(styles.container, styles.tagContainer)}
              validationState={validationState}
              disabled={disabled}
              readonly={readonly}
              focused={open}
              variant='single-line-container'
              inputRef={localRef}
              size={size}
              prefix={prefixIcon}
            >
              <>
                <div className={styles.contentWrapper} ref={contentRef}>
                  {selectedOption &&
                    selectedOption.map(option => (
                      <Tag
                        size={size === 'l' ? 's' : 'xs'}
                        tabIndex={-1}
                        label={String(option.option)}
                        key={option.value}
                        onDelete={!option.disabled ? handleItemDelete(option) : undefined}
                      />
                    ))}

                  <div
                    className={styles.inputWrapper}
                    style={{
                      minWidth: value
                        ? Math.min(
                            contentRef.current?.clientWidth ?? BASE_MIN_WIDTH,
                            inputPlugRef.current?.clientWidth ?? BASE_MIN_WIDTH,
                          )
                        : '100%',
                    }}
                  >
                    <InputPrivate
                      id={id}
                      name={name}
                      type='text'
                      disabled={disabled}
                      placeholder={!selectedOption ? placeholder : undefined}
                      ref={mergeRefs(ref, localRef)}
                      onChange={searchable ? onInputValueChange : undefined}
                      value={searchable ? inputValue : ''}
                      readonly={!searchable || readonly}
                      data-test-id='field-select__input'
                      onKeyDown={handleOnKeyDown(onKeyDown)}
                      onBlur={handleBlur}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.postfix}>
                  {buttons}
                  <ArrowIcon size={arrowIconSize} className={styles.arrowIcon} />
                </div>

                <span ref={inputPlugRef} className={styles.inputPlug}>
                  {inputValue}
                </span>
              </>
            </FieldContainerPrivate>
          )}
        </Droplist>
      </FieldDecorator>
    );
  },
);
