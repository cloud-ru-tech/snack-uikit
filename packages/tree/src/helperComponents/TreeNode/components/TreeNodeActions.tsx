import { Dispatch, KeyboardEventHandler, SetStateAction, useEffect } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { Droplist, ItemSingleProps } from '@snack-uikit/droplist';
import { KebabSVG } from '@snack-uikit/icons';

import { TEST_IDS } from '../../../constants';
import { TreeNodeProps } from '../../../types';
import styles from '../styles.module.scss';
import { stopPropagationClick } from '../utils';

type TreeNodeActionsProps = {
  isDroplistOpen: boolean;
  setDroplistOpen: Dispatch<SetStateAction<boolean>>;
  getNodeActions(node: TreeNodeProps): ItemSingleProps[];
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

  const {
    triggerElementRef,
    handleDroplistFocusLeave,
    handleDroplistItemKeyDown,
    handleTriggerKeyDown,
    handleDroplistItemClick,
    firstElementRefCallback,
  } = Droplist.useKeyboardNavigation<HTMLButtonElement>({ setDroplistOpen });

  useEffect(() => {
    if (triggerElementRef.current && isDroplistTriggerFocused) {
      triggerElementRef.current.focus();
    }
  }, [isDroplistTriggerFocused, triggerElementRef]);

  if (!droplistActions.length) {
    return null;
  }

  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
    handleTriggerKeyDown(e);

    switch (e.key) {
      case 'Tab': {
        e.preventDefault();
        return;
      }
      case 'ArrowLeft': {
        if (isDroplistTriggerFocused) {
          focusNode();
          setDroplistOpen(false);
        }
        return;
      }
      default:
        return;
    }
  };

  return (
    <div
      role='presentation'
      className={styles.treeNodeActions}
      data-focused={isDroplistTriggerFocused || undefined}
      onClick={stopPropagationClick}
    >
      <Droplist
        open={isDroplistOpen}
        onOpenChange={setDroplistOpen}
        onFocusLeave={handleDroplistFocusLeave}
        firstElementRefCallback={firstElementRefCallback}
        triggerRef={triggerElementRef}
        placement='bottom-end'
        triggerElement={
          <ButtonFunction
            size='xs'
            icon={<KebabSVG size={24} />}
            onKeyDown={handleKeyDown}
            onBlur={onBlurActions}
            tabIndex={-1}
            data-test-id={TEST_IDS.droplistTrigger}
          />
        }
      >
        {droplistActions.map(action => (
          <Droplist.ItemSingle
            key={action.option}
            {...action}
            onKeyDown={handleDroplistItemKeyDown}
            onClick={e => handleDroplistItemClick(e, action.onClick)}
            data-test-id={TEST_IDS.droplistAction}
          />
        ))}
      </Droplist>
    </div>
  );
}
