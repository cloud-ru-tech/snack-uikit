import { SlotKey, SLOTS } from '../constants';
import { Mode, NoSecondsMode, TimeMode } from '../types';

export function getSlotKey(index: number | null, mode: Mode | TimeMode | NoSecondsMode): SlotKey | null {
  if (index !== null) {
    for (const key in SLOTS[mode]) {
      if (index >= SLOTS[mode][key].start && index <= SLOTS[mode][key].end) {
        return key as SlotKey;
      }
    }
  }

  return null;
}
export function getNextSlotKeyDate(slotKey: string | null) {
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

export function getPrevSlotKeyDate(slotKey: string | null) {
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

export function getNextSlotKeyDateTime(showSeconds: boolean) {
  return (slotKey: string | null) => {
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
      case SlotKey.Minutes: {
        if (showSeconds) {
          return SlotKey.Seconds;
        }
        return SlotKey.Minutes;
      }
      case SlotKey.Seconds:
      default: {
        return SlotKey.Seconds;
      }
    }
  };
}

export function getPrevSlotKeyDateTime(slotKey: string | null) {
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

export function getNextSlotKeyTime(showSeconds: boolean) {
  return (slotKey: string | null) => {
    switch (slotKey) {
      case SlotKey.Hours: {
        return SlotKey.Minutes;
      }
      case SlotKey.Minutes: {
        if (showSeconds) {
          return SlotKey.Seconds;
        }
        return SlotKey.Minutes;
      }
      case SlotKey.Seconds:
      default: {
        return SlotKey.Seconds;
      }
    }
  };
}

export function getPrevSlotKeyTime(slotKey: string | null) {
  switch (slotKey) {
    case SlotKey.Seconds: {
      return SlotKey.Minutes;
    }
    case SlotKey.Minutes:
    case SlotKey.Hours:
    default: {
      return SlotKey.Hours;
    }
  }
}

export function getNextSlotKey(mode: Mode | TimeMode | NoSecondsMode) {
  switch (mode) {
    case 'full-time':
      return getNextSlotKeyTime(true);
    case 'no-seconds':
      return getNextSlotKeyTime(false);
    case 'date-time':
      return getNextSlotKeyDateTime(true);
    case 'date-time-no-sec':
      return getNextSlotKeyDateTime(false);
    case 'date':
    default:
      return getNextSlotKeyDate;
  }
}

export function getPrevSlotKey(mode: Mode | TimeMode | NoSecondsMode) {
  switch (mode) {
    case 'full-time':
    case 'no-seconds':
      return getPrevSlotKeyTime;
    case 'date-time':
    case 'date-time-no-sec':
      return getPrevSlotKeyDateTime;
    case 'date':
    default:
      return getPrevSlotKeyDate;
  }
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

    const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(str => Number(str) ?? 0);

    return new Date(year, month, day, hours, minutes, seconds);
  }

  return new Date(year, month, day);
}
