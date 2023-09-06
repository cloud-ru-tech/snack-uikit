export function generateOptions(value: string) {
  return Array.from({ length: value.length }).map((_, i) => ({
    option: value + i,
    description: 'some description',
  }));
}
