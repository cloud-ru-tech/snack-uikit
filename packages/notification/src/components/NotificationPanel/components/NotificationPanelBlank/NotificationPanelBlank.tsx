import cn from 'classnames';

import { InfoBlock, InfoBlockProps } from '@snack-uikit/info-block';

import styles from './styles.module.scss';

export type NotificationPanelBlankProps = Omit<InfoBlockProps, 'footer' | 'align' | 'size'>;

/** Компонента для "заглушки" вместо карточек в панели */
export function NotificationPanelBlank({ icon, className, ...props }: NotificationPanelBlankProps) {
  return (
    <>
      <InfoBlock
        {...props}
        icon={icon ? { ...icon, appearance: icon.appearance ?? 'neutral' } : undefined}
        size='l'
        align='vertical'
        className={cn(styles.notificationPanelBlank, className)}
      />
    </>
  );
}
