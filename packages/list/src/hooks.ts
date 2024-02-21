import FuzzySearch from 'fuzzy-search';
import { useCallback } from 'react';

import { isGroupItemProps, ItemProps } from './components/Items';

function flattenItems(items: ItemProps[]): ItemProps[] {
  const flattenedItems: ItemProps[] = [];

  function flatten(item: ItemProps) {
    if (!isGroupItemProps(item)) {
      flattenedItems.push(item);
    }

    if ('items' in item) {
      for (const nestedItem of item.items) {
        flatten(nestedItem);
      }
    }
  }

  for (const item of items) {
    flatten(item);
  }

  return flattenedItems;
}

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 2;

export function useFuzzySearch(items: ItemProps[], minSearchInputLength?: number) {
  return useCallback(
    (search: string) => {
      const searcher = new FuzzySearch(
        flattenItems(items),
        ['content.option', 'content.caption', 'content.description', 'label'],
        {},
      );

      return search.length > (minSearchInputLength ?? DEFAULT_MIN_SEARCH_INPUT_LENGTH)
        ? searcher.search(search)
        : items;
    },
    [items, minSearchInputLength],
  );
}
