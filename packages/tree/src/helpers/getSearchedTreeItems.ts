import { ExtendedTreeNodeProps } from '../types';
import { extractTreeNodeTitle } from './extractTreeNodeTitle';

const isMatchedTreeItem = (search: string) => {
  const searchLower = search.toLocaleLowerCase();
  return (treeItem: ExtendedTreeNodeProps) => {
    const currentValue = extractTreeNodeTitle(treeItem);
    return currentValue.toLocaleLowerCase().includes(searchLower);
  };
};

type SearchParams = {
  tree: ExtendedTreeNodeProps[];
  searchOptions?: Partial<{
    query: string;
    includeChildrenMatchedParent: boolean;
  }>;
};

export const getSearchedTreeItems = ({ tree, searchOptions }: SearchParams) => {
  if (!searchOptions?.query) return tree;

  const { query = '', includeChildrenMatchedParent } = searchOptions;

  const matchFunc = isMatchedTreeItem(query);

  const searchItems = (treeItems: ExtendedTreeNodeProps[]): ExtendedTreeNodeProps[] =>
    treeItems.reduce<ExtendedTreeNodeProps[]>((acc, item) => {
      const hasMatchingTitle = matchFunc(item);
      const needDeepSearch = !(hasMatchingTitle && includeChildrenMatchedParent);

      const matchedChildren = item.nested && (needDeepSearch ? searchItems(item.nested) : item.nested);

      if (hasMatchingTitle || matchedChildren?.length) {
        const newItem = { ...item };

        if (matchedChildren?.length) {
          newItem.nested = matchedChildren;
        } else {
          delete newItem.nested;
        }

        acc.push(newItem);
      }

      return acc;
    }, []);

  return searchItems(tree);
};
