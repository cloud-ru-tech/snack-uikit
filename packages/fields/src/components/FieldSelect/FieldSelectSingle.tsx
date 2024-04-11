import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { InputPrivate } from '@snack-uikit/input-private';
import { Droplist, ItemProps, SelectionSingleValueType } from '@snack-uikit/list';
import { extractSupportProps } from '@snack-uikit/utils';

import { FieldContainerPrivate } from '../../helperComponents';
import { useValueControl } from '../../hooks';
import { FieldDecorator } from '../FieldDecorator';
import { extractFieldDecoratorProps } from '../FieldDecorator/utils';
import { useButtons, useHandleOnKeyDown, useSearchInput } from './hooks';
import { useFuzzySearch } from './legacy';
import styles from './styles.module.scss';
import { FieldSelectSingleProps, ItemWithId, SelectedOptionFormatter } from './types';
import { extractListProps, getArrowIcon, updateItems } from './utils';

const defaultSelectedOptionFormatter: SelectedOptionFormatter = item =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  item?.content.option || '';

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
      selectedOptionFormatter = defaultSelectedOptionFormatter,
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

    const [{ selectedItem, items = [] }, setItems] = useState<{
      selectedItem?: ItemWithId;
      items: ItemProps[];
    }>(() => updateItems({ options, value, currentItems: [], selectedItem: undefined }));

    const { inputValue, setInputValue, prevInputValue, updateInputValue } = useSearchInput({
      ...search,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      defaultValue: selectedItem?.content.option ?? '',
      selectedOptionFormatter,
    });

    const prevSelectedItem = useRef<ItemWithId | undefined>(selectedItem);

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
    }, [setValue]);

    const { ArrowIcon, arrowIconSize } = getArrowIcon({ size, open });

    const { buttons, inputKeyDownNavigationHandler, buttonsRefs } = useButtons({
      readonly,
      size,
      showClearButton: showClearButton && !disabled && !readonly && value !== undefined,
      showCopyButton,
      inputRef: localRef,
      onClear,
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
        if (newValue !== undefined) {
          localRef.current?.focus();

          setOpen(false);
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
      if (!readonly && !disabled && !buttonsRefs.includes(document.activeElement)) {
        setOpen(open);

        if (!open) {
          updateInputValue(selectedItem);
        }
      }
    };

    const fuzzySearch = useFuzzySearch(items);
    const result =
      autocomplete || !searchable || selectedOptionFormatter(selectedItem) === inputValue
        ? items
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
                onChange={searchable ? setInputValue : undefined}
                value={searchable ? inputValue : selectedOptionFormatter(selectedItem)}
                readonly={readonly}
                data-test-id='field-select__input'
                onKeyDown={handleOnKeyDown(onKeyDown)}
                onBlur={handleBlur}
                className={cn({
                  [styles.readonlyCursor]: !searchable,
                })}
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
