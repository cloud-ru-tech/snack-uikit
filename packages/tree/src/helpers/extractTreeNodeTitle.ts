import { ExtendedTreeNodeProps } from '../types';

/**
 * Возвращает строковый заголовок узла дерева.
 * Если title задан функцией, использует getTitle (если он доступен).
 */
export const extractTreeNodeTitle = ({ title, getTitle }: ExtendedTreeNodeProps) =>
  typeof title === 'string' ? title : getTitle?.() ?? '';
