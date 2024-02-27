import FuzzySearch from 'fuzzy-search';
import { useCallback } from 'react';

import { ItemProps } from './components/Items';
import { flattenItems } from './utils';

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 2;

/**
 * Нечеткий поиск среди айтемов по полям 'content.option', 'content.caption', 'content.description', 'label'
 */
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
