import { ExtendedTreeNodeProps } from '../types';

type ReturnSearch<I, T> = I extends string ? T | null : T[];

type SearchByIdParams<I, T> = {
  tree: T[];
  searchOptions: {
    id: I;
    includeNested?: boolean;
  };
};

export const getSearchedTreeNodeById = <I extends string | string[], T extends ExtendedTreeNodeProps>({
  tree,
  searchOptions: { id, includeNested = true },
}: SearchByIdParams<I, T>): ReturnSearch<I, T> => {
  const isArrayIds = Array.isArray(id);

  if (!id || (isArrayIds && id.length === 0)) {
    return (isArrayIds ? [] : null) as ReturnSearch<I, T>;
  }

  const foundItems: T[] = [];

  const searchNodes = (nodes: T[]): void => {
    for (const node of nodes) {
      const matchCondition = isArrayIds ? id.includes(node.id) : node.id === id;

      if (matchCondition) {
        foundItems.push(includeNested ? node : { ...node, nested: undefined });

        if (!isArrayIds) {
          return;
        }
      }

      if (node.nested) {
        searchNodes(node.nested as T[]);
      }
    }
  };

  searchNodes(tree);

  return (isArrayIds ? foundItems : foundItems[0] || null) as ReturnSearch<I, T>;
};
