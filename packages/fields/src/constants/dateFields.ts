import { Mode, Slot, TimeMode } from '../types';

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

export const TIME_MODE = {
  FullTime: 'full-time',
  NoSeconds: 'no-seconds',
} as const;

export const MASK: Record<Mode | TimeMode, Record<string, string>> = {
  [MODES.Date]: {
    'ru-RU': 'ДД.ММ.ГГГГ',
    'en-US': 'DD.MM.YYYY',
  },
  [MODES.DateTime]: {
    'ru-RU': 'ДД.ММ.ГГГГ, чч:мм:сс',
    'en-US': 'DD.MM.YYYY, hh:mm:ss',
  },
  [TIME_MODE.FullTime]: {
    'ru-RU': 'чч:мм:сс',
    'en-US': 'hh:mm:ss',
  },
  [TIME_MODE.NoSeconds]: {
    'ru-RU': 'чч:мм',
    'en-US': 'hh:mm',
  },
};

export const DEFAULT_LOCALE = new Intl.Locale('ru-RU');

const DATE_SLOTS = {
  [SlotKey.Day]: { start: 0, end: 2, max: 31, min: 1 },
  [SlotKey.Month]: { start: 3, end: 5, max: 12, min: 1 },
  [SlotKey.Year]: { start: 6, end: 10, max: 2100, min: 1900 },
};

const TIME_SLOTS = (shift: number) => ({
  [SlotKey.Hours]: { start: shift, end: shift + 2, max: 23, min: 0 },
  [SlotKey.Minutes]: { start: shift + 3, end: shift + 5, max: 59, min: 0 },
  [SlotKey.Seconds]: { start: shift + 6, end: shift + 8, max: 59, min: 0 },
});

export const SLOTS: Record<Mode | TimeMode, Record<SlotKey | string, Slot>> = {
  [MODES.Date]: DATE_SLOTS,
  [MODES.DateTime]: { ...DATE_SLOTS, ...TIME_SLOTS(12) },
  [TIME_MODE.FullTime]: TIME_SLOTS(0),
  [TIME_MODE.NoSeconds]: TIME_SLOTS(0),
};

const RU_DATE_SLOTS_PLACEHOLDER = {
  [SlotKey.Day]: 'ДД',
  [SlotKey.Month]: 'ММ',
  [SlotKey.Year]: 'ГГГГ',
};

const RU_TIME_SLOTS_PLACEHOLDER = {
  [SlotKey.Hours]: 'чч',
  [SlotKey.Minutes]: 'мм',
  [SlotKey.Seconds]: 'сс',
};

const EN_DATE_SLOTS_PLACEHOLDER = {
  [SlotKey.Day]: 'DD',
  [SlotKey.Month]: 'MM',
  [SlotKey.Year]: 'YYYY',
};

const EN_TIME_SLOTS_PLACEHOLDER = {
  [SlotKey.Hours]: 'hh',
  [SlotKey.Minutes]: 'mm',
  [SlotKey.Seconds]: 'ss',
};

export const SLOTS_PLACEHOLDER: Record<Mode | TimeMode, Record<string, Partial<Record<SlotKey, string>>>> = {
  [MODES.Date]: {
    'ru-RU': RU_DATE_SLOTS_PLACEHOLDER,
    'en-US': EN_DATE_SLOTS_PLACEHOLDER,
  },
  [MODES.DateTime]: {
    'ru-RU': { ...RU_DATE_SLOTS_PLACEHOLDER, ...RU_TIME_SLOTS_PLACEHOLDER },
    'en-US': { ...EN_DATE_SLOTS_PLACEHOLDER, ...EN_TIME_SLOTS_PLACEHOLDER },
  },
  [TIME_MODE.FullTime]: {
    'ru-RU': RU_TIME_SLOTS_PLACEHOLDER,
    'en-US': EN_TIME_SLOTS_PLACEHOLDER,
  },
  [TIME_MODE.NoSeconds]: {
    'ru-RU': { ...RU_TIME_SLOTS_PLACEHOLDER, [SlotKey.Seconds]: undefined },
    'en-US': { ...EN_TIME_SLOTS_PLACEHOLDER, [SlotKey.Seconds]: undefined },
  },
};
