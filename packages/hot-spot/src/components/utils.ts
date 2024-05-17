export function getOffsetStyle(offset: number | string = 0) {
  if (typeof offset !== 'number') {
    return offset;
  }

  if (offset >= 0) {
    return `${offset}px`;
  }

  return `calc(0px - ${Math.abs(offset)}px)`;
}
