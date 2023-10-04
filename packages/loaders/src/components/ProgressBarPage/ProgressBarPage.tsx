import { useNProgress } from '@tanem/react-nprogress';
import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import classNames from './styles.module.scss';

export type ProgressBarPageProps = WithSupportProps<{
  /** Включен/выключен */
  inProgress: boolean;
  /** Скорость анимации */
  animationDuration?: number;
  /** Время между прогрессом */
  incrementDuration?: number;
  /** Минимальное значение прогресс бара от 0 до 1 */
  minimum?: number;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент индикатор загрузки страницы */
export function ProgressBarPage({
  animationDuration = 200,
  incrementDuration = 800,
  inProgress,
  minimum,
  className,
  ...rest
}: ProgressBarPageProps) {
  const {
    progress,
    isFinished,
    animationDuration: animation,
  } = useNProgress({
    animationDuration,
    incrementDuration,
    isAnimating: inProgress,
    minimum,
  });

  if (isFinished) {
    return null;
  }

  return (
    <div className={cn(classNames.progressBarPageContainer, className)} {...extractSupportProps(rest)}>
      <div
        className={classNames.progressBarPageFiller}
        style={{ '--progress': progress, '--animation-duration': `${animation}ms` }}
      />
    </div>
  );
}
