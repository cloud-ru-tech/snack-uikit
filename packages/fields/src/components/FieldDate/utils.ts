import { SlotKey, SLOTS } from './constants';

export function getSlotKey(index: number | null) {
  if (index !== null) {
    for (const key in SLOTS) {
      if (index >= SLOTS[key].start && index <= SLOTS[key].end) {
        return key;
      }
    }
  }

  return null;
}

export function getNextSlotKey(slotKey: string | null) {
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

export function getPrevSlotKey(slotKey: string | null) {
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

/**
 * Преобразует строковое значение поля FieldDate в тип Date
 * @function  helper
 */

export function parseDate(date: string) {
  const values = date.split('.');
  return new Date(Number(values[2]), Number(values[1]) - 1, Number(values[0]));
}
