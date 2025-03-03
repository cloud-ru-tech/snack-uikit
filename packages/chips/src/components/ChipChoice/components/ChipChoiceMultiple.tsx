import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Droplist, ItemId, SelectionSingleValueType } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { DROPLIST_SIZE_MAP } from '../constants';
import { useAutoApply, useHandleOnKeyDown, useOptionSearch } from '../hooks';
import { ChipChoiceMultipleProps, ContentRenderProps } from '../types';
import { FlattenOption, kindFlattenOptions } from '../utils';
import { transformOptionsToItems } from '../utils/options';
import { ChipChoiceBase } from './ChipChoiceBase';

export type ChipChoiceMultipleValueFormatterProps<T extends ContentRenderProps = ContentRenderProps> = {
  value: FlattenOption<T>[];
  total: number;
  allLabel: string;
};

const defaultMultiValueLabelFormatter = ({ value, total, allLabel }: ChipChoiceMultipleValueFormatterProps): ItemId => {
  const len = value.length;

  if ([0, total].includes(len) && total !== len) {
    return allLabel;
  }

  if (len === 1) {
    return value[0].label;
  }

  return `${len.toString()}/${total}`;
};

export function ChipChoiceMultiple<T extends ContentRenderProps = ContentRenderProps>({
  value: valueProp,
  defaultValue,
  options,
  onChange: onChangeProp,
  valueRender,
  size = SIZE.S,
  label,
  searchable,
  contentRender,
  dropDownClassName,
  onClearButtonClick,
  autoApply = true,
  disableFuzzySearch = false,
  onApprove,
  onCancel,
  open: openProp,
  onOpenChange,
  widthStrategy = 'gte',
  ...rest
}: ChipChoiceMultipleProps<T>) {
  const [value, setValue] = useValueControl<SelectionSingleValueType[]>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const [deferredValue, setDeferredValue] = useValueControl<SelectionSingleValueType[]>({
    defaultValue,
  });

  const flattenOptions = useMemo(() => {
    const { flattenOptions } = kindFlattenOptions<T>({ options });

    return flattenOptions;
  }, [options]);

  const [searchValue = '', setSearchValue] = useState<string>('');

  const { t } = useLocale('Chips');

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const flatMapOptions = useMemo(() => Object.values(flattenOptions), [flattenOptions]);

  const dropListSelection = useMemo(() => (autoApply ? value : deferredValue), [autoApply, deferredValue, value]);

  const selectedOptions = useMemo(
    () => (value && value.length ? value.map(id => flattenOptions[id]).filter(Boolean) : ([] as FlattenOption<T>[])),
    [flattenOptions, value],
  );

  const valueToRender = valueRender
    ? valueRender(selectedOptions)
    : defaultMultiValueLabelFormatter({
        value: selectedOptions ?? [],
        total: Object.keys(flattenOptions).length,
        allLabel: t('allLabel'),
      });

  const optionSearch = useOptionSearch({ options, flatMapOptions, disableFuzzySearch });

  const result = useMemo(
    () => (!searchable || valueToRender === searchValue ? options : optionSearch(searchValue)),
    [optionSearch, options, searchValue, searchable, valueToRender],
  );
  const items = useMemo(() => transformOptionsToItems<T>(result, contentRender), [contentRender, result]);

  const chipRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLElement>(null);

  const handleSelectionChange = useCallback(
    (newValue?: SelectionSingleValueType) => {
      if (newValue !== undefined) {
        if (autoApply) {
          setValue(newValue);
        } else {
          setDeferredValue(newValue);
        }

        if (searchValue) {
          listRef.current?.focus();
        }
      }
    },
    [autoApply, searchValue, setValue, setDeferredValue],
  );

  const handleOnCancelClick = () => {
    onCancel && onCancel();

    setDeferredValue(value);
    setOpen(false);
  };

  const handleOnApproveClick = () => {
    onApprove && onApprove();

    setValue(deferredValue);
    setOpen(false);
  };

  const renderFooter = useAutoApply({
    autoApply,
    size,
    onApprove: handleOnApproveClick,
    onCancel: handleOnCancelClick,
  });

  useEffect(() => {
    if (searchValue && !open) {
      setSearchValue('');
    }
  }, [searchable, open, searchValue]);

  useEffect(() => {
    setDeferredValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Droplist
      {...rest}
      items={items}
      selection={{
        value: dropListSelection,
        onChange: handleSelectionChange,
        mode: 'multiple',
      }}
      trigger='clickAndFocusVisible'
      placement='bottom-start'
      widthStrategy={widthStrategy}
      listRef={listRef}
      size={DROPLIST_SIZE_MAP[size]}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      open={open}
      onOpenChange={open => {
        if (!open) {
          !autoApply && setDeferredValue(value);
          setSearchValue('');
        }
        setOpen(open);
      }}
      scroll
      className={dropDownClassName}
      search={
        searchable
          ? {
              value: searchValue,
              onChange: setSearchValue,
            }
          : undefined
      }
      pinBottom={renderFooter()}
    >
      <ChipChoiceBase
        {...rest}
        ref={chipRef}
        onClearButtonClick={onClearButtonClick}
        value={value}
        valueToRender={valueToRender}
        label={label}
        loading={rest.loading}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </Droplist>
  );
}
