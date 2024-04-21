import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Droplist, ItemId, SelectionSingleValueType } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { DROPLIST_SIZE_MAP } from '../constants';
import { useFuzzySearch, useHandleOnKeyDown } from '../hooks';
import { ChipChoiceSingleProps, ContentRenderProps } from '../types';
import { FlattenOption, kindFlattenOptions } from '../utils';
import { transformOptionsToItems } from '../utils/options';
import { ChipChoiceBase } from './ChipChoiceBase';

export type ChipChoiceSingleValueFormatterProps = {
  label?: ItemId;
  allLabel?: string;
};

export function defaultSingleValueFormatter({ label, allLabel }: ChipChoiceSingleValueFormatterProps) {
  return label ?? allLabel;
}

export function ChipChoiceSingle<T extends ContentRenderProps = ContentRenderProps>({
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
  ...rest
}: ChipChoiceSingleProps<T>) {
  const [value, setValue] = useValueControl<SelectionSingleValueType>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const flattenOptions = useMemo(() => {
    const { flattenOptions } = kindFlattenOptions<T>({ options });

    return flattenOptions;
  }, [options]);

  const { t } = useLocale('Chips');

  const [open, setOpen] = useState<boolean>(false);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const flatMapOptions = useMemo(() => Object.values(flattenOptions), [flattenOptions]);

  const selectedOption = useMemo(
    () => (value ? flattenOptions[value] : ({} as FlattenOption<T>)),
    [flattenOptions, value],
  );

  const [searchValue, setSearchValue] = useState<string>('');

  const valueToRender = valueRender
    ? valueRender(selectedOption)
    : defaultSingleValueFormatter({ label: selectedOption?.label, allLabel: t('allLabel') });

  const fuzzySearch = useFuzzySearch(options, flatMapOptions);

  const result = useMemo(
    () => (!searchable || valueToRender === searchValue ? options : fuzzySearch(searchValue)),
    [fuzzySearch, options, searchValue, searchable, valueToRender],
  );
  const items = useMemo(() => transformOptionsToItems<T>(result, contentRender), [contentRender, result]);

  const clearValue = () => setValue(undefined);
  const chipRef = useRef<HTMLDivElement>(null);

  const handleSelectionChange = useCallback(
    (newValue?: SelectionSingleValueType) => {
      if (newValue !== undefined) {
        chipRef.current?.focus();

        setOpen(false);
        setValue(newValue);
        setSearchValue('');
      }
    },
    [setSearchValue, setValue],
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
        mode: 'single',
      }}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      size={DROPLIST_SIZE_MAP[size]}
      trigger='click'
      placement='bottom-start'
      className={dropDownClassName}
      widthStrategy='gte'
      open={open}
      triggerElemRef={chipRef}
      onOpenChange={open => {
        if (!open) {
          setSearchValue('');
        }
        setOpen(open);
      }}
      scroll
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
        valueToRender={valueToRender}
        label={label}
        loading={rest.loading}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </Droplist>
  );
}
