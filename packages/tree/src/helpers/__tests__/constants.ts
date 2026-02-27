import { TreeNodeProps } from '../../types';

export const tree: TreeNodeProps[] = [
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
      {
        id: 'department 1.2',
        title: 'department 1.2',
      },
    ],
  },
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
