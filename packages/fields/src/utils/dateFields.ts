import { SLOT_ORDER, SlotKey, SLOTS } from '../constants';
import { Mode, NoSecondsMode, TimeMode } from '../types';

export function getSlotKeyFromIndexHandler(mode: Mode | TimeMode | NoSecondsMode) {
  return (index: number | null): SlotKey | undefined => {
    if (index !== null) {
      for (const key in SLOTS[mode]) {
        if (index >= SLOTS[mode][key].start && index <= SLOTS[mode][key].end) {
          return key as SlotKey;
        }
      }
    }

    return undefined;
  };
}

export function getNextSlotKeyHandler(mode: Mode | TimeMode | NoSecondsMode) {
  const order = SLOT_ORDER[mode];

  return (slotKey: SlotKey | undefined) => {
    const defaultIndex = order.length - 1;
    const defaultSLot = order[defaultIndex];
    const currentIndex = order.indexOf(slotKey as SlotKey);
    return currentIndex === -1 || currentIndex === defaultIndex ? defaultSLot : order[currentIndex + 1];
  };
}

export function getPrevSlotKeyHandler(mode: Mode | TimeMode | NoSecondsMode) {
  const order = SLOT_ORDER[mode];

  return (slotKey: SlotKey | undefined) => {
    const defaultIndex = 0;
    const defaultSLot = order[defaultIndex];
    const currentIndex = order.indexOf(slotKey as SlotKey);
    return currentIndex === -1 || currentIndex === defaultIndex ? defaultSLot : order[currentIndex - 1];
  };
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

  if (date.includes(':')) {
    time = date;
  }

  if (time) {
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      year = DATE_STUB.getFullYear();
      month = DATE_STUB.getMonth();
      day = DATE_STUB.getDay();
    }

    const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(str => Number(str ?? 0));

    return new Date(year, month, day, hours, minutes, seconds);
  }

  return new Date(year, month, day);
}
