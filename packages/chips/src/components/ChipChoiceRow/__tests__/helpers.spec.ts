import { describe, expect, it } from 'vitest';

import { areValuesEqual } from '../helpers';

describe('ChipChoiceRow areValuesEqual helper', () => {
  it.each([
    { value1: true, value2: true },
    { value1: undefined, value2: undefined },
    { value1: null, value2: null },
    { value1: 101, value2: 101 },
    { value1: 'string value', value2: 'string value' },
    { value1: [], value2: [] },
    { value1: [2, 12, 26], value2: [2, 12, 26] },
    { value1: {}, value2: {} },
    { value1: { a: 2, b: { x: 5 }, c: null }, value2: { a: 2, b: { x: 5 }, c: null } },
    { value1: new Date('11.03.2025'), value2: new Date('11.03.2025') },
  ])('should return true for values: $value1 and $value2', ({ value1, value2 }) => {
    expect(areValuesEqual(value1, value2)).toBeTruthy();
  });

  it.each([
    { value1: true, value2: false },
    { value1: undefined, value2: null },
    { value1: 101, value2: 105 },
    { value1: 'string value 1', value2: 'string value 2' },
    { value1: [2, 14, 3], value2: [2, 12, 26] },
    { value1: [2, 14], value2: [2, 14, 49] },
    { value1: { a: 2, b: { x: 10 }, c: null }, value2: { a: 2, b: { x: 3 }, c: null } },
    { value1: { a: 2, b: { x: 10 }, c: null }, value2: { a: 2, c: null } },
    { value1: new Date('23.02.2025'), value2: new Date('8.03.2025') },
  ])('should return false for values: $value1 and $value2', ({ value1, value2 }) => {
    expect(areValuesEqual(value1, value2)).toBeFalsy();
  });
});
