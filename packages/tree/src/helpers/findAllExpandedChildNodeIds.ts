import { TreeNodeId, TreeNodeProps } from '../types';

export function findAllExpandedChildNodeIds(nodes: TreeNodeProps[], expandedNodes: TreeNodeId[]) {
  const stack = [...nodes];
  const ids: TreeNodeId[] = [];

  let node: TreeNodeProps | undefined;

  while ((node = stack.shift())) {
    ids.push(node.id);

    if (node.nested?.length && expandedNodes.includes(node.id)) {
      stack.unshift(...node.nested);
    }
  }

  return ids;
}
