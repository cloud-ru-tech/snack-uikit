import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import classNames from './styles.module.scss';

enum Size {
  S = 's',
  XS = 'xs',
}

export type ProgressBarProps = WithSupportProps<{
  /** Процент загрузки от 0 до 100 */
  progress: number;
  /** Размер */
  size: Size;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент индикатор загрузки */
export function ProgressBar({ progress, size, className, ...rest }: ProgressBarProps) {
  const roundedProgress = Math.max(Math.min(progress, 100), 0);

  return (
    <div className={cn(classNames.progressBarContainer, className)} {...extractSupportProps(rest)} data-size={size}>
      <div
        className={classNames.progressBarFiller}
        data-test-id='progress-bar-filler'
        style={{ '--progress': `${roundedProgress}%` }}
      />
    </div>
  );
}

ProgressBar.sizes = Size;
