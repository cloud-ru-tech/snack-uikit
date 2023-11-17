import { useUncontrolledProp } from 'uncontrollable';

import { Calendar } from '@snack-ui/calendar';

import { DEFAULT_EMPTY_VALUE, Size } from '../../../constants';
import { CALENDAR_SIZE_MAP } from '../constants';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceCustom } from './ChipChoiceCustom';

type Range = [Date, Date];

export type ChipChoiceDateRangeProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Range;
  /** Значение компонента по умолчанию */
  defaultValue?: Range;
  /** Колбек смены значения */
  onChange?(value: Range): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает массив выбранных значений */
  valueFormatter?(value?: Range): string;
};

function defaultRangeFormatter(value?: Range) {
  if (!value || !value.length) return DEFAULT_EMPTY_VALUE;

  const [from, to] = value;

  return `${from.toLocaleDateString()} ${DEFAULT_EMPTY_VALUE} ${to.toLocaleDateString()}`;
}

export function ChipChoiceDateRange({
  size = Size.S,
  value,
  defaultValue,
  onChange,
  valueFormatter,
  ...rest
}: ChipChoiceDateRangeProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<Range>(value, defaultValue, onChange);

  const valueToRender = valueFormatter ? valueFormatter(selectedValue) : defaultRangeFormatter(selectedValue);

  const clearValue = () => setSelectedValue(undefined);

  return (
    <ChipChoiceCustom
      value={selectedValue}
      valueToRender={valueToRender}
      onClearButtonClick={clearValue}
      size={size}
      {...rest}
    >
      {({ closeDroplist }) => (
        <Calendar
          mode={Calendar.modes.Range}
          size={CALENDAR_SIZE_MAP[size]}
          value={selectedValue}
          onChangeValue={range => {
            setSelectedValue(range);
            closeDroplist();
          }}
          // bug with focus
          // navigationStartRef={element => element?.focus()}
          onFocusLeave={closeDroplist}
        />
      )}
    </ChipChoiceCustom>
  );
}
