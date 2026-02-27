import { describe, expect, it } from 'vitest';

import { collectIds } from '../collectIds';
import { tree } from './constants';

describe('collect tree ids', () => {
  it('find all ids', () => {
    const expected: string[] = [
      'customer 1',
      'customer 2',
      'same_hierarchy customer',
      'department 1.1',
      'department 1.2',
      'department 2.1',
      'same_hierarchy department',
      'project 1.1.1',
      'project 1.1.2',
      'same_hierarchy project',
    ];

    expect(collectIds(tree)).toEqual(expected);
  });
});
