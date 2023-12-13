import { Option } from './types';

export const EMPTY_OPTION: Option = { value: '', label: '' };
export const DEFAULT_LOCALE = new Intl.Locale('ru-RU');

export const SELECTION_MODE = {
  Single: 'single',
  Multi: 'multi',
} as const;
