import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, KeyboardEventHandler, useLayoutEffect, useRef, useState } from 'react';

import { InputPrivate } from '@snack-uikit/input-private';
import { BaseItemProps, Droplist, ItemProps, SelectionSingleValueType } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';
import { extractSupportProps } from '@snack-uikit/utils';

import { FieldContainerPrivate } from '../../helperComponents';
import { useValueControl } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { FieldDecorator } from '../FieldDecorator';
import { extractFieldDecoratorProps } from '../FieldDecorator/utils';
import { useButtons, useHandleDeleteItem, useHandleOnKeyDown, useSearchInput } from './hooks';
import { useFuzzySearch } from './legacy';
import styles from './styles.module.scss';
import { FieldSelectMultipleProps, ItemWithId, SelectedOptionFormatter } from './types';
import { extractListProps, getArrowIcon, updateMultipleItems } from './utils';

const BASE_MIN_WIDTH = 4;

const defaultSelectedOptionFormatter: SelectedOptionFormatter = item =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  item?.content.option || '';

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
      addOptionByEnter = false,
      open: openProp,
      onOpenChange,
      selectedOptionFormatter = defaultSelectedOptionFormatter,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const inputPlugRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });

    const [value, setValue] = useValueControl<SelectionSingleValueType[]>({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const [{ selectedItems, items = [] }, setItems] = useState<{
      selectedItems?: ItemWithId[];
      items: ItemProps[];
    }>(() => updateMultipleItems({ options, value, currentItems: [], selectedItems: undefined }));

    const { inputValue, setInputValue, prevInputValue, updateInputValue } = useSearchInput({
      ...search,
      defaultValue: '',
      selectedOptionFormatter,
    });

    useLayoutEffect(() => {
      setItems(({ selectedItems }) => updateMultipleItems({ options, value, selectedItems }));
    }, [options, value]);

    const onClear = () => {
      setValue(selectedItems?.filter(item => item.disabled).map(item => item.id));
      localRef.current?.focus();

      if (rest.required) {
        setOpen(true);
      }
    };

    const { ArrowIcon, arrowIconSize } = getArrowIcon({ size, open });

    const { buttons, inputKeyDownNavigationHandler, buttonsRefs } = useButtons({
      readonly,
      size,
      showClearButton:
        showClearButton && !disabled && !readonly && Boolean(selectedItems?.find(item => !item.disabled)),
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
        if (selectedItems?.length && !selectedItems.slice(-1)[0].disabled) {
          handleItemDelete(selectedItems.pop() as BaseItemProps)();
        }
      }

      if (e.code === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
      }

      if (addOptionByEnter && e.code === 'Enter' && inputValue !== '') {
        if (!(value ?? []).includes(inputValue)) {
          setValue((value: SelectionSingleValueType[]) => (value ?? []).concat(inputValue));
          updateInputValue();
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
          if (inputPlugRef.current) {
            inputPlugRef.current.style.width = BASE_MIN_WIDTH + 'px';
          }
        }

        if (open) {
          if (inputPlugRef.current) {
            inputPlugRef.current.style.width = 'unset';
          }
        }
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!open && !buttonsRefs.filter(Boolean).includes(e.relatedTarget)) {
        updateInputValue();

        rest?.onBlur?.(e);
      }
    };

    const fuzzySearch = useFuzzySearch(items);
    const result =
      autocomplete || !searchable || prevInputValue.current === inputValue ? items : fuzzySearch(inputValue);

    const fieldValidationState = getValidationState({ validationState, error: rest.error });

    return (
      <FieldDecorator
        {...extractSupportProps(rest)}
        {...extractFieldDecoratorProps(rest)}
        labelFor={id}
        size={size}
        validationState={fieldValidationState}
      >
        <Droplist
          {...extractListProps(rest)}
          items={result}
          triggerElemRef={localRef}
          selection={{
            mode: 'multiple',
            value: value,
            onChange: value => {
              setValue(value);
              updateInputValue();
            },
          }}
          dataFiltered={rest.dataFiltered ?? Boolean(inputValue.length)}
          size={size}
          open={!disabled && !readonly && open}
          onOpenChange={handleOpenChange}
        >
          {({ onKeyDown }) => (
            <FieldContainerPrivate
              className={cn(styles.container, styles.tagContainer)}
              validationState={fieldValidationState}
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
                  {selectedItems &&
                    selectedItems.map(option => (
                      <Tag
                        size={size === 'l' ? 's' : 'xs'}
                        tabIndex={-1}
                        label={selectedOptionFormatter(option)}
                        key={option.id}
                        appearance={option.appearance ?? 'neutral'}
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
                      placeholder={!selectedItems || !selectedItems.length ? placeholder : undefined}
                      ref={mergeRefs(ref, localRef)}
                      onChange={searchable ? setInputValue : undefined}
                      value={searchable ? inputValue : ''}
                      readonly={!searchable || readonly}
                      data-test-id='field-select__input'
                      onKeyDown={handleOnKeyDown(onKeyDown)}
                      onBlur={handleBlur}
                      className={cn({
                        [styles.readonlyCursor]: !searchable,
                      })}
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
