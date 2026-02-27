import { describe, expect, it } from 'vitest';

import type { TreeNodeProps } from '../../types';
import { getSearchedTreeItems } from '../getSearchedTreeItems';
import { tree } from './constants';

describe('search tree items', () => {
  it('find items if 1 project is matched', () => {
    const expected: TreeNodeProps[] = [
      {
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
            ],
          },
        ],
      },
    ];

    expect(getSearchedTreeItems({ tree, searchOptions: { query: 'project 1.1.1' } })).toEqual(expected);
  });

  it('find items if 2 projects are matched', () => {
    const expected: TreeNodeProps[] = [
      {
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
        ],
      },
    ];

    expect(getSearchedTreeItems({ tree, searchOptions: { query: 'project 1.1' } })).toEqual(expected);
  });

  it('find items if 1 department is matched', () => {
    const expected: TreeNodeProps[] = [
      {
        id: 'customer 1',
        title: 'customer 1',
        nested: [
          {
            id: 'department 1.1',
            title: 'department 1.1',
          },
        ],
      },
    ];

    expect(getSearchedTreeItems({ tree, searchOptions: { query: 'department 1.1' } })).toEqual(expected);
  });

  it('find items if 2 departments are matched', () => {
    const expected: TreeNodeProps[] = [
      {
        id: 'customer 1',
        title: 'customer 1',
        nested: [
          {
            id: 'department 1.1',
            title: 'department 1.1',
          },
          {
            id: 'department 1.2',
            title: 'department 1.2',
          },
        ],
      },
    ];

    expect(getSearchedTreeItems({ tree, searchOptions: { query: 'department 1.' } })).toEqual(expected);
  });

  it('find items if 1 customer is matched', () => {
    const expected: TreeNodeProps[] = [
      {
        id: 'customer 1',
        title: 'customer 1',
      },
    ];

    expect(getSearchedTreeItems({ tree, searchOptions: { query: 'customer 1' } })).toEqual(expected);
  });

  it('find items if not one items are matched', () => {
    const expected: TreeNodeProps[] = [];

    expect(getSearchedTreeItems({ tree, searchOptions: { query: 'test' } })).toEqual(expected);
  });

  it('find items if empty query', () => {
    expect(getSearchedTreeItems({ tree, searchOptions: { query: '' } })).toEqual(tree);
  });

  it('find items if empty searchOptions', () => {
    expect(getSearchedTreeItems({ tree })).toEqual(tree);
  });

  it('find matches in the same hierarchy', () => {
    const expected: TreeNodeProps[] = [
      {
        id: 'same_hierarchy customer',
        title: 'same_hierarchy customer',
        nested: [
          {
            id: 'same_hierarchy department',
            title: 'same_hierarchy department',
            nested: [
              {
                id: 'same_hierarchy project',
                title: 'same_hierarchy project',
              },
            ],
          },
        ],
      },
    ];

    expect(getSearchedTreeItems({ tree, searchOptions: { query: 'same_hierarchy' } })).toEqual(expected);
  });

  it('find all items from customer 2', () => {
    const expected: TreeNodeProps[] = [
      {
        id: 'customer 2',
        title: 'customer 2',
        nested: [
          {
            id: 'department 2.1',
            title: 'department 2.1',
          },
        ],
      },
    ];

    expect(
      getSearchedTreeItems({ tree, searchOptions: { query: 'customer 2', includeChildrenMatchedParent: true } }),
    ).toEqual(expected);
  });

  it('find all items from department 1.1', () => {
    const expected: TreeNodeProps[] = [
      {
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
        ],
      },
    ];

    expect(
      getSearchedTreeItems({ tree, searchOptions: { query: 'department 1.1', includeChildrenMatchedParent: true } }),
    ).toEqual(expected);
  });
});
