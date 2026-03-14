import Queue from 'queue-fifo';

import { TreeNodeProps } from '../types';

type NodeWithDepthAndTarget<T extends TreeNodeProps> = {
  node: T;
  depth: number;
  targetList: T[];
};

/**
 * Обходит дерево в ширину (BFS), передавая каждому узлу список,
 * в который должен быть добавлен его трансформированный результат.
 *
 * @param nodes Корневые узлы дерева.
 * @param rootTargetList Корневой список-приемник для преобразованных узлов.
 * @param callback Функция обработки узла. Возвращает список для детей
 * или undefined, если вложенные узлы обходить не нужно.
 */
export const traverseWithTarget = <T extends TreeNodeProps>(
  nodes: T[],
  rootTargetList: T[],
  callback: (node: T, depth: number, targetList: T[]) => T[] | undefined,
) => {
  const queue = new Queue<NodeWithDepthAndTarget<T>>();

  for (const node of nodes) {
    queue.enqueue({ node, depth: 0, targetList: rootTargetList });
  }

  while (!queue.isEmpty()) {
    const item = queue.dequeue();
    if (!item) continue;

    const { node, depth, targetList } = item;
    const childTargetList = callback(node, depth, targetList);

    if (childTargetList !== undefined && node.nested?.length) {
      for (const child of node.nested) {
        queue.enqueue({ node: child as T, depth: depth + 1, targetList: childTargetList });
      }
    }
  }
};
