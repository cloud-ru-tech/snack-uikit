const ISO_DATE_SYMBOLS_REGEXP = /[\d-:.TZ+]/g;

export const isDateString = (value: unknown): value is Date => {
  if (typeof value !== 'string') return false;

  const nonDateSymbols = value.replaceAll(ISO_DATE_SYMBOLS_REGEXP, '').trim();
  if (nonDateSymbols.length > 0) return false;

  return !isNaN(new Date(value).getTime());
};
