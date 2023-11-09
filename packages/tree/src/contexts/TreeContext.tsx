import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { SelectionMode } from '../constants';
import { findAllExpandedChildNodeIds, lookupTreeForSelectedNodes } from '../helpers';
import { OnNodeClick, ParentNode, TreeBaseProps, TreeNodeId, TreeNodeProps } from '../types';

type TreeContextProps = Omit<TreeBaseProps, 'onSelect' | 'onExpand' | 'onNodeClick' | 'selected' | 'selectionMode'> & {
  onExpand(node: TreeNodeProps): void;
  onSelect(node: Pick<TreeNodeProps, 'id' | 'nested' | 'disabled'>, parentNode?: ParentNode): void;
  selected?: TreeNodeId[] | TreeNodeId;
  onNodeClick: OnNodeClick;
  isMultiSelect: boolean;
  isSingleSelect: boolean;
  focusedNodeId?: TreeNodeId;
  setFocusPosition(id: TreeNodeId): void;
  resetFocusPosition(): void;
  setFocusIndex: Dispatch<SetStateAction<number | undefined>>;
  focusableNodeIds: TreeNodeId[];
};

type TreeContextProviderProps = {
  children: ReactNode;
  value: TreeBaseProps;
};

export const TreeContext = createContext<TreeContextProps>({
  data: [],
  selected: undefined,
  onSelect() {},
  expandedNodes: [],
  onExpand() {
    return new Promise(resolve => resolve);
  },
  onNodeClick() {},
  setFocusPosition() {},
  setFocusIndex() {},
  resetFocusPosition() {},
  focusableNodeIds: [],
  isMultiSelect: false,
  isSingleSelect: false,
});

export function TreeContextProvider({ children, value }: TreeContextProviderProps) {
  const {
    onNodeClick: onNodeClickProp,
    onExpand: onExpandProp,
    onSelect: onSelectProp,
    selectionMode,
    data,
    ...props
  } = value;

  const isMultiSelect = selectionMode === SelectionMode.Multi;
  const isSingleSelect = selectionMode === SelectionMode.Single;

  const [expandedNodes, onExpandHandler] = useUncontrolledProp<TreeNodeId[]>(
    value.expandedNodes,
    value.expandedNodes || [],
    onExpandProp,
  );

  const onExpand = useCallback<TreeContextProps['onExpand']>(
    node => {
      const isExpanded = expandedNodes.includes(node.id);

      const nodes = isExpanded ? expandedNodes.filter(id => id !== node.id) : expandedNodes.concat(node.id);

      onExpandHandler(nodes, node);
    },
    [expandedNodes, onExpandHandler],
  );

  const [selectedNodes, onSelectHandler] = useUncontrolledProp<typeof value.selected>(value.selected, [], onSelectProp);

  const onSelect = useCallback<TreeContextProps['onSelect']>(
    (node, parentNode) => {
      if (node.disabled) return;

      if (isSingleSelect) {
        onSelectHandler(node.id, node);
        return;
      }

      if (Array.isArray(selectedNodes)) {
        const updatedSelectedNodes = lookupTreeForSelectedNodes({ node, parentNode, selectedNodes });

        onSelectHandler(updatedSelectedNodes, node);
      }
    },
    [isSingleSelect, onSelectHandler, selectedNodes],
  );

  const focusableNodeIds = useMemo(() => {
    if (!expandedNodes?.length) {
      return data.map(node => node.id);
    }

    return data.reduce<string[]>((acc, cur) => {
      acc.push(cur.id);

      const isExpanded = expandedNodes.includes(cur.id);

      if (isExpanded && cur.nested?.length) {
        acc.push(...findAllExpandedChildNodeIds(cur.nested, expandedNodes));
      }

      return acc;
    }, []);
  }, [data, expandedNodes]);

  const [focusIndex, setFocusIndex] = useState<number>();

  const focusedNodeId = focusIndex !== undefined ? focusableNodeIds[focusIndex] : undefined;

  const setFocusPosition = useCallback(
    (nodeId: TreeNodeId) => {
      const newFocusIndex = focusableNodeIds.indexOf(nodeId);
      setFocusIndex(newFocusIndex >= 0 ? newFocusIndex : undefined);
    },
    [focusableNodeIds],
  );

  const resetFocusPosition = useCallback(() => setFocusIndex(undefined), []);

  const onNodeClick = useCallback<OnNodeClick>(
    (node, e) => {
      if (node.disabled) {
        return;
      }

      if (isSingleSelect) {
        onSelect(node);
      }

      node.onClick?.(e) || onNodeClickProp?.(node, e);
    },
    [isSingleSelect, onSelect, onNodeClickProp],
  );

  return (
    <TreeContext.Provider
      value={{
        ...props,
        data,
        selected: selectedNodes,
        isSingleSelect,
        isMultiSelect,
        expandedNodes,
        onExpand,
        onSelect,
        onNodeClick,
        focusedNodeId,
        setFocusPosition,
        resetFocusPosition,
        setFocusIndex,
        focusableNodeIds,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
}

export const useTreeContext = () => useContext(TreeContext);
