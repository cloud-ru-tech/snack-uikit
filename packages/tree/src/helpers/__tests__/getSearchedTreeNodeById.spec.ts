import { describe, expect, it } from 'vitest';

import type { TreeNodeProps } from '../../types';
import { getSearchedTreeNodeById } from '../getSearchedTreeNodeById';
import { tree } from './constants';

describe('get tree items by id', () => {
  it('should return the item with nested when it exists', () => {
    const expected: TreeNodeProps = {
      id: 'customer 1',
      title: 'customer 1',
      nested: [
        {
          id: 'department 1.1',
          title: 'department 1.1',
          nested: [
            {
              id: 'project 1.1.1',
              title: 'project 1.1.1',
            },
            {
              id: 'project 1.1.2',
              title: 'project 1.1.2',
            },
          ],
        },
        {
          id: 'department 1.2',
          title: 'department 1.2',
        },
      ],
    };

    expect(getSearchedTreeNodeById({ tree, searchOptions: { id: 'customer 1' } })).toEqual(expected);
  });

  it('should return the item without nested when it exists', () => {
    const expected: TreeNodeProps = {
      id: 'customer 1',
      title: 'customer 1',
    };

    expect(getSearchedTreeNodeById({ tree, searchOptions: { id: 'customer 1', includeNested: false } })).toEqual(
      expected,
    );
  });

  it('should return null or undefined when the item does not exist', () => {
    const expected = null;

    expect(getSearchedTreeNodeById({ tree, searchOptions: { id: 'customer none' } })).toEqual(expected);
  });
});

describe('get tree items by ids', () => {
  it('should return the item when only 1 item exists with nested', () => {
    const expected: TreeNodeProps[] = [
      {
        id: 'department 1.1',
        title: 'department 1.1',
        nested: [
          {
            id: 'project 1.1.1',
            title: 'project 1.1.1',
          },
          {
            id: 'project 1.1.2',
            title: 'project 1.1.2',
          },
        ],
      },
    ];

    expect(
      getSearchedTreeNodeById({
        tree,
        searchOptions: { id: ['department 1.1'] },
      }),
    ).toEqual(expected);
  });

  it('should return the item when only 1 item exists without nested', () => {
    const expected: TreeNodeProps[] = [
      {
        id: 'department 1.1',
        title: 'department 1.1',
      },
    ];

    expect(
      getSearchedTreeNodeById({
        tree,
        searchOptions: { id: ['department 1.1'], includeNested: false },
      }),
    ).toEqual(expected);
  });

  it('should return both items when 2 items exist', () => {
    const expected: TreeNodeProps[] = [
      {
        id: 'department 1.1',
        title: 'department 1.1',
        nested: [
          {
            id: 'project 1.1.1',
            title: 'project 1.1.1',
          },
          {
            id: 'project 1.1.2',
            title: 'project 1.1.2',
          },
        ],
      },
      {
        id: 'department 1.2',
        title: 'department 1.2',
      },
    ];

    expect(
      getSearchedTreeNodeById({
        tree,
        searchOptions: { id: ['department 1.1', 'department 1.2'] },
      }),
    ).toEqual(expected);
  });

  it('should return an empty array or null when no items exist', () => {
    const expected: TreeNodeProps[] = [];

    expect(
      getSearchedTreeNodeById({
        tree,
        searchOptions: { id: ['department 1.1test', 'department 1.2test'] },
      }),
    ).toEqual(expected);
  });
});
