export function getValueByPath(item: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  const firstFieldName = keys[0];

  if (!item[firstFieldName]) {
    return '';
  }

  if (keys.length > 1) {
    return getValueByPath(item[firstFieldName] as Record<string, unknown>, keys.slice(1, keys.length).join('.'));
  }

  if (path in item) {
    const value = item[path];

    if (typeof value === 'string' || typeof value === 'number') {
      return value.toString() || '';
    }
  }

  return '';
}
