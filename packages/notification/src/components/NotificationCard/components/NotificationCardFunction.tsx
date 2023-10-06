import { Dispatch, MouseEvent, MouseEventHandler, SetStateAction } from 'react';

import { ButtonFunction } from '@snack-ui/button';
import { Droplist, DroplistProps } from '@snack-ui/droplist';
import { KebabSVG } from '@snack-ui/icons';

import { useDroplistKeyboardNavigation } from '../../../hooks/useDroplistKeyboardNavigation';
import { TEST_IDS } from '../constants';
import { NotificationCardProps } from '../NotificationCard';
import styles from '../styles.module.scss';

export type NotificationCardFunctionProps = Required<Pick<NotificationCardProps, 'actions'>> &
  Required<Pick<DroplistProps, 'open'>> & {
    setDroplistOpen: Dispatch<SetStateAction<boolean>>;
  };

export function NotificationCardFunction({ actions, open, setDroplistOpen }: NotificationCardFunctionProps) {
  const { triggerButtonRef, firstElementRefCallback, handleDroplistFocusLeave, handleTriggerButtonKeyDown } =
    useDroplistKeyboardNavigation({ setDroplistOpen });

  const handleActionClick = (e: MouseEvent, cb?: MouseEventHandler) => {
    setDroplistOpen(false);

    cb?.(e);
  };

  return (
    <div className={styles.notificationCardFunction} data-test-id={TEST_IDS.actions.wrapper}>
      <Droplist
        open={open}
        onOpenChange={setDroplistOpen}
        placement={Droplist.placements.BottomEnd}
        firstElementRefCallback={firstElementRefCallback}
        onFocusLeave={handleDroplistFocusLeave}
        triggerRef={triggerButtonRef}
        useScroll
        triggerElement={
          <ButtonFunction
            size={ButtonFunction.sizes.S}
            icon={<KebabSVG />}
            onKeyDown={handleTriggerButtonKeyDown}
            data-test-id={TEST_IDS.actions.droplistTrigger}
          />
        }
        data-test-id={TEST_IDS.actions.droplist}
      >
        {actions.map(action => (
          <Droplist.ItemSingle
            {...action}
            key={action.option}
            onClick={e => handleActionClick(e, action.onClick)}
            data-test-id={TEST_IDS.actions.droplistAction}
          />
        ))}
      </Droplist>
    </div>
  );
}
