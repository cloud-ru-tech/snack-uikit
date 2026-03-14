import { TreeNodeId, TreeNodeProps } from '../types';

/**
 * Возвращает id узлов в поддереве, проходя только по раскрытым веткам.
 *
 * @param nodes Стартовые узлы обхода.
 * @param expandedNodes Список id раскрытых узлов.
 */
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
