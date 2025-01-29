import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Calendar, CalendarProps } from '@snack-uikit/calendar';
import { Dropdown } from '@snack-uikit/dropdown';
import { useLocale } from '@snack-uikit/locale';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { CALENDAR_SIZE_MAP, DEFAULT_LOCALE } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

type ChipChoiceDateWithSeconds = {
  mode?: 'date-time';
  showSeconds?: boolean;
};

export type ChipChoiceDateProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Date;
  /** Значение компонента по-умолчанию */
  defaultValue?: Date;
  /** Колбек смены значения */
  onChange?(value: Date): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение */
  valueRender?(value?: Date): ReactNode;
  mode?: Exclude<CalendarProps['mode'], 'range'>;
  /** Колбек свойств для управления ячейками календаря */
  buildCalendarCellProps?: CalendarProps['buildCellProps'];
} & (
    | ChipChoiceDateWithSeconds
    | {
        mode?: 'date' | 'month';
      }
  );

export function ChipChoiceDate({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  dropDownClassName,
  mode = 'date',
  placement,
  widthStrategy,
  buildCalendarCellProps,
  onClearButtonClick,
  open: openProp,
  onOpenChange,
  ...rest
}: ChipChoiceDateProps) {
  const [selectedValue, setSelectedValue] = useValueControl<Date>({ value, defaultValue, onChange });

  const showSeconds = mode === 'date-time' ? ((rest as ChipChoiceDateWithSeconds).showSeconds ?? true) : undefined;

  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useUncontrolledProp(openProp, false, onOpenChange);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, [setOpen]);

  const { t } = useLocale('Chips');

  const valueToRender = useMemo(() => {
    if (valueRender) {
      return valueRender(selectedValue);
    }

    if (!selectedValue) return t('allLabel');

    const date = new Date(selectedValue);

    if (mode === 'date-time') {
      return date.toLocaleString(DEFAULT_LOCALE, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
      });
    }

    return date.toLocaleDateString(DEFAULT_LOCALE, {
      year: 'numeric',
      month: 'numeric',
      day: mode === 'date' ? 'numeric' : undefined,
    });
  }, [mode, selectedValue, showSeconds, t, valueRender]);

  const handleChangeValue = useCallback(
    (value: Date) => {
      setSelectedValue(value);
      closeDroplist();
    },
    [closeDroplist, setSelectedValue],
  );

  const navigationStartRef = useRef<HTMLButtonElement>(null);
  const focusNavigationStartItem = () => setTimeout(() => navigationStartRef.current?.focus(), 0);

  return (
    <Dropdown
      content={
        <Calendar
          mode={mode}
          size={CALENDAR_SIZE_MAP[size]}
          value={selectedValue}
          fitToContainer={false}
          onChangeValue={handleChangeValue}
          navigationStartRef={navigationStartRef}
          onFocusLeave={closeDroplist}
          showSeconds={showSeconds}
          locale={DEFAULT_LOCALE}
          buildCellProps={buildCalendarCellProps}
        />
      }
      placement={placement}
      widthStrategy={widthStrategy}
      outsideClick
      triggerRef={localRef}
      open={open}
      onOpenChange={setOpen}
      className={dropDownClassName}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
    >
      <ChipChoiceBase
        {...rest}
        ref={localRef}
        onClearButtonClick={onClearButtonClick}
        value={selectedValue}
        valueToRender={valueToRender}
        size={size}
        onKeyDown={handleOnKeyDown(focusNavigationStartItem)}
      />
    </Dropdown>
  );
}
