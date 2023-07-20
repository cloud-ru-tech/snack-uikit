import { Slot } from './types';

export enum SlotKey {
  Day = 'D',
  Month = 'M',
  Year = 'Y',
}

export const MASK: Record<string, string> = {
  'ru-RU': 'ДД.ММ.ГГГГ',
  'en-US': 'DD.MM.YYYY',
};

export const DEFAULT_LOCALE = new Intl.Locale('ru-RU');

export const SLOTS: Record<SlotKey | string, Slot> = {
  [SlotKey.Day]: { start: 0, end: 2, max: 31, min: 1 },
  [SlotKey.Month]: { start: 3, end: 5, max: 12, min: 1 },
  [SlotKey.Year]: { start: 6, end: 10, max: 2100, min: 1900 },
} as const;

export const SLOTS_PLACEHOLDER: Record<string, Record<string, string>> = {
  'ru-RU': {
    [SlotKey.Day]: 'ДД',
    [SlotKey.Month]: 'ММ',
    [SlotKey.Year]: 'ГГГГ',
  },
  'en-US': {
    [SlotKey.Day]: 'DD',
    [SlotKey.Month]: 'MM',
    [SlotKey.Year]: 'YYYY',
  },
};
