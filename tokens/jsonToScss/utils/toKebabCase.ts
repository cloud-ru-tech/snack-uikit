import StyleDictionaryPackage from 'style-dictionary';

export const toKebabCase = (key: string) =>
  StyleDictionaryPackage.transform['name/cti/kebab'].transformer(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { path: [key] },
    { prefix: '' },
  );
