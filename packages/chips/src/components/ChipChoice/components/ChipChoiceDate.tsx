import { useUncontrolledProp } from 'uncontrollable';

import { Calendar } from '@snack-uikit/calendar';

import { DEFAULT_EMPTY_VALUE, Size } from '../../../constants';
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
  size = Size.S,
  value,
  defaultValue,
  onChange,
  valueFormatter,
  ...rest
}: ChipChoiceDateProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<Date>(value, defaultValue, onChange);

  const valueToRender = valueFormatter
    ? valueFormatter(selectedValue)
    : (selectedValue && new Date(selectedValue).toLocaleDateString()) || DEFAULT_EMPTY_VALUE;

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
          mode={Calendar.modes.Date}
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
