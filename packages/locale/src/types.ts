import { LOCALES } from './locales';
import { PartialDeep, PathsToProps } from './typeUtils';

export type LocaleLang = keyof typeof LOCALES;

export type TranslatedEntity = {
  [key: string]: string | TranslatedEntity;
};

export type Dictionary = Record<string, TranslatedEntity>;

export type LocaleDictionary<D extends Dictionary> = (typeof LOCALES)['en-GB'] & D;

export type Locales<D extends Dictionary> = Record<LocaleLang, LocaleDictionary<D>>;

export type OverrideLocales<D extends Dictionary> = PartialDeep<Record<LocaleLang, LocaleDictionary<D>>>;

export type DottedTranslationKey<
  D extends Dictionary,
  C extends keyof LocaleDictionary<D> | undefined = undefined,
> = C extends keyof LocaleDictionary<D>
  ? PathsToProps<LocaleDictionary<D>[C], string>
  : PathsToProps<LocaleDictionary<D>, string>;

export type ExtendedDictionary<D> = Record<LocaleLang, D>;

export type InterpolationObject = Record<string, string | number>;
