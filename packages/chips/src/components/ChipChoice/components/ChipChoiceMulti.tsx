import { useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Droplist } from '@snack-uikit/droplist';
import { useLocale } from '@snack-uikit/locale';

import { SIZE } from '../../../constants';
import { ChipChoiceCommonProps, FilterOption } from '../types';
import { defaultMultiValueLabelFormatter, normalizeValueForMultiChoice } from '../utils';
import { ChipChoiceCustom } from './ChipChoiceCustom';

export type ChipChoiceMultiProps = ChipChoiceCommonProps & {
  /** Массив опций */
  options: FilterOption[];
  /** Значение компонента */
  value?: string[];
  /** Значение компонента по умолчанию */
  defaultValue?: string[];
  /** Колбек смены значения */
  onChange?(value: string[]): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает массив выбранных значений. По умолчанию для отображения используется кол-во выбранных значений. */
  valueFormatter?(options: FilterOption[]): string;
};

export function ChipChoiceMulti({
  value,
  defaultValue,
  options,
  onChange,
  valueFormatter,
  size = SIZE.S,
  'data-test-id': dataTestId,
  ...rest
}: ChipChoiceMultiProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<string[]>(
    normalizeValueForMultiChoice(options, value),
    normalizeValueForMultiChoice(options, defaultValue) || [],
    onChange,
  );

  const selectedOptions = useMemo(
    () => options.filter(({ value }) => selectedValue?.includes(value)),
    [options, selectedValue],
  );

  const { t } = useLocale('Chips');

  const valueToRender = valueFormatter
    ? valueFormatter(selectedOptions)
    : defaultMultiValueLabelFormatter({ value: selectedOptions, total: options.length, allLabel: t('allLabel') });

  const clearValue = () => setSelectedValue([]);

  return (
    <ChipChoiceCustom
      size={size}
      onClearButtonClick={clearValue}
      valueToRender={valueToRender}
      value={selectedValue}
      data-test-id={dataTestId}
      {...rest}
    >
      {({ handleDroplistItemKeyDown }) =>
        options.map(({ label, value, ...rest }) => {
          const selected = selectedValue || [];
          const checked = selected.includes(value);
          const onChangeHandler = () => {
            if (checked) {
              setSelectedValue(selected.filter(selected => selected !== value));
            } else {
              setSelectedValue([...selected, value]);
            }
          };

          return (
            <Droplist.ItemMultiple
              {...rest}
              key={value}
              option={label}
              checked={checked}
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
