import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { InputPrivate } from '@snack-uikit/input-private';
import { Droplist, ItemProps, SelectionSingleValueType } from '@snack-uikit/list';
import { extractSupportProps, isBrowser, useLayoutEffect } from '@snack-uikit/utils';

import { FieldContainerPrivate } from '../../helperComponents';
import { usePostfix, usePrefix, useValueControl } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { FieldDecorator } from '../FieldDecorator';
import { extractFieldDecoratorProps } from '../FieldDecorator/utils';
import { useButtons, useHandleOnKeyDown, useSearch, useSearchInput } from './hooks';
import styles from './styles.module.scss';
import { FieldSelectSingleProps, ItemWithId, SelectedOptionFormatter } from './types';
import { checkisSearchUnavailable, extractListProps, getArrowIcon, updateItems } from './utils';

const defaultSelectedOptionFormatter: SelectedOptionFormatter = item =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  item?.content.option || '';

export const FieldSelectSingle = forwardRef<HTMLInputElement, FieldSelectSingleProps>((props, ref) => {
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
    showCopyButton = true,
    showClearButton = true,
    onKeyDown: onInputKeyDownProp,
    required = false,
    validationState = 'default',
    search,
    autocomplete = false,
    prefixIcon,
    prefix,
    postfix,
    addOptionByEnter = false,
    untouchableScrollbars = false,
    open: openProp,
    onOpenChange,
    selectedOptionFormatter = defaultSelectedOptionFormatter,
    enableFuzzySearch = true,
    resetSearchOnOptionSelection = true,
    onCopyButtonClick,
    autoFocus,
    ...rest
  } = props;
  const localRef = useRef<HTMLInputElement>(null);
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });
  const [value, setValue] = useValueControl<SelectionSingleValueType>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const [{ selectedItem, items = [] }, setItems] = useState<{
    selectedItem?: ItemWithId;
    items: ItemProps[];
  }>(() => updateItems({ options, value, currentItems: [], selectedItem: undefined }));

  const { inputValue, setInputValue, prevInputValue, updateInputValue } = useSearchInput({
    ...search,
    defaultValue: selectedOptionFormatter(selectedItem),
    resetSearchOnOptionSelection,
    selectedOptionFormatter,
  });

  const prevSelectedItem = useRef<ItemWithId | undefined>(selectedItem);

  const prefixSettings = usePrefix({ prefix, disabled });
  const postfixSettings = usePostfix({ postfix, disabled });

  useLayoutEffect(() => {
    setItems(({ selectedItem }) => updateItems({ options, value, selectedItem }));
  }, [options, value]);

  useEffect(() => {
    if (
      prevSelectedItem.current &&
      prevSelectedItem.current.id === selectedItem?.id &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      prevSelectedItem.current.content.option === selectedItem?.content.option
    ) {
      return;
    }

    prevSelectedItem.current = selectedItem;
    updateInputValue(selectedItem);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, prevSelectedItem]);

  const onClear = useCallback(() => {
    setValue(undefined);
    localRef.current?.focus();
    if (required) {
      setOpen(true);
    }
  }, [required, setOpen, setValue]);

  const { ArrowIcon, arrowIconSize } = getArrowIcon({ size, open });

  const { postfixButtons, inputKeyDownNavigationHandler, buttonsRefs } = useButtons({
    readonly,
    size,
    showClearButton: showClearButton && !disabled && !readonly && value !== undefined && selectedItem !== undefined,
    showCopyButton,
    inputRef: localRef,
    onClear,
    onCopyButtonClick,
    valueToCopy: selectedOptionFormatter(selectedItem),
  });

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!open && !buttonsRefs.filter(Boolean).includes(e.relatedTarget)) {
      updateInputValue(selectedItem);

      rest?.onBlur?.(e);
    }
  };

  const commonHandleOnKeyDown = useHandleOnKeyDown({
    inputKeyDownNavigationHandler,
    onInputKeyDownProp,
    setOpen,
  });

  const handleSelectionChange = useCallback(
    (newValue?: SelectionSingleValueType) => {
      setOpen(false);

      if (newValue !== undefined) {
        localRef.current?.focus();
        setValue(newValue);
      }
    },
    [setOpen, setValue],
  );

  const handleOnKeyDown = (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open && prevInputValue.current !== inputValue) {
      setOpen(true);
    }

    if (e.code === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }

    if (addOptionByEnter && e.code === 'Enter' && inputValue !== '') {
      handleSelectionChange(inputValue);
    }

    commonHandleOnKeyDown(onKeyDown)(e);
  };

  const handleOpenChange = (open: boolean) => {
    if (isBrowser() && !readonly && !disabled && !buttonsRefs.includes(document.activeElement)) {
      setOpen(open);

      if (!open) {
        updateInputValue(selectedItem);
      }
    }
  };

  const filterFunction = useSearch(items, enableFuzzySearch);
  const isSearchUnavailable = checkisSearchUnavailable({
    autocomplete,
    searchable,
    isSameValue: selectedOptionFormatter(selectedItem) === inputValue,
  });
  const result = isSearchUnavailable ? items : filterFunction(inputValue);

  const fieldValidationState = getValidationState({ validationState, error: rest.error });

  const decoratorRef = useRef<HTMLDivElement>(null);

  const valueRef = useRef(value);

  valueRef.current = value;

  useEffect(() => {
    if (decoratorRef.current) {
      decoratorRef.current.__snackApi ??= {};
      decoratorRef.current.__snackApi.setSelectValue ??= (value: string) => {
        setValue(value);
      };
      decoratorRef.current.__snackApi.getSelectValue ??= () => valueRef.current;
    }
  }, [setValue]);

  return (
    <FieldDecorator
      {...extractSupportProps(rest)}
      {...extractFieldDecoratorProps(props)}
      validationState={fieldValidationState}
      data-snack-api='field-select'
      ref={decoratorRef}
    >
      <Droplist
        {...extractListProps(props)}
        items={result}
        selection={{
          mode: 'single',
          value: value,
          onChange: handleSelectionChange,
        }}
        size={size}
        open={open}
        onOpenChange={handleOpenChange}
        trigger='click'
        triggerElemRef={localRef}
        untouchableScrollbars={untouchableScrollbars}
      >
        {({ onKeyDown }) => (
          <FieldContainerPrivate
            className={styles.container}
            validationState={fieldValidationState}
            disabled={disabled}
            readonly={readonly}
            focused={open}
            variant={'single-line-container'}
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
            <InputPrivate
              id={id}
              name={name}
              type='text'
              disabled={disabled}
              placeholder={placeholder}
              ref={mergeRefs(ref, localRef)}
              onChange={searchable ? setInputValue : undefined}
              value={searchable ? inputValue : selectedOptionFormatter(selectedItem)}
              readonly={readonly}
              data-test-id='field-select__input'
              onKeyDown={handleOnKeyDown(onKeyDown)}
              onBlur={handleBlur}
              className={cn({
                [styles.readonlyCursor]: !searchable,
              })}
              autoFocus={autoFocus}
            />

            <div className={styles.postfix}>
              {postfixButtons}
              {postfixSettings.show && postfixSettings.render({ key: postfixSettings.id })}
              <ArrowIcon size={arrowIconSize} className={styles.arrowIcon} />
            </div>
          </FieldContainerPrivate>
        )}
      </Droplist>
    </FieldDecorator>
  );
});
