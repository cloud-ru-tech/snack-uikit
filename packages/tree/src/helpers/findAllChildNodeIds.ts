import { TreeNodeId, TreeNodeProps } from '../types';

export function findAllChildNodeIds(nodes: TreeNodeProps[]): TreeNodeId[] {
  const stack = [...nodes];
  const ids: TreeNodeId[] = [];

  let node: TreeNodeProps | undefined;

  while ((node = stack.pop())) {
    if (!node.disabled) {
      ids.push(node.id);

      if (node.nested?.length) {
        stack.push(...node.nested);
      }
    }
  }

  return ids;
}
