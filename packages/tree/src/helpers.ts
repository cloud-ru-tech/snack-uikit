import { ParentNode, TreeNodeId, TreeNodeProps } from './types';

function findAllChildNodeIds(nodes: TreeNodeProps[]): TreeNodeId[] {
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
