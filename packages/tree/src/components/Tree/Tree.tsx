import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TreeContextProvider } from '../../contexts/TreeContext';
import { TreeItem } from '../../helperComponents';
import { TreeBaseProps } from '../../types';
import styles from './styles.module.scss';
import { extractSelectableProps } from './utils';

export type TreeProps = WithSupportProps<TreeBaseProps>;

export function Tree({
  data,
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
          expandedNodes,
          onNodeClick,
          onExpand,
          nodeActions,
          parentActions,
          onDataLoad,
          showLines,
          showIcons,
          ...extractSelectableProps(rest),
        }}
      >
        {data.map((node, index) => (
          <TreeItem key={node.id} node={node} tabIndexAvailable={index === 0 || index === data.length - 1} />
        ))}
      </TreeContextProvider>
    </div>
  );
}
