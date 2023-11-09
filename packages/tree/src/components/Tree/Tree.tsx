import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { SelectionMode } from '../../constants';
import { TreeContextProvider } from '../../contexts/TreeContext';
import { TreeItem } from '../../helperComponents';
import { TreeBaseProps, TreeMultiSelect, TreeNodeId, TreeSingleSelect } from '../../types';
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
  className,
  ...rest
}: TreeProps) {
  return (
    <div className={cn(styles.tree, className)} role='tree' {...extractSupportProps(rest)}>
      <TreeContextProvider
        value={{
          data,
          selected: selected as typeof SelectionMode extends SelectionMode.Single ? TreeNodeId : TreeNodeId[],
          selectionMode: selectionMode as typeof selected extends string ? SelectionMode.Single : SelectionMode.Multi,
          onSelect: onSelect as typeof SelectionMode extends SelectionMode.Single
            ? TreeSingleSelect['onSelect']
            : TreeMultiSelect['onSelect'],
          expandedNodes,
          onNodeClick,
          onExpand,
          nodeActions,
          parentActions,
          onDataLoad,
          showLines,
        }}
      >
        {data.map((node, index) => (
          <TreeItem key={node.id} node={node} tabIndexAvailable={index === 0 || index === data.length - 1} />
        ))}
      </TreeContextProvider>
    </div>
  );
}

Tree.selectionModes = SelectionMode;
