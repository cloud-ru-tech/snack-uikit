import { TreeNodeProps } from '../types';
import { traverse } from './traverse';

export const collectIds = (treeNodes: TreeNodeProps[]) => {
  const ids: string[] = [];

  traverse(treeNodes, node => ids.push(node.id));

  return ids;
};
