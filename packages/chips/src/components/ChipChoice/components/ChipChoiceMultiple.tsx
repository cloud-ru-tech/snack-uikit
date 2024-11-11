import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Droplist, ItemId, SelectionSingleValueType } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { DROPLIST_SIZE_MAP } from '../constants';
import { useFuzzySearch, useHandleOnKeyDown } from '../hooks';
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
  showClearButton = true,
  ...rest
}: ChipChoiceMultipleProps<T>) {
  const [value, setValue] = useValueControl<SelectionSingleValueType[]>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const flattenOptions = useMemo(() => {
    const { flattenOptions } = kindFlattenOptions<T>({ options });

    return flattenOptions;
  }, [options]);

  const [searchValue = '', setSearchValue] = useState<string>('');

  const { t } = useLocale('Chips');

  const [open, setOpen] = useState<boolean>(false);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const flatMapOptions = useMemo(() => Object.values(flattenOptions), [flattenOptions]);

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

  const fuzzySearch = useFuzzySearch(options, flatMapOptions);

  const result = useMemo(
    () => (!searchable || valueToRender === searchValue ? options : fuzzySearch(searchValue)),
    [fuzzySearch, options, searchValue, searchable, valueToRender],
  );
  const items = useMemo(() => transformOptionsToItems<T>(result, contentRender), [contentRender, result]);

  const clearValue = () => setValue([]);
  const chipRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLElement>(null);

  const handleSelectionChange = useCallback(
    (newValue?: SelectionSingleValueType) => {
      if (newValue !== undefined) {
        setValue(newValue);
        if (searchValue) {
          listRef.current?.focus();
        }
      }
    },
    [searchValue, setValue],
  );

  useEffect(() => {
    if (searchValue && !open) {
      setSearchValue('');
    }
  }, [searchable, open, searchValue]);

  return (
    <Droplist
      {...rest}
      items={items}
      selection={{
        value,
        onChange: handleSelectionChange,
        mode: 'multiple',
      }}
      trigger='clickAndFocusVisible'
      placement='bottom-start'
      widthStrategy='gte'
      listRef={listRef}
      size={DROPLIST_SIZE_MAP[size]}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      open={open}
      onOpenChange={open => {
        if (!open) {
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
    >
      <ChipChoiceBase
        {...rest}
        ref={chipRef}
        onClearButtonClick={clearValue}
        value={value}
        showClearButton={showClearButton && !(Array.isArray(value) && [0].includes(value.length))}
        valueToRender={valueToRender}
        label={label}
        loading={rest.loading}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </Droplist>
  );
}
