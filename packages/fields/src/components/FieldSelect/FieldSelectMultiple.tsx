import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, KeyboardEventHandler, useMemo, useRef, useState } from 'react';

import { InputPrivate } from '@snack-uikit/input-private';
import { BaseItemProps, Droplist, SelectionSingleValueType, useFuzzySearch } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';
import { extractSupportProps } from '@snack-uikit/utils';

import { FieldContainerPrivate } from '../../helperComponents';
import { useValueControl } from '../../hooks';
import { FieldDecorator } from '../FieldDecorator';
import { extractFieldDecoratorProps } from '../FieldDecorator/utils';
import { useButtons, useHandleDeleteItem, useHandleOnKeyDown, useSearchInput } from './hooks';
import styles from './styles.module.scss';
import { FieldSelectMultipleProps } from './types';
import { extractListProps, findSelectedOptions, getArrowIcon, transformOptionsToItems } from './utils';

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
      disabled = false,
      readonly = false,
      searchable = true,
      showClearButton = true,
      onKeyDown: onInputKeyDownProp,
      validationState = 'default',
      search,
      autocomplete = false,
      prefixIcon,
      removeByBackspace = false,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const inputPlugRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const items = useMemo(() => transformOptionsToItems(options), [options]);
    const [value, setValue] = useValueControl<SelectionSingleValueType[]>({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const selectedOption = useMemo(() => {
      if (value) {
        const notSortSelectedOption = findSelectedOptions(items, value);

        if (notSortSelectedOption) {
          return notSortSelectedOption.sort((a, b) => {
            if (b.disabled && !a.disabled) {
              return 1;
            }

            if (a.disabled && !b.disabled) {
              return -1;
            }

            return 0;
          });
        }
      }

      return undefined;
    }, [items, value]);

    const { inputValue, onInputValueChange, prevInputValue } = useSearchInput({
      ...search,
      defaultValue: '',
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
      showClearButton: showClearButton && !disabled && !readonly && Boolean(value),
      showCopyButton: false,
      inputRef: localRef,
      onClear,
    });

    const commonHandleOnKeyDown = useHandleOnKeyDown({
      inputKeyDownNavigationHandler,
      onInputKeyDownProp,
      setOpen,
    });

    const handleItemDelete = useHandleDeleteItem(setValue);
    const handleOnKeyDown = (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (removeByBackspace && e.code === 'Backspace' && inputValue === '') {
        if (selectedOption?.length && !selectedOption.slice(-1)[0].disabled) {
          handleItemDelete(selectedOption.pop() as BaseItemProps)();
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
    const result =
      autocomplete || !searchable || prevInputValue.current !== inputValue ? items : fuzzySearch(inputValue);

    return (
      <FieldDecorator
        {...extractSupportProps(rest)}
        {...extractFieldDecoratorProps(rest)}
        labelFor={id}
        size={size}
        validationState={validationState}
      >
        <Droplist
          {...extractListProps(rest)}
          items={result}
          triggerElemRef={localRef}
          selection={{
            mode: 'multiple',
            value: value,
            onChange: setValue,
          }}
          size={size}
          open={!disabled && !readonly && open}
          onOpenChange={handleOpenChange}
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
                        label={String(option.content.option)}
                        key={option.id}
                        onDelete={!option.disabled && !disabled && !readonly ? handleItemDelete(option) : undefined}
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
