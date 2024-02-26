import { useUncontrolledProp } from 'uncontrollable';

import { Calendar } from '@snack-uikit/calendar';
import { useLocale } from '@snack-uikit/locale';

import { SIZE } from '../../../constants';
import { CALENDAR_SIZE_MAP } from '../constants';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceCustom } from './ChipChoiceCustom';

export type ChipChoiceDateProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Date;
  /** Значение компонента по-умолчанию */
  defaultValue?: Date;
  /** Колбек смены значения */
  onChange?(value: Date): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение */
  valueFormatter?(value?: Date): string;
};

export function ChipChoiceDate({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueFormatter,
  ...rest
}: ChipChoiceDateProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<Date>(value, defaultValue, onChange);

  const { t } = useLocale('Chips');

  const valueToRender = valueFormatter
    ? valueFormatter(selectedValue)
    : (selectedValue && new Date(selectedValue).toLocaleDateString()) || t('allLabel');

  const clearValue = () => setSelectedValue(undefined);

  return (
    <ChipChoiceCustom
      onClearButtonClick={clearValue}
      value={selectedValue}
      valueToRender={valueToRender}
      size={size}
      {...rest}
    >
      {({ closeDroplist }) => (
        <Calendar
          mode='date'
          size={CALENDAR_SIZE_MAP[size]}
          value={selectedValue}
          onChangeValue={value => {
            setSelectedValue(value);
            closeDroplist();
          }}
          navigationStartRef={element => element?.focus()}
          onFocusLeave={closeDroplist}
        />
      )}
    </ChipChoiceCustom>
  );
}
