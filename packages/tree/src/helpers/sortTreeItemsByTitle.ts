import { ExtendedTreeNodeProps } from '../types';
import { extractTreeNodeTitle } from './extractTreeNodeTitle';

/**
 * Сортирует узлы дерева по заголовку в алфавитном порядке.
 *
 * @param items Список узлов для сортировки.
 * @param options Опции сортировки. По умолчанию сортировка чувствительна к регистру.
 * @returns Новый отсортированный массив.
 */
type SortTreeItemsByTitleOptions = {
  caseSensitive?: boolean;
};

export const sortTreeItemsByTitle = (items: ExtendedTreeNodeProps[], options?: SortTreeItemsByTitleOptions) =>
  items?.toSorted((itemA, itemB) => {
    const valueA = extractTreeNodeTitle(itemA);
    const valueB = extractTreeNodeTitle(itemB);

    if (options?.caseSensitive ?? true) {
      return valueA.localeCompare(valueB);
    }

    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  });
