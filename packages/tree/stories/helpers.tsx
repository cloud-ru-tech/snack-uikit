import { PlaceholderSVG } from '@snack-ui/icons';

import { TreeNodeProps } from '../src';

export function getNested(id: string) {
  return [
    {
      id: `${id}/2.1`,
      title: 'item 3',
      nested: [
        {
          id: `${id}/2.1-1`,
          title: 'item 4',
          nested: [
            {
              id: `${id}/2.1-1.1`,
              title: 'item 5',
              nested: [{ id: `${id}/2.1-1.1-1`, title: 'item 6' }],
            },
            {
              id: `${id}/2.1-1.2`,
              title: 'item 7',
              nested: [{ id: `${id}/2.1-1.2-1`, title: 'item 6' }],
            },
          ],
        },
      ],
    },
    {
      id: `${id}/2.2`,
      title: 'item 8',
      nested: [
        { id: `${id}/2.2-1.1`, title: 'item 4', icon: <PlaceholderSVG /> },
        { id: `${id}/2.2-1.2`, title: 'first-second' },
      ],
    },
  ];
}

export function getNodeActions(isParent = false) {
  return (node: TreeNodeProps) => {
    const option = isParent ? 'parent' : 'node';
    return [
      {
        option: `${option} action 1 for node ${node.id}`,
      },
      {
        option: `${option} action 2 for node ${node.id}`,
      },
    ];
  };
}
