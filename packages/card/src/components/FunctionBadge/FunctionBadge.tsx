import { MouseEvent, ReactNode, useCallback, useContext, useLayoutEffect, useState } from 'react';

import { Droplist, ItemSingleProps } from '@snack-uikit/droplist';
import { KebabSVG } from '@snack-uikit/icons';

import { TEST_IDS } from '../../constants';
import { FunctionBadgeContext } from '../../context';
import styles from './styles.module.scss';

export type FunctionBadgeProps = {
  /** Иконка */
  icon?: ReactNode;
  /** Вложенные опции */
  options: Pick<ItemSingleProps, 'tagLabel' | 'onClick' | 'option' | 'icon' | 'disabled' | 'description' | 'caption'>[];
};

export function FunctionBadge({ icon, options }: FunctionBadgeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { setVisible } = useContext(FunctionBadgeContext);

  useLayoutEffect(() => {
    setVisible && setVisible(isOpen);
  }, [isOpen, setVisible]);

  const {
    firstElementRefCallback,
    triggerElementRef,
    handleDroplistFocusLeave,
    handleDroplistItemClick,
    handleTriggerKeyDown,
    handleDroplistItemKeyDown,
  } = Droplist.useKeyboardNavigation<HTMLButtonElement>({ setDroplistOpen: setIsOpen });

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(isOpen => !isOpen);
  }, []);

  return (
    <span className={styles.wrapper}>
      <Droplist
        open={isOpen}
        onOpenChange={setIsOpen}
        firstElementRefCallback={firstElementRefCallback}
        widthStrategy={Droplist.widthStrategies.Gte}
        useScroll
        onFocusLeave={handleDroplistFocusLeave}
        data-test-id={TEST_IDS.droplist}
        triggerClassName={styles.triggerClassName}
        placement={Droplist.placements.BottomEnd}
        triggerElement={
          <button
            data-test-id={TEST_IDS.functionBadge}
            className={styles.button}
            onKeyDown={handleTriggerKeyDown}
            onClick={onClick}
            ref={triggerElementRef}
          >
            {icon || <KebabSVG />}
          </button>
        }
      >
        {options.map(item => (
          <Droplist.ItemSingle
            {...item}
            key={item.option}
            className={styles.item}
            data-test-id={TEST_IDS.option}
            onClick={e => {
              handleDroplistItemClick(e, item.onClick);
            }}
            onKeyDown={handleDroplistItemKeyDown}
          />
        ))}
      </Droplist>
    </span>
  );
}
