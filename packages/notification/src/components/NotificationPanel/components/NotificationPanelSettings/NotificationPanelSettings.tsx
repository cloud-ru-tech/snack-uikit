import { ButtonSupport, ButtonSupportProps } from '@snack-ui/button';
import { ItemSingleProps } from '@snack-ui/droplist';
import { KebabSVG } from '@snack-ui/icons';

import { TEST_IDS } from '../../constants';
import { NotificationPanelSettingsDroplist } from './NotificationPanelSettingsDroplist';

export type NotificationPanelSettingsProps = {
  /** Дополнительные действия панели */
  actions?: Pick<
    ItemSingleProps,
    'option' | 'onClick' | 'disabled' | 'icon' | 'description' | 'caption' | 'tagLabel'
  >[];
  /** Кнопка дополнительного действия панели */
  button: Omit<ButtonSupportProps, 'label' | 'iconPosition' | 'type' | 'size' | 'data-test-id'>;
};

export function NotificationPanelSettings({ actions, button }: NotificationPanelSettingsProps) {
  const buttonProps: ButtonSupportProps = {
    ...button,
    size: ButtonSupport.sizes.S,
    icon: button.icon || <KebabSVG />,
    'data-test-id': TEST_IDS.settings.droplistTrigger,
  };

  if (!actions?.length) {
    return <ButtonSupport {...buttonProps} />;
  }

  return <NotificationPanelSettingsDroplist actions={actions} button={buttonProps} />;
}
