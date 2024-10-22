import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { TimePicker, TimePickerProps } from '@snack-uikit/calendar';
import { Dropdown } from '@snack-uikit/dropdown';
import { useLocale } from '@snack-uikit/locale';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { DEFAULT_LOCALE, TIME_PICKER_SIZE_MAP } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

const getStringTimeValue = (
  time: TimePickerProps['value'],
  { showSeconds, locale }: Pick<TimePickerProps, 'showSeconds'> & { locale: Intl.Locale },
) => {
  if (!time) {
    return '';
  }

  const date = new Date();
  date.setHours(time.hours ?? 0);
  date.setMinutes(time.minutes ?? 0);
  date.setSeconds(time.seconds ?? 0);

  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: showSeconds ? 'numeric' : undefined,
  });
};

type TimeValue = TimePickerProps['value'];

export type ChipChoiceTimeProps = Omit<ChipChoiceCommonProps, 'widthStrategy'> &
  Pick<TimePickerProps, 'value' | 'defaultValue' | 'showSeconds'> & {
    /** Колбек смены значения */
    onChange?(value: TimeValue): void;
    /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение */
    valueRender?(value?: TimeValue): ReactNode;
  };

export function ChipChoiceTime({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  dropDownClassName,
  showSeconds = true,
  placement,
  ...rest
}: ChipChoiceTimeProps) {
  const [selectedValue, setSelectedValue] = useValueControl<TimeValue>({ value, defaultValue, onChange });

  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, []);

  const { t } = useLocale('Chips');

  const valueToRender = useMemo(() => {
    if (valueRender) {
      return valueRender(selectedValue);
    }

    if (!selectedValue) return t('allLabel');

    return getStringTimeValue(selectedValue, { showSeconds, locale: DEFAULT_LOCALE });
  }, [selectedValue, showSeconds, t, valueRender]);

  const clearValue = () => setSelectedValue(undefined);

  const handleChangeValue = useCallback(
    (value: TimeValue) => {
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
        <TimePicker
          size={TIME_PICKER_SIZE_MAP[size]}
          value={selectedValue}
          fitToContainer={false}
          onChangeValue={handleChangeValue}
          navigationStartRef={navigationStartRef}
          onFocusLeave={closeDroplist}
          showSeconds={showSeconds}
        />
      }
      placement={placement}
      widthStrategy='auto'
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
        onClearButtonClick={clearValue}
        value={selectedValue}
        valueToRender={valueToRender}
        size={size}
        onKeyDown={handleOnKeyDown(focusNavigationStartItem)}
      />
    </Dropdown>
  );
}
