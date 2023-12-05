import { Dispatch, SetStateAction } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { Droplist, DroplistProps } from '@snack-uikit/droplist';
import { KebabSVG } from '@snack-uikit/icons';

import { TEST_IDS } from '../constants';
import { NotificationCardProps } from '../NotificationCard';
import styles from '../styles.module.scss';

export type NotificationCardFunctionProps = Required<Pick<NotificationCardProps, 'actions'>> &
  Required<Pick<DroplistProps, 'open'>> & {
    setDroplistOpen: Dispatch<SetStateAction<boolean>>;
  };

export function NotificationCardFunction({ actions, open, setDroplistOpen }: NotificationCardFunctionProps) {
  const {
    firstElementRefCallback,
    triggerElementRef,
    handleDroplistFocusLeave,
    handleTriggerKeyDown,
    handleDroplistItemKeyDown,
    handleDroplistItemClick,
  } = Droplist.useKeyboardNavigation<HTMLButtonElement>({
    setDroplistOpen,
  });

  return (
    <div className={styles.notificationCardFunction} data-test-id={TEST_IDS.actions.wrapper}>
      <Droplist
        open={open}
        onOpenChange={setDroplistOpen}
        placement={Droplist.placements.BottomEnd}
        firstElementRefCallback={firstElementRefCallback}
        onFocusLeave={handleDroplistFocusLeave}
        triggerRef={triggerElementRef}
        useScroll
        triggerElement={
          <ButtonFunction
            size={ButtonFunction.sizes.S}
            icon={<KebabSVG />}
            onKeyDown={handleTriggerKeyDown}
            data-test-id={TEST_IDS.actions.droplistTrigger}
          />
        }
        data-test-id={TEST_IDS.actions.droplist}
      >
        {actions.map(action => (
          <Droplist.ItemSingle
            {...action}
            key={action.option}
            onClick={e => handleDroplistItemClick(e, action.onClick)}
            data-test-id={TEST_IDS.actions.droplistAction}
            onKeyDown={handleDroplistItemKeyDown}
          />
        ))}
      </Droplist>
    </div>
  );
}
