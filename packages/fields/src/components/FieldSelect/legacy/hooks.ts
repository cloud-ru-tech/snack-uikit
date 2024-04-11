import FuzzySearch from 'fuzzy-search';
import { useCallback, useMemo } from 'react';

import { ItemProps, kindFlattenItems } from '@snack-uikit/list';

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 2;

/**
 * Нечеткий поиск среди айтемов по полям 'content.option', 'content.caption', 'content.description', 'label'
 */
export function useFuzzySearch(items: ItemProps[], minSearchInputLength?: number) {
  const flattenItems = useMemo(() => {
    const { flattenItems } = kindFlattenItems({ items });

    return Object.values(flattenItems);
  }, [items]);

  return useCallback(
    (search: string) => {
      const searcher = new FuzzySearch(
        flattenItems,
        ['content.option', 'content.caption', 'content.description', 'label'],
        {},
      );

      return search.length > (minSearchInputLength ?? DEFAULT_MIN_SEARCH_INPUT_LENGTH)
        ? searcher.search(search)
        : items;
    },
    [flattenItems, items, minSearchInputLength],
  );
}
