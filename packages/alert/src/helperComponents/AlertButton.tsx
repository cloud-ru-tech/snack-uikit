import { MouseEvent, ReactElement } from 'react';

import { LinkProps } from '@snack-uikit/link';

import styles from './styles.module.scss';

type PrivateAlertButtonProps = {
  /** Внешний вид */
  appearance?: LinkProps['appearance'] | 'invert-neutral';
  /** Текст кнопки */
  text?: string;
  /** Иконка в кнопке */
  icon?: ReactElement;
  /** Вариант отображения */
  variant?: 'simple' | 'tonal';
  /** Колбек клика */
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
  /** Дата тест айди */
  dataTestId?: string;
};

export type AlertButtonProps = Omit<PrivateAlertButtonProps, 'appearance' | 'variant'>;

export function AlertButton({
  appearance,
  text,
  icon,
  onClick,
  variant = 'simple',
  dataTestId,
}: PrivateAlertButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.alertButton}
      data-variant={variant}
      data-appearance={appearance}
      data-test-id={dataTestId || 'alert__action-button'}
      data-icon-only={!text || undefined}
    >
      {text && <span className={styles.text}>{text}</span>}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}
