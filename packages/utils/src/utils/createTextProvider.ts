import { LanguageCodeType } from '../types/language';

export function createTextProvider<T extends string = string, V = string>(
  dictionary: Partial<Record<LanguageCodeType, Record<T, V>>>,
  packageName: string,
) {
  return <R extends V>(language: LanguageCodeType, entity: T) => {
    const langKey = language === LanguageCodeType.cimode ? LanguageCodeType.ruRU : language;
    const value = dictionary?.[langKey]?.[entity] || '';

    if (language === LanguageCodeType.cimode) {
      const key = `uikit-${packageName}.${entity}`;
      return (value instanceof Function ? () => key : key) as unknown as R;
    }

    return value as R;
  };
}
