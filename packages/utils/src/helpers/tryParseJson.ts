function isValidJson(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function tryParseJson<T>(value: T): T | Record<string, unknown> {
  return typeof value === 'string' && isValidJson(value) ? JSON.parse(value) : value;
}
