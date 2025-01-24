import { forwardRef } from 'react';

import { TEST_IDS } from '../../constants';
import { ParentNode, TreeNodeProps } from '../../types';
import { ExpandableTreeNode } from '../ExpandableTreeNode';
import { TreeNode } from '../TreeNode';

type TreeItemProps = {
  node: TreeNodeProps;
  parentNode?: ParentNode;
  tabIndexAvailable?: boolean;
};

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(({ node, tabIndexAvailable, parentNode }, ref) => {
  const dataTestId = node['data-test-id'] || TEST_IDS.node;

  const nodeProps: TreeNodeProps = { ...node, 'data-test-id': dataTestId };

  if (node.nested) {
    return (
      <ExpandableTreeNode node={nodeProps} tabIndexAvailable={tabIndexAvailable} parentNode={parentNode} ref={ref} />
    );
  }

  return <TreeNode {...nodeProps} tabIndexAvailable={tabIndexAvailable} parentNode={parentNode} ref={ref} />;
});
