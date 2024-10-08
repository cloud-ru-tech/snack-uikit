import { Mode, Slot } from './types';

export enum SlotKey {
  Day = 'D',
  Month = 'M',
  Year = 'Y',
  Hours = 'h',
  Minutes = 'm',
  Seconds = 's',
}

export const MODES = {
  Date: 'date',
  DateTime: 'date-time',
} as const;

export const MASK: Record<Mode, Record<string, string>> = {
  [MODES.Date]: {
    'ru-RU': 'ДД.ММ.ГГГГ',
    'en-US': 'DD.MM.YYYY',
  },
  [MODES.DateTime]: {
    'ru-RU': 'ДД.ММ.ГГГГ, чч:мм:сс',
    'en-US': 'DD.MM.YYYY, hh:mm:ss',
  },
};

export const DEFAULT_LOCALE = new Intl.Locale('ru-RU');

const DATE_SLOTS = {
  [SlotKey.Day]: { start: 0, end: 2, max: 31, min: 1 },
  [SlotKey.Month]: { start: 3, end: 5, max: 12, min: 1 },
  [SlotKey.Year]: { start: 6, end: 10, max: 2100, min: 1900 },
};

export const SLOTS: Record<Mode, Record<SlotKey | string, Slot>> = {
  [MODES.Date]: DATE_SLOTS,
  [MODES.DateTime]: {
    ...DATE_SLOTS,
    [SlotKey.Hours]: { start: 12, end: 14, max: 23, min: 0 },
    [SlotKey.Minutes]: { start: 15, end: 17, max: 59, min: 0 },
    [SlotKey.Seconds]: { start: 18, end: 20, max: 59, min: 0 },
  },
};

const RU_DATE_SLOTS_PLACEHOLDER = {
  [SlotKey.Day]: 'ДД',
  [SlotKey.Month]: 'ММ',
  [SlotKey.Year]: 'ГГГГ',
};

const EN_DATE_SLOTS_PLACEHOLDER = {
  [SlotKey.Day]: 'DD',
  [SlotKey.Month]: 'MM',
  [SlotKey.Year]: 'YYYY',
};

export const SLOTS_PLACEHOLDER: Record<Mode, Record<string, Partial<Record<SlotKey, string>>>> = {
  [MODES.Date]: {
    'ru-RU': RU_DATE_SLOTS_PLACEHOLDER,
    'en-US': EN_DATE_SLOTS_PLACEHOLDER,
  },
  [MODES.DateTime]: {
    'ru-RU': {
      ...RU_DATE_SLOTS_PLACEHOLDER,
      [SlotKey.Hours]: 'чч',
      [SlotKey.Minutes]: 'мм',
      [SlotKey.Seconds]: 'сс',
    },
    'en-US': {
      ...EN_DATE_SLOTS_PLACEHOLDER,
      [SlotKey.Hours]: 'hh',
      [SlotKey.Minutes]: 'mm',
      [SlotKey.Seconds]: 'ss',
    },
  },
};
