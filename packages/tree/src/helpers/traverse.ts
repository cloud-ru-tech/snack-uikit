import Queue from 'queue-fifo';

import { TreeNodeProps } from '../types';

type NodeWithDepth<T extends TreeNodeProps> = { node: T; depth: number };

/**
 * Обходит дерево в ширину (BFS) и вызывает callback для каждого узла.
 *
 * @param nodes Корневые узлы дерева.
 * @param callback Функция, вызываемая для каждого найденного узла.
 */
export const traverse = <T extends TreeNodeProps>(nodes: T[], callback: (node: T, depth: number) => void) => {
  const queue = new Queue<NodeWithDepth<T>>();

  for (const node of nodes) {
    queue.enqueue({ node, depth: 0 });
  }

  while (!queue.isEmpty()) {
    const nodeWithDepth = queue.dequeue();
    if (!nodeWithDepth) {
      continue;
    }

    const { node, depth } = nodeWithDepth;
    callback(node, depth);

    for (const child of node.nested ?? []) {
      queue.enqueue({ node: child as T, depth: depth + 1 });
    }
  }
};
