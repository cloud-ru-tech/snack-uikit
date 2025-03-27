export const isEveryArrayItemString = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(setting => typeof setting === 'string');
