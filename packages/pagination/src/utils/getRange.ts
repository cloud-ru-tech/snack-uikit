export function getRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, value) => value + start);
}
