const DATE_SYMBOLS_REGEXP = /[\d\-:.TZ+\s]/g;

/** Утилита для проверки значения на соответствие дате.
 * Поддерживает:
 * - ISO форматы: '2021-01-01T00:00:00Z', '2021-01-01T15:55:42.000Z'
 * - Форматы с точками: '12.03.2025', '12.03.2025 12:00'
 * - Частичные даты: '2026', '2026-01'
 * - Timestamps: '1768492519666', '-62167219200000'
 * - Временные зоны: '+03:00', '-05:00'
 * С полным списком поддерживаемых значений можно ознакомиться
 * в файле с unit тестами packages/toolbar/__tests__/isDateString.spec.ts
 */
export const isDateString = (value: unknown): value is Date => {
  if (typeof value !== 'string') return false;

  const trimmed = value.trim();
  if (trimmed.length === 0) return false;

  const nonDateSymbols = trimmed.replaceAll(DATE_SYMBOLS_REGEXP, '');
  if (nonDateSymbols.length > 0) return false;

  if (/^-?\d+$/.test(trimmed)) {
    if (trimmed.length <= 2) return false;

    const num = Number(trimmed);
    const date = new Date(num);

    if (isNaN(date.getTime())) return false;

    return date.getTime() === num;
  }

  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(trimmed)) {
    return false;
  }

  const date = new Date(trimmed);
  if (isNaN(date.getTime())) return false;

  const hasDateLikeStructure =
    /^\d{4}/.test(trimmed) ||
    /^\d{1,2}[.-]\d{1,2}[.-]\d{4}/.test(trimmed) ||
    /^\d{4}[.-]\d{1,2}[.-]\d{1,2}/.test(trimmed) ||
    /T/.test(trimmed);

  if (!hasDateLikeStructure && !trimmed.includes(':')) {
    return false;
  }

  return date.toString() !== 'Invalid Date';
};
