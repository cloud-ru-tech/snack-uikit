import { TreeNodeProps } from '../types';
import { traverse } from './traverse';

/**
 * Собирает id всех узлов дерева.
 *
 * @param treeNodes Узлы дерева для обхода.
 * @returns Массив id узлов в порядке обхода BFS.
 * @function collectIds
 */
export function collectIds(treeNodes: TreeNodeProps[]): string[] {
  const ids: string[] = [];

  traverse(treeNodes, node => ids.push(node.id));

  return ids;
}
