export const isDateString = (value: unknown): value is Date =>
  typeof value === 'string' && !isNaN(Number(new Date(value)));
