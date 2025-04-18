import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react';

import { InputPrivate } from '@snack-uikit/input-private';
import { BaseItemProps, Droplist, ItemProps, SelectionSingleValueType } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';
import { extractSupportProps, isBrowser, useLayoutEffect } from '@snack-uikit/utils';

import { FieldContainerPrivate } from '../../helperComponents';
import { usePostfix, usePrefix, useValueControl } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { FieldDecorator } from '../FieldDecorator';
import { extractFieldDecoratorProps } from '../FieldDecorator/utils';
import { useButtons, useHandleDeleteItem, useHandleOnKeyDown, useSearch, useSearchInput } from './hooks';
import styles from './styles.module.scss';
import { FieldSelectMultipleProps, ItemWithId, SelectedOptionFormatter } from './types';
import { checkisSearchUnavailable, extractListProps, getArrowIcon, updateMultipleItems } from './utils';

const BASE_MIN_WIDTH = 4;

const defaultSelectedOptionFormatter: SelectedOptionFormatter = item =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  item?.content.option || '';

export const FieldSelectMultiple = forwardRef<HTMLInputElement, FieldSelectMultipleProps>((props, ref) => {
  const {
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
    prefix,
    postfix,
    removeByBackspace = false,
    addOptionByEnter = false,
    untouchableScrollbars = false,
    open: openProp,
    enableFuzzySearch = true,
    resetSearchOnOptionSelection = true,
    onOpenChange,
    selectedOptionFormatter = defaultSelectedOptionFormatter,
    ...rest
  } = props;
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
    resetSearchOnOptionSelection,
  });

  const prefixSettings = usePrefix({ prefix, disabled });
  const postfixSettings = usePostfix({ postfix, disabled });

  useEffect(() => {
    if (options.length === 0 && value && value.length > 0) {
      setValue(undefined);
    }
  }, [options.length, setValue, value]);

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

  const { postfixButtons, inputKeyDownNavigationHandler, buttonsRefs } = useButtons({
    readonly,
    size,
    showClearButton: showClearButton && !disabled && !readonly && Boolean(selectedItems?.find(item => !item.disabled)),
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
    if (isBrowser() && !readonly && !disabled && !buttonsRefs.includes(document.activeElement)) {
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

  const searchFunction = useSearch(items, enableFuzzySearch);
  const isSearchUnavailable = checkisSearchUnavailable({
    autocomplete,
    searchable,
    isSameValue: prevInputValue.current === inputValue,
  });
  const result = isSearchUnavailable ? items : searchFunction(inputValue);

  const fieldValidationState = getValidationState({ validationState, error: rest.error });

  return (
    <FieldDecorator
      {...extractSupportProps(rest)}
      {...extractFieldDecoratorProps(props)}
      validationState={fieldValidationState}
    >
      <Droplist
        {...extractListProps(props)}
        items={result}
        triggerElemRef={localRef}
        trigger='click'
        selection={{
          mode: 'multiple',
          value: value,
          onChange: value => {
            setValue(value);
            if (inputValue) {
              localRef.current?.focus();
              updateInputValue();
            }
          },
        }}
        dataFiltered={rest.dataFiltered ?? Boolean(inputValue.length)}
        untouchableScrollbars={untouchableScrollbars}
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
            prefix={
              (prefixIcon || prefixSettings.show) && (
                <>
                  {prefixIcon}
                  {prefixSettings.show && prefixSettings.render({ key: prefixSettings.id })}
                </>
              )
            }
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
                {postfixButtons}
                {postfixSettings.show && postfixSettings.render({ key: postfixSettings.id })}
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
});
