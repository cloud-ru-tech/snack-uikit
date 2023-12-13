import cn from 'classnames';

import { extractSupportProps, ValueOf, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

const SIZE = {
  S: 's',
  XS: 'xs',
} as const;

export type ProgressBarProps = WithSupportProps<{
  /** Процент загрузки от 0 до 100 */
  progress: number;
  /** Размер */
  size: ValueOf<typeof SIZE>;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент индикатор загрузки */
export function ProgressBar({ progress, size, className, ...rest }: ProgressBarProps) {
  const roundedProgress = Math.max(Math.min(progress, 100), 0);

  return (
    <div className={cn(styles.progressBarContainer, className)} {...extractSupportProps(rest)} data-size={size}>
      <div
        className={styles.progressBarFiller}
        data-test-id='progress-bar-filler'
        style={{ '--progress': `${roundedProgress}%` }}
      />
    </div>
  );
}
