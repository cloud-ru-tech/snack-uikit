import { ExtendedTreeNodeProps } from '../types';
import { extractTreeNodeTitle } from './extractTreeNodeTitle';

export const sortTreeItemsByTitle = (items: ExtendedTreeNodeProps[]) =>
  items?.toSorted((itemA, itemB) => {
    const valueA = extractTreeNodeTitle(itemA);
    const valueB = extractTreeNodeTitle(itemB);

    return valueA.localeCompare(valueB);
  });
