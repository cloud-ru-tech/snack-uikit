import { ReactNode, useCallback, useRef, useState } from 'react';

import { Calendar } from '@snack-uikit/calendar';
import { Dropdown } from '@snack-uikit/dropdown';
import { useLocale } from '@snack-uikit/locale';
import { useValueControl } from '@snack-uikit/utils';

import { SIZE } from '../../../constants';
import { CALENDAR_SIZE_MAP } from '../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

export type ChipChoiceDateProps = ChipChoiceCommonProps & {
  /** Значение компонента */
  value?: Date;
  /** Значение компонента по-умолчанию */
  defaultValue?: Date;
  /** Колбек смены значения */
  onChange?(value: Date): void;
  /** Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение */
  valueRender?(value?: Date): ReactNode;
};

export function ChipChoiceDate({
  size = SIZE.S,
  value,
  defaultValue,
  onChange,
  valueRender,
  ...rest
}: ChipChoiceDateProps) {
  const [selectedValue, setSelectedValue] = useValueControl<Date>({ value, defaultValue, onChange });

  const localRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, []);

  const { t } = useLocale('Chips');

  const valueToRender = valueRender
    ? valueRender(selectedValue)
    : (selectedValue && new Date(selectedValue).toLocaleDateString()) || t('allLabel');

  const clearValue = () => setSelectedValue(undefined);

  return (
    <Dropdown
      content={
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
      }
      outsideClick
      triggerRef={localRef}
      open={open}
      onOpenChange={setOpen}
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
