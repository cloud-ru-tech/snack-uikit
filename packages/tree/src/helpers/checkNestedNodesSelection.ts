import { TreeNodeId, TreeNodeProps } from '../types';
import { findAllChildNodeIds } from './findAllChildNodeIds';

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
