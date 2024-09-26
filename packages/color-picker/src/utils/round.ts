export const round = (number: number, digits = 0, base = Math.pow(10, digits)): number =>
  Math.round(base * number) / base;
