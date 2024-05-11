export function generateOptions(value: string) {
  return Array.from({ length: value.length }).map((_, i) => ({
    id: value + i,
    content: { option: value + i, description: 'some description' },
  }));
}
