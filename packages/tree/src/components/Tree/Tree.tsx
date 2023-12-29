import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { SELECTION_MODE } from '../../constants';
import { TreeContextProvider } from '../../contexts/TreeContext';
import { TreeItem } from '../../helperComponents';
import { SelectionMode, TreeBaseProps, TreeMultiSelect, TreeNodeId, TreeSingleSelect } from '../../types';
import styles from './styles.module.scss';

export type TreeProps = WithSupportProps<TreeBaseProps>;

export function Tree({
  data,
  selected,
  selectionMode,
  onSelect,
  onNodeClick,
  onExpand,
  expandedNodes,
  nodeActions,
  parentActions,
  onDataLoad,
  showLines = true,
  showIcons = true,
  className,
  ...rest
}: TreeProps) {
  return (
    <div className={cn(styles.tree, className)} role='tree' {...extractSupportProps(rest)}>
      <TreeContextProvider
        value={{
          data,
          selected: selected as SelectionMode extends typeof SELECTION_MODE.Single ? TreeNodeId : TreeNodeId[],
          selectionMode: selectionMode as typeof selected extends string
            ? typeof SELECTION_MODE.Single
            : typeof SELECTION_MODE.Multi,
          onSelect: onSelect as SelectionMode extends typeof SELECTION_MODE.Single
            ? TreeSingleSelect['onSelect']
            : TreeMultiSelect['onSelect'],
          expandedNodes,
          onNodeClick,
          onExpand,
          nodeActions,
          parentActions,
          onDataLoad,
          showLines,
          showIcons,
        }}
      >
        {data.map((node, index) => (
          <TreeItem key={node.id} node={node} tabIndexAvailable={index === 0 || index === data.length - 1} />
        ))}
      </TreeContextProvider>
    </div>
  );
}
