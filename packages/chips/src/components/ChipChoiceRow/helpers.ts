/**
 * функция проверки заполненности фильтра
 * @function hasFilterBeenApplied
 */
export function hasFilterBeenApplied(filter: unknown): boolean {
  if (Array.isArray(filter)) {
    return filter.length > 0 && Object.values(filter).some(Boolean);
  }

  if (filter && typeof filter === 'object') {
    return Object.values(filter).some(Boolean) || filter instanceof Date;
  }

  return Boolean(filter);
}
