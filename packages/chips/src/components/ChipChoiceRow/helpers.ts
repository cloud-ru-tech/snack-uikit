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

export function areValuesEqual(value1: unknown, value2: unknown): boolean {
  if (Array.isArray(value1)) {
    if (!Array.isArray(value2)) return false;
    if (value1 === value2) return true;
    if (value1.length !== value2.length) return false;

    return value1.every((item, index) => areValuesEqual(item, value2[index]));
  }

  if (value1 && typeof value1 === 'object') {
    if (!value2 || typeof value2 !== 'object') return false;
    if (value1 === value2) return true;

    if (value1 instanceof Date) {
      return value2 instanceof Date ? value1.valueOf() === value2.valueOf() : false;
    }

    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    if (keys1.length !== keys2.length) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return keys1.every(key => areValuesEqual(value1[key], value2[key]));
  }

  return value1 === value2;
}
