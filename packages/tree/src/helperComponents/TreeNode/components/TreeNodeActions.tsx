import { Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useRef } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { KebabSVG } from '@snack-uikit/icons';
import { Droplist, ItemProps } from '@snack-uikit/list';

import { TEST_IDS } from '../../../constants';
import { TreeNodeProps } from '../../../types';
import styles from '../styles.module.scss';
import { stopPropagationClick, stopPropagationFocus } from '../utils';

type TreeNodeActionsProps = {
  isDroplistOpen: boolean;
  setDroplistOpen: Dispatch<SetStateAction<boolean>>;
  getNodeActions(node: TreeNodeProps): ItemProps[];
  node: TreeNodeProps;
  isDroplistTriggerFocused: boolean;
  focusNode(): void;
  onBlurActions(): void;
};

export function TreeNodeActions({
  getNodeActions,
  isDroplistTriggerFocused,
  focusNode,
  isDroplistOpen,
  setDroplistOpen,
  onBlurActions,
  node,
}: TreeNodeActionsProps) {
  const droplistActions = getNodeActions(node);

  const localRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (localRef.current && isDroplistTriggerFocused) {
      localRef.current.focus();
    }
  }, [isDroplistTriggerFocused, localRef]);

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = e => {
    switch (e.key) {
      case 'Tab': {
        focusNode();
        setDroplistOpen(false);
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      case 'ArrowLeft': {
        if (isDroplistTriggerFocused) {
          focusNode();
          setDroplistOpen(false);
          e.stopPropagation();
        }
        return;
      }
      case ' ':
      case 'Enter': {
        e.stopPropagation();

        return;
      }
      case 'ArrowDown': {
        if (isDroplistTriggerFocused) {
          setDroplistOpen(true);
        }

        e.stopPropagation();
        return;
      }
      case 'ArrowUp': {
        setDroplistOpen(false);
        localRef.current?.focus();

        e.stopPropagation();
        return;
      }
      default:
        return;
    }
  };

  if (!droplistActions.length) {
    return null;
  }

  return (
    <div
      role='presentation'
      className={styles.treeNodeActions}
      data-focused={isDroplistTriggerFocused || undefined}
      onClick={stopPropagationClick}
      onKeyDown={handleKeyDown}
      onFocus={stopPropagationFocus}
    >
      <Droplist
        open={isDroplistOpen}
        onOpenChange={setDroplistOpen}
        items={droplistActions}
        closeDroplistOnItemClick
        placement='bottom-end'
        triggerElemRef={localRef}
        size='m'
      >
        <ButtonFunction
          size='xs'
          icon={<KebabSVG />}
          onBlur={onBlurActions}
          tabIndex={-1}
          data-test-id={TEST_IDS.droplistTrigger}
        />
      </Droplist>
    </div>
  );
}
