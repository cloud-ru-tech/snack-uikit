import { KeyboardEventHandler, MouseEvent, MouseEventHandler, useState } from 'react';

import { ButtonSimple, ButtonSimpleProps } from '@snack-ui/button';
import { Droplist, ItemSingleProps } from '@snack-ui/droplist';

import { useDroplistKeyboardNavigation } from '../../../../hooks/useDroplistKeyboardNavigation';
import { TEST_IDS } from '../../constants';

type NotificationPanelSettingsDroplistProps = {
  actions: ItemSingleProps[];
  button: ButtonSimpleProps;
};

export function NotificationPanelSettingsDroplist({ actions, button }: NotificationPanelSettingsDroplistProps) {
  const [isDroplistOpen, setDroplistOpen] = useState(false);

  const { triggerButtonRef, handleTriggerButtonKeyDown, firstElementRefCallback, handleDroplistFocusLeave } =
    useDroplistKeyboardNavigation({ setDroplistOpen });

  const handleButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
    button.onKeyDown?.(e);

    handleTriggerButtonKeyDown(e);
  };

  const handleActionClick = (e: MouseEvent<HTMLButtonElement>, cb?: MouseEventHandler<HTMLButtonElement>) => {
    setDroplistOpen(false);

    cb?.(e);
  };

  return (
    <Droplist
      open={isDroplistOpen}
      onOpenChange={setDroplistOpen}
      firstElementRefCallback={firstElementRefCallback}
      onFocusLeave={handleDroplistFocusLeave}
      useScroll
      triggerRef={triggerButtonRef}
      triggerElement={<ButtonSimple {...button} onKeyDown={handleButtonKeyDown} />}
      placement={Droplist.placements.BottomEnd}
      data-test-id={TEST_IDS.settings.droplist}
    >
      {actions.map(action => (
        <Droplist.ItemSingle
          {...action}
          key={action.option}
          onClick={e => handleActionClick(e, action.onClick)}
          data-test-id={TEST_IDS.settings.droplistAction}
        />
      ))}
    </Droplist>
  );
}
