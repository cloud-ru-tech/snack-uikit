import { KeyboardEventHandler, useEffect, useMemo, useState } from 'react';
import useTransition from 'react-transition-state';

import { TEST_IDS, TRANSITION_TIMING } from '../../constants';
import { useTreeContext } from '../../contexts/TreeContext';
import { ParentNode } from '../../types';
import { TreeItem } from '../TreeItem';
import { TreeLine } from '../TreeLine';
import { TreeNode, TreeNodeProps } from '../TreeNode';
import styles from './styles.module.scss';

type ExpandableTreeNodeProps = {
  node: TreeNodeProps;
  parentNode?: ParentNode & { parentNode?: ParentNode };
  tabIndexAvailable?: boolean;
};

export function ExpandableTreeNode({
  node: { 'data-test-id': dataTestId, ...node },
  parentNode,
  tabIndexAvailable,
}: ExpandableTreeNodeProps) {
  const { expandedNodes, onExpand, onDataLoad, showLines } = useTreeContext();

  const isExpandable = Boolean(node.nested);
  const isExpanded = expandedNodes?.includes(node.id) || false;

  const [isLoading, setLoading] = useState(false);

  const [state, toggle] = useTransition({
    timeout: TRANSITION_TIMING.accordionFolding,
    initialEntered: isExpanded || undefined,
    enter: isExpanded,
  });

  const showContent = node.nested && node.nested.length > 0 && state.status !== 'exited';

  const isLineHalfHeight = useMemo(() => {
    if (!node.nested?.length) return false;

    return !node.nested.at(-1)?.nested;
  }, [node.nested]);

  useEffect(() => {
    if (node.nested?.length && isExpanded && state.status === 'exited') {
      toggle(true);
    }
  }, [isExpanded, node.nested, state.status]);

  const toggleExpand = async () => {
    if (node.disabled) return;

    if (node.nested && !node.nested.length && !isExpanded && onDataLoad) {
      setLoading(true);

      await onDataLoad(node).finally(() => {
        setLoading(false);
      });
    }

    onExpand(node);

    toggle();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = e => {
    if (!isExpandable) return;

    switch (e.key) {
      case 'ArrowRight': {
        if (!isExpanded) {
          toggleExpand();
        }
        return;
      }
      case 'ArrowLeft': {
        if (isExpanded) {
          toggleExpand();
        }
        return;
      }
      default:
        return;
    }
  };

  return (
    <div
      className={styles.expandableTreeNode}
      data-test-id={dataTestId}
      data-expandable={Boolean(node.nested) || undefined}
      data-disabled={node.disabled || undefined}
    >
      <TreeNode
        {...node}
        isLoading={isLoading}
        parentNode={parentNode}
        onChevronClick={toggleExpand}
        onKeyDown={handleKeyDown}
        tabIndexAvailable={tabIndexAvailable}
      />

      {node.nested && (
        <div
          className={styles.expandableWrap}
          data-expanded={isExpanded || undefined}
          data-test-id={TEST_IDS.expandable}
        >
          {showContent && (
            <div className={styles.expandableContent} data-test-id={TEST_IDS.expandableContent}>
              <TreeLine visible={showLines} halfHeight={isLineHalfHeight} data-test-id={TEST_IDS.line} />

              <div className={styles.expandableNested}>
                {node.nested.map(nestedNode => {
                  const parent: ParentNode = { id: node.id, nested: node.nested, parentNode };

                  return <TreeItem key={nestedNode.id} node={nestedNode} parentNode={parent} />;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
