import { useRef, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { Droplist, ItemSingleProps } from '@snack-uikit/droplist';
import { KebabSVG } from '@snack-uikit/icons';

import { TEST_IDS } from '../../constants';
import { useHandlers } from './hooks';
import styles from './styles.module.scss';

export type MoreActionsProps = {
  moreActions: Pick<
    ItemSingleProps,
    'tagLabel' | 'onClick' | 'option' | 'icon' | 'disabled' | 'description' | 'caption'
  >[];
};

export function MoreActions({ moreActions }: MoreActionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [needsFocus, setNeedsFocus] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { onKeyDown, onFocusLeave, firstElementRefCallback } = useHandlers({
    triggerRef,
    setIsOpen,
    needsFocus,
    setNeedsFocus,
  });

  return (
    <Droplist
      open={isOpen}
      data-test-id={TEST_IDS.droplist}
      onOpenChange={setIsOpen}
      placement='bottom-end'
      onFocusLeave={onFocusLeave}
      firstElementRefCallback={firstElementRefCallback}
      useScroll
      triggerRef={triggerRef}
      triggerElement={
        <ButtonFunction
          icon={<KebabSVG size={24} />}
          size='m'
          onKeyDown={onKeyDown}
          data-test-id={TEST_IDS.moreActionsButton}
        />
      }
      size='s'
    >
      {moreActions.map(item => (
        <Droplist.ItemSingle
          {...item}
          key={item.option}
          className={styles.item}
          onClick={e => {
            item.onClick?.(e);
            setIsOpen(false);
            setNeedsFocus(false);
            e.stopPropagation();
          }}
          data-test-id={TEST_IDS.option}
        />
      ))}
    </Droplist>
  );
}
