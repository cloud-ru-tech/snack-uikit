import { green, greenDark, purple, purpleDark } from '@sbercloud/uikit-tokens-demo-theme';

import { LanguageCodeType, Themes } from './types';

export const DEFAULT = { LANGUAGE: LanguageCodeType.ruRU, THEME: Themes.Purple };

export const DEPRECATED_COLOR = {
  [Themes.Purple]: purple,
  [Themes.PurpleDark]: purpleDark,
  [Themes.Green]: green,
  [Themes.GreenDark]: greenDark,
};

export enum POST_MESSAGE_KEY {
  changeTheme = 'changeTheme',
  changeThemeDone = 'changeThemeDone',
  changeLanguage = 'changeLanguage',
  changeLanguageDone = 'changeLanguageDone',
}
