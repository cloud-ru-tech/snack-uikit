import { TreeNodeProps } from '../types';
import { traverseWithTarget } from './traverseWithTarget';

type UpdateTreeNodeData<TTreeNode extends TreeNodeProps> = Partial<TreeNodeProps> & {
  nested?: TTreeNode[];
};

/**
 * Возвращает копию дерева, где у узла с указанным id обновляются переданные поля.
 *
 * @param tree Исходное дерево.
 * @param nodeId Идентификатор узла, который нужно обновить.
 * @param data Частичные данные узла, которые будут применены к найденному элементу.
 */
export const updateTreeNode = <TTreeNode extends TreeNodeProps>(
  tree: TTreeNode[],
  nodeId: string,
  data: UpdateTreeNodeData<TTreeNode>,
): TTreeNode[] => {
  const result: TTreeNode[] = [];

  traverseWithTarget(tree, result, (source, _depth, targetList) => {
    const isTarget = source.id === nodeId;
    const hasNested = Array.isArray(source.nested);

    let newNested: TTreeNode[] | undefined;

    if (isTarget) {
      newNested = data.nested;
    } else if (hasNested) {
      // will be filled later in next iteration
      newNested = [];
    }

    const newNode = {
      ...source,
      ...(isTarget ? data : {}),
      ...(newNested !== undefined ? { nested: newNested } : {}),
    } as TTreeNode;

    targetList.push(newNode);

    return !isTarget && hasNested && source.nested?.length ? newNested : undefined;
  });

  return result;
};
