import { useUncontrolledProp } from 'uncontrollable';

import { Calendar } from '@snack-uikit/calendar';
import { useLocale } from '@snack-uikit/locale';

import { DEFAULT_EMPTY_VALUE, SIZE } from '../../../constants';
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

type DefaultRangeFormatterProps = {
  value?: Range;
  allLabel?: string;
};

function defaultRangeFormatter({ value, allLabel }: DefaultRangeFormatterProps) {
  if (!value || !value.length) return allLabel;

  const [from, to] = value;

  return `${from.toLocaleDateString()} ${DEFAULT_EMPTY_VALUE} ${to.toLocaleDateString()}`;
}

export function ChipChoiceDateRange({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueFormatter,
  ...rest
}: ChipChoiceDateRangeProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<Range>(value, defaultValue, onChange);

  const { t } = useLocale('Chips');

  const valueToRender = valueFormatter
    ? valueFormatter(selectedValue)
    : defaultRangeFormatter({ value: selectedValue, allLabel: t('allLabel') });

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
          mode='range'
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
