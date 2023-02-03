import { LanguageCodeType } from './language';
import { Themes } from './theme';

export type WindowStore = {
  sbercloudUIKit: { languageCode?: LanguageCodeType; theme?: Themes };
};
