import { useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Droplist } from '@snack-uikit/droplist';

import { DEFAULT_EMPTY_VALUE, Size } from '../../../constants';
import { ChipChoiceCommonProps, FilterOption } from '../types';
import { normalizeValueForSingleChoice } from '../utils';
import { ChipChoiceCustom } from './ChipChoiceCustom';

export type ChipChoiceSingleProps = ChipChoiceCommonProps & {
  /** Массив опций */
  options: FilterOption[];
  /** Значение компонента */
  value?: string;
  /** Значение компонента по умолчанию */
  defaultValue?: string;
  /** Колбек смены значения */
  onChange?(value: string): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение. По умолчанию для отображения используется FilterOption.label */
  valueFormatter?(option?: FilterOption): string;
};

export function ChipChoiceSingle({
  value,
  defaultValue,
  options,
  onChange,
  valueFormatter,
  size = Size.S,
  'data-test-id': dataTestId,
  ...rest
}: ChipChoiceSingleProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<string>(
    normalizeValueForSingleChoice(options, value),
    normalizeValueForSingleChoice(options, defaultValue),
    onChange,
  );

  const selectedOption = useMemo(() => options.find(({ value }) => value === selectedValue), [options, selectedValue]);

  const valueToRender = valueFormatter ? valueFormatter(selectedOption) : selectedOption?.label || DEFAULT_EMPTY_VALUE;

  const clearValue = () => setSelectedValue(undefined);

  return (
    <ChipChoiceCustom
      onClearButtonClick={clearValue}
      value={selectedValue}
      valueToRender={valueToRender}
      data-test-id={dataTestId}
      size={size}
      {...rest}
    >
      {({ handleDroplistItemKeyDown, closeDroplist }) =>
        options.map(({ label, value, ...rest }) => {
          const onChangeHandler = () => {
            setSelectedValue(value);
            closeDroplist();
          };

          return (
            <Droplist.ItemSingle
              {...rest}
              key={value}
              option={label}
              checked={selectedValue === value}
              onChange={onChangeHandler}
              onKeyDown={handleDroplistItemKeyDown}
              data-test-id={dataTestId && `${dataTestId}__option`}
            />
          );
        })
      }
    </ChipChoiceCustom>
  );
}
