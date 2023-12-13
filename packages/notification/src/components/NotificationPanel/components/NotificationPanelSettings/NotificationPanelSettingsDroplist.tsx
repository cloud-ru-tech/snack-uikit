import { useState } from 'react';

import { ButtonSimple, ButtonSimpleProps } from '@snack-uikit/button';
import { Droplist, ItemSingleProps } from '@snack-uikit/droplist';

import { TEST_IDS } from '../../constants';

type NotificationPanelSettingsDroplistProps = {
  actions: ItemSingleProps[];
  button: ButtonSimpleProps;
};

export function NotificationPanelSettingsDroplist({ actions, button }: NotificationPanelSettingsDroplistProps) {
  const [isDroplistOpen, setDroplistOpen] = useState(false);

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
    <Droplist
      open={isDroplistOpen}
      onOpenChange={setDroplistOpen}
      firstElementRefCallback={firstElementRefCallback}
      onFocusLeave={handleDroplistFocusLeave}
      useScroll
      triggerRef={triggerElementRef}
      triggerElement={<ButtonSimple {...button} onKeyDown={handleTriggerKeyDown} />}
      placement='bottom-end'
      data-test-id={TEST_IDS.settings.droplist}
    >
      {actions.map(action => (
        <Droplist.ItemSingle
          {...action}
          key={action.option}
          onClick={e => handleDroplistItemClick(e, action.onClick)}
          onKeyDown={handleDroplistItemKeyDown}
          data-test-id={TEST_IDS.settings.droplistAction}
        />
      ))}
    </Droplist>
  );
}
