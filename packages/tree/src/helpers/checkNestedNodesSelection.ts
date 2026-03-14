import { TreeNodeId, TreeNodeProps } from '../types';
import { findAllChildNodeIds } from './findAllChildNodeIds';

/**
 * Проверяет состояние выбора дочерних узлов:
 * выбраны ли все, выбраны ли некоторые.
 *
 * @param nodes Дочерние узлы для проверки.
 * @param selectedKeys Текущий список выбранных id.
 */
export function checkNestedNodesSelection(nodes: TreeNodeProps[], selectedKeys: TreeNodeId[]) {
  const allIds = findAllChildNodeIds(nodes);

  const selected = allIds.filter(id => selectedKeys.includes(id));
  const someSelected = selected.length > 0;
  const allSelected = someSelected && allIds.length === selected.length;

  return {
    someSelected: !allSelected && someSelected,
    allSelected,
  };
}
