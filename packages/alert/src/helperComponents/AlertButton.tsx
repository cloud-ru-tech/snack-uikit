import { MouseEvent, ReactElement } from 'react';

import { LinkProps } from '@snack-uikit/link';
import { Sun } from '@snack-uikit/loaders';

import { Size } from '../types';
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
  /** Управление состоянием загрузки */
  loading?: boolean;
  /** Размер */
  size?: Size;
};

export type AlertButtonProps = Omit<PrivateAlertButtonProps, 'appearance' | 'variant'>;

export function AlertButton({
  appearance,
  text,
  icon,
  onClick,
  variant = 'simple',
  dataTestId,
  loading = false,
  size = 's',
}: PrivateAlertButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={styles.alertButton}
      data-variant={variant}
      data-appearance={appearance}
      data-test-id={dataTestId || 'alert__action-button'}
      data-icon-only={!text || undefined}
      data-loading={loading}
      data-size={size}
    >
      {text && (
        <span className={styles.text} data-size={size}>
          {text}
        </span>
      )}
      {icon && (loading ? <Sun size='s' /> : <span className={styles.icon}>{icon}</span>)}
    </button>
  );
}
