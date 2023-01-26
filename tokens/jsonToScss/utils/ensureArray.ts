export const ensureArray = <T>(item: null | undefined | T | T[]): T[] => {
  if (Array.isArray(item)) {
    return item;
  }

  if (item === undefined || item === null) {
    return [];
  }

  return [item];
};
