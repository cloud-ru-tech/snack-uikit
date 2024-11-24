import { ReactNode, useCallback, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Calendar, CalendarProps } from '@snack-uikit/calendar';
import { Dropdown } from '@snack-uikit/dropdown';
import { useLocale } from '@snack-uikit/locale';

import { CHIP_CHOICE_TEST_IDS, DEFAULT_EMPTY_VALUE, SIZE } from '../../../constants';
import { CALENDAR_SIZE_MAP, DEFAULT_LOCALE } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

type Range = [Date, Date];

export type ChipChoiceDateRangeProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Range;
  /** Значение компонента по умолчанию */
  defaultValue?: Range;
  /** Колбек смены значения */
  onChange?(value: Range): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает массив выбранных значений */
  valueRender?(value?: Range): ReactNode;
  /** Колбек свойств для управления ячейками календаря */
  buildCalendarCellProps?: CalendarProps['buildCellProps'];
};

type DefaultRangeFormatterProps = {
  value?: Range;
  allLabel?: string;
};

function defaultRangeFormatter({ value, allLabel }: DefaultRangeFormatterProps) {
  if (!value || !value.length) return allLabel;

  const [from, to] = value;

  return `${from.toLocaleDateString(DEFAULT_LOCALE)} ${DEFAULT_EMPTY_VALUE} ${to.toLocaleDateString(DEFAULT_LOCALE)}`;
}

export function ChipChoiceDateRange({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  dropDownClassName,
  buildCalendarCellProps,
  ...rest
}: ChipChoiceDateRangeProps) {
  const [selectedValue, setSelectedValue] = useUncontrolledProp<Range>(value, defaultValue, onChange);

  const { t } = useLocale('Chips');

  const valueToRender = valueRender
    ? valueRender(selectedValue)
    : defaultRangeFormatter({ value: selectedValue, allLabel: t('allLabel') });

  const clearValue = () => setSelectedValue(undefined);

  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, []);

  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  return (
    <Dropdown
      content={
        <Calendar
          mode='range'
          size={CALENDAR_SIZE_MAP[size]}
          value={selectedValue}
          onChangeValue={value => {
            setSelectedValue(value);
            closeDroplist();
          }}
          locale={DEFAULT_LOCALE}
          // bug with focus
          // navigationStartRef={element => element?.focus()}
          onFocusLeave={closeDroplist}
          buildCellProps={buildCalendarCellProps}
        />
      }
      outsideClick
      triggerRef={localRef}
      open={open}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      onOpenChange={setOpen}
      className={dropDownClassName}
    >
      <ChipChoiceBase
        {...rest}
        ref={localRef}
        onClearButtonClick={clearValue}
        value={selectedValue}
        valueToRender={valueToRender}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </Dropdown>
  );
}
