import { ButtonSimple, ButtonSimpleProps } from '@snack-uikit/button';
import { KebabSVG } from '@snack-uikit/icons';

import { TEST_IDS } from '../../constants';
import { Action, NotificationPanelSettingsDroplist } from './NotificationPanelSettingsDroplist';

export type NotificationPanelSettingsProps = {
  /** Дополнительные действия панели */
  actions?: Action[];
  /** Кнопка дополнительного действия панели */
  button: Omit<ButtonSimpleProps, 'label' | 'type' | 'size' | 'data-test-id'>;
};

export function NotificationPanelSettings({ actions, button }: NotificationPanelSettingsProps) {
  const buttonProps: ButtonSimpleProps = {
    ...button,
    size: 's',
    icon: button.icon || <KebabSVG />,
    'data-test-id': TEST_IDS.settings.droplistTrigger,
  };

  if (!actions?.length) {
    return <ButtonSimple {...buttonProps} />;
  }

  return <NotificationPanelSettingsDroplist actions={actions} button={buttonProps} />;
}
