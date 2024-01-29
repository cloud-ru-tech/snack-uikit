import { ReactElement, useState } from 'react';

import { ButtonSimple, ButtonSimpleProps } from '@snack-uikit/button';
import { BaseItemProps, Droplist } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';

import { TEST_IDS } from '../../constants';

export type Action = {
  icon?: ReactElement;
  tagLabel?: string;
} & Pick<BaseItemProps, 'content' | 'disabled' | 'onClick'>;

type NotificationPanelSettingsDroplistProps = {
  actions: Action[];
  button: ButtonSimpleProps;
};

export function NotificationPanelSettingsDroplist({ actions, button }: NotificationPanelSettingsDroplistProps) {
  const [isDroplistOpen, setDroplistOpen] = useState(false);

  return (
    <Droplist
      trigger='clickAndFocusVisible'
      open={isDroplistOpen}
      onOpenChange={setDroplistOpen}
      scroll
      placement='bottom-end'
      data-test-id={TEST_IDS.settings.droplist}
      items={actions.map(({ icon, content, tagLabel, disabled, onClick }) => ({
        onClick: e => {
          setDroplistOpen(false);
          onClick?.(e);
        },
        disabled,
        content,
        beforeContent: icon,
        afterContent: tagLabel ? <Tag label={tagLabel} /> : undefined,
        'data-test-id': TEST_IDS.settings.droplistAction,
      }))}
    >
      <ButtonSimple {...button} />
    </Droplist>
  );
}
