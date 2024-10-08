import { SlotKey, SLOTS } from './constants';
import { Mode } from './types';

export function getSlotKey(index: number | null, mode: Mode): SlotKey | null {
  if (index !== null) {
    for (const key in SLOTS[mode]) {
      if (index >= SLOTS[mode][key].start && index <= SLOTS[mode][key].end) {
        return key as SlotKey;
      }
    }
  }

  return null;
}
export function getNextSlotKeyWithDate(slotKey: string | null) {
  switch (slotKey) {
    case SlotKey.Day: {
      return SlotKey.Month;
    }
    case SlotKey.Month:
    case SlotKey.Year:
    default: {
      return SlotKey.Year;
    }
  }
}

export function getPrevSlotKeyWithDate(slotKey: string | null) {
  switch (slotKey) {
    case SlotKey.Year: {
      return SlotKey.Month;
    }
    case SlotKey.Month:
    case SlotKey.Day:
    default: {
      return SlotKey.Day;
    }
  }
}

export function getNextSlotKeyWithTime(slotKey: string | null) {
  switch (slotKey) {
    case SlotKey.Day: {
      return SlotKey.Month;
    }
    case SlotKey.Month: {
      return SlotKey.Year;
    }
    case SlotKey.Year: {
      return SlotKey.Hours;
    }
    case SlotKey.Hours: {
      return SlotKey.Minutes;
    }
    case SlotKey.Minutes:
    case SlotKey.Seconds:
    default: {
      return SlotKey.Seconds;
    }
  }
}

export function getPrevSlotKeyWithTime(slotKey: string | null) {
  switch (slotKey) {
    case SlotKey.Seconds: {
      return SlotKey.Minutes;
    }
    case SlotKey.Minutes: {
      return SlotKey.Hours;
    }
    case SlotKey.Hours: {
      return SlotKey.Year;
    }
    case SlotKey.Year: {
      return SlotKey.Month;
    }
    case SlotKey.Month:
    case SlotKey.Day:
    default: {
      return SlotKey.Day;
    }
  }
}

export function getNextSlotKey(mode: Mode) {
  return mode === 'date' ? getNextSlotKeyWithDate : getNextSlotKeyWithTime;
}

export function getPrevSlotKey(mode: Mode) {
  return mode === 'date' ? getPrevSlotKeyWithDate : getPrevSlotKeyWithTime;
}

const DATE_STUB = new Date();

/**
 * Преобразует строковое значение поля FieldDate в тип Date
 * @function  helper
 */

export function parseDate(value: string) {
  if (!value) {
    return undefined;
  }

  const splittedValue = value.split(', ');
  const date = splittedValue[0];
  let time = splittedValue[1];

  let [day, month, year] = date.split('.').map(Number);
  month -= 1;

  if (!time && date) {
    time = date;
  }

  if (time) {
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      year = DATE_STUB.getFullYear();
      month = DATE_STUB.getMonth();
      day = DATE_STUB.getDay();
    }

    const [hours, minutes, seconds] = time.split(':').map(str => Number(str) ?? 0);

    return new Date(year, month, day, hours, minutes, seconds);
  }

  return new Date(year, month, day);
}
