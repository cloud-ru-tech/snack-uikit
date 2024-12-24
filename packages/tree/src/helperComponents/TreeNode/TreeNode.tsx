import cn from 'classnames';
import { FocusEvent, KeyboardEventHandler, MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChevronRightSVG, FileSVG, FolderOpenSVG, FolderSVG } from '@snack-uikit/icons';
import { Checkbox, Radio } from '@snack-uikit/toggles';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { useTreeContext } from '../../contexts/TreeContext';
import { checkNestedNodesSelection } from '../../helpers';
import { ParentNode, TreeNodeProps } from '../../types';
import { TreeLine } from '../TreeLine';
import { TreeNodeActions } from './components';
import styles from './styles.module.scss';
import { stopPropagationClick } from './utils';

export type { TreeNodeProps };

type TreeNodeComponentProps = TreeNodeProps & {
  onChevronClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  isLoading?: boolean;
  parentNode?: ParentNode;
  tabIndexAvailable?: boolean;
};

export function TreeNode({
  id,
  title,
  icon = <FileSVG size={24} />,
  expandedIcon = <FolderOpenSVG size={24} />,
  collapsedIcon = <FolderSVG size={24} />,
  disabled,
  onClick,
  nested,
  className,
  onChevronClick,
  onKeyDown,
  isLoading,
  parentNode,
  tabIndexAvailable,
  ...rest
}: TreeNodeComponentProps) {
  const {
    isMultiSelect,
    isSelectable,
    onNodeClick,
    selected,
    expandedNodes,
    onSelect,
    nodeActions,
    parentActions,
    setFocusPosition,
    resetFocusPosition,
    focusedNodeId,
    setFocusIndex,
    focusableNodeIds,
    showToggle,
    showLines,
    showIcons,
  } = useTreeContext();

  const [isDroplistOpen, setDroplistOpen] = useState(false);
  const [isDroplistTriggerFocused, setFocusDroplistTrigger] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const isExpandable = Array.isArray(nested);
  const isExpanded = isExpandable ? expandedNodes?.includes(id) : undefined;

  const nestedNodesSelection = useMemo(() => {
    if (!nested || !selected) return undefined;

    return checkNestedNodesSelection(nested, Array.isArray(selected) ? selected : [selected]);
  }, [nested, selected]);

  const isSelected =
    (Array.isArray(selected) ? selected.includes(id) || nestedNodesSelection?.allSelected : selected === id) || false;

  const isFocused = focusedNodeId === id;

  useEffect(() => {
    if (ref.current && isFocused) {
      ref.current.focus();
    }
  }, [isFocused]);

  const treeNodeIcon = useMemo(() => {
    if (!showIcons) return undefined;

    if (isExpandable) {
      return isExpanded ? expandedIcon : collapsedIcon;
    }

    return icon;
  }, [showIcons, isExpandable, icon, isExpanded, expandedIcon, collapsedIcon]);

  const handleClick: TreeNodeProps['onClick'] = e => {
    onNodeClick(
      {
        id,
        title,
        disabled,
        nested,
        onClick,
      },
      e,
    );
  };

  const handleSelect = () => {
    onSelect(
      {
        id,
        disabled,
        nested,
      },
      parentNode,
    );
  };

  const handleFocus = (e?: FocusEvent) => {
    setFocusPosition(id);

    if (!e) {
      setFocusDroplistTrigger(false);
      ref.current?.focus();
    }
  };

  const handleBlurActions = () => {
    if (isDroplistTriggerFocused && !isDroplistOpen) {
      setFocusDroplistTrigger(false);

      ref.current?.blur();
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = e => {
    onKeyDown?.(e);

    const focusableCount = focusableNodeIds.length;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();

        setFocusIndex((prev = 0) => {
          if (prev >= focusableCount - 1) {
            return focusableCount - 1;
          }
          return prev + 1;
        });

        return;
      }
      case 'ArrowUp': {
        e.preventDefault();

        setFocusIndex((prev = 0) => {
          if (!prev) {
            return 0;
          }
          return prev - 1;
        });

        return;
      }
      case 'ArrowRight': {
        e.preventDefault();

        if (isExpanded || !isExpandable || disabled) {
          setFocusDroplistTrigger(true);
        }

        return;
      }
      case 'ArrowLeft': {
        e.preventDefault();

        if (isDroplistTriggerFocused) {
          setFocusDroplistTrigger(false);
          ref.current?.focus();
        }

        return;
      }
      case 'Escape': {
        ref.current?.blur();
        return;
      }
      case ' ':
      case 'Enter': {
        e.preventDefault();
        handleSelect();
        return;
      }
      default:
        return;
    }
  };

  const getNodeActions = nested ? parentActions : nodeActions;

  return (
    <div
      role='presentation'
      className={cn(styles.treeNode, className)}
      {...extractSupportProps(rest)}
      data-node-id={id}
    >
      {parentNode && (
        <TreeLine halfWidth={Boolean(nested)} horizontal visible={showLines} data-test-id={TEST_IDS.line} />
      )}

      {!parentNode && !nested && <TreeLine visible={false} />}

      {isExpandable && (
        <ButtonFunction
          size='xs'
          icon={<ChevronRightSVG />}
          loading={isLoading}
          onClick={onChevronClick}
          data-expanded={isExpanded || undefined}
          className={styles.treeNodeExpandButton}
          tabIndex={-1}
          data-test-id={TEST_IDS.chevron}
        />
      )}

      <div
        role='treeitem'
        aria-expanded={isExpanded}
        aria-selected={isSelectable ? isSelected : undefined}
        aria-disabled={disabled}
        data-multiselect={isMultiSelect || undefined}
        data-droplist-active={isDroplistOpen || isDroplistTriggerFocused || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={resetFocusPosition}
        tabIndex={tabIndexAvailable ? 0 : -1}
        className={styles.treeNodeContent}
        data-test-id={TEST_IDS.item}
        ref={ref}
      >
        {(isMultiSelect || showToggle) && (
          <div className={styles.treeNodeCheckboxWrap}>
            {isMultiSelect && (
              <Checkbox
                size='s'
                disabled={disabled}
                checked={isSelected}
                indeterminate={!isSelected && nestedNodesSelection?.someSelected}
                onChange={handleSelect}
                onClick={stopPropagationClick}
                data-test-id={TEST_IDS.checkbox}
                tabIndex={-1}
              />
            )}
            {showToggle && (
              <Radio
                size='s'
                checked={isSelected}
                disabled={disabled || (!isSelected && nestedNodesSelection?.someSelected)}
                data-test-id={TEST_IDS.radio}
                tabIndex={-1}
              />
            )}
          </div>
        )}

        {treeNodeIcon && (
          <div className={styles.treeNodeIcon} data-test-id={TEST_IDS.icon}>
            {treeNodeIcon}
          </div>
        )}

        <Typography.SansBodyM tag='div' className={styles.treeNodeTitle}>
          {typeof title === 'string' && <TruncateString text={title} data-test-id={TEST_IDS.title} />}
          {typeof title !== 'string' && title({ id, disabled, nested } as TreeNodeProps)}
        </Typography.SansBodyM>

        {getNodeActions && (
          <TreeNodeActions
            getNodeActions={getNodeActions}
            node={{
              id,
              title,
              disabled,
              nested,
            }}
            focusNode={handleFocus}
            onBlurActions={handleBlurActions}
            isDroplistTriggerFocused={isDroplistTriggerFocused}
            isDroplistOpen={isDroplistOpen}
            setDroplistOpen={setDroplistOpen}
          />
        )}
      </div>
    </div>
  );
}
