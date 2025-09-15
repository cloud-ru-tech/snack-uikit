import { forwardRef, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
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

export const ExpandableTreeNode = forwardRef<HTMLDivElement, ExpandableTreeNodeProps>(
  ({ node: { 'data-test-id': dataTestId, ...node }, parentNode, tabIndexAvailable }, ref) => {
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

    const childrenRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [lastItemHeight, setLastItemHeight] = useState(0);

    useEffect(() => {
      const lastItem = childrenRefs.current?.at(-1);

      if (lastItem) {
        const observer = new ResizeObserver(entities =>
          entities.forEach(entity => {
            if (entity.target === lastItem) {
              const [{ blockSize: newHeight }] = entity.contentBoxSize;
              setLastItemHeight(newHeight);
            }
          }),
        );

        observer.observe(lastItem);

        setLastItemHeight(lastItem.scrollHeight ?? 0);

        return () => observer.disconnect();
      }
    }, [state.status]);

    useEffect(() => {
      if (node.nested?.length && isExpanded && state.status === 'exited') {
        toggle(true);
      }
    }, [isExpanded, node.nested, state.status]);

    const toggleExpand = async () => {
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
        ref={ref}
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
                <TreeLine
                  visible={showLines}
                  data-test-id={TEST_IDS.line}
                  height={`calc(100% - ${lastItemHeight / 2}px)`}
                  className={styles.treeLine}
                />

                <div className={styles.expandableNested}>
                  {node.nested.map((nestedNode, index) => {
                    const parent: ParentNode = { id: node.id, nested: node.nested, parentNode };

                    return (
                      <TreeItem
                        ref={el => (childrenRefs.current[index] = el)}
                        key={nestedNode.id}
                        node={{ ...nestedNode, disabled: node.disabled || nestedNode.disabled }}
                        parentNode={parent}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
