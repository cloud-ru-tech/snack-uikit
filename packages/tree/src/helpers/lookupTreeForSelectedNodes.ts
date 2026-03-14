import { ParentNode, TreeNodeId, TreeNodeProps } from '../types';
import { checkNestedNodesSelection } from './checkNestedNodesSelection';
import { findAllChildNodeIds } from './findAllChildNodeIds';

/**
 * Пересчитывает выбранные узлы для режима мультивыбора в дереве.
 * Учитывает потомков текущего узла и корректирует состояние предков.
 *
 * @param params Параметры пересчета выделения.
 * @returns Обновленный список выбранных id.
 */
export function lookupTreeForSelectedNodes({
  node,
  selectedNodes,
  parentNode,
}: {
  node: Pick<TreeNodeProps, 'id' | 'nested' | 'disabled'>;
  selectedNodes: TreeNodeId[];
  parentNode?: ParentNode;
}) {
  const { nested } = node;

  const childSelection = nested?.length ? checkNestedNodesSelection(nested, selectedNodes) : undefined;
  const isSelected = childSelection
    ? childSelection.someSelected || childSelection.allSelected
    : selectedNodes.includes(node.id);

  let updatedSelectedNodes: string[] = [];

  const allIdsFromNode = [node.id];

  if (nested?.length) {
    allIdsFromNode.push(...findAllChildNodeIds(nested));
  }

  if (isSelected) {
    updatedSelectedNodes = selectedNodes.filter(id => !allIdsFromNode.includes(id));
  } else {
    updatedSelectedNodes = selectedNodes.concat(allIdsFromNode);
  }

  if (parentNode) {
    let parent: ParentNode | undefined = parentNode;

    while (parent) {
      if (parent.nested?.length) {
        const parentNestedSelection = checkNestedNodesSelection(parent.nested, updatedSelectedNodes);
        const parentId = parent.id;

        if (isSelected) {
          if (!parentNestedSelection.allSelected) {
            const parentIdIndex = updatedSelectedNodes.indexOf(parentId);
            if (parentIdIndex > -1) {
              updatedSelectedNodes.splice(parentIdIndex, 1);
            }
          }
        } else if (parentNestedSelection.allSelected) {
          updatedSelectedNodes.push(parentId);
        }
      }

      parent = parent.parentNode;
    }
  }

  return updatedSelectedNodes;
}
