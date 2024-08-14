import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';
import { Appearance, Placement } from './types';
import { getOffsetStyle } from './utils';

export type HotSpotProps = WithSupportProps<{
  /**
   * Внешний вид
   * @default 'primary
   */
  appearance?: Appearance;
  /**
   * Анимация пульсации
   * @default true
   */
  pulse?: boolean;
  /** Время анимации пульсации  */
  duration?: string;
  /**
   * Положение относительно children.
   * @default right-top
   */
  placement?: Placement;
  /** Рендер функция для dot */
  dotRender?(dot: ReactNode): ReactNode;
  /** Вложенный контент  */
  children?: ReactNode;
  /** Смещение dot по оси X (ось направлена вправо) */
  offsetX?: number | string;
  /** Смещение dot по оси Y (ось направлена вниз) */
  offsetY?: number | string;
  /** Управление состоянием отрисовки */
  enabled?: boolean;

  className?: string;
  wrapperClassName?: string;
}>;

export function HotSpot({
  dotRender,
  children,
  offsetX = 0,
  offsetY = 0,
  placement = 'right-top',
  duration = '2s',
  pulse = true,
  enabled = true,
  appearance = 'primary',
  className,
  wrapperClassName,
  ...rest
}: HotSpotProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  const dotJSX = (
    <div
      className={cn(styles.hotSpotDot, className)}
      data-appearance={appearance}
      data-pulse={pulse || undefined}
      data-test-id={TEST_IDS.dot}
    />
  );

  if (!children) {
    return (
      <span {...extractSupportProps(rest)} className={styles.hotSpotDotContainer}>
        {dotRender ? dotRender(dotJSX) : dotJSX}
      </span>
    );
  }

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.wrapper, wrapperClassName)}
      style={{
        '--offset-x': getOffsetStyle(offsetX),
        '--offset-y': getOffsetStyle(offsetY),
        '--duration': duration,
      }}
    >
      {children}
      <span className={styles.dotPlacementContainer} data-placement={placement} data-test-id={TEST_IDS.dotContainer}>
        <span className={styles.hotSpotDotContainer}>{dotRender ? dotRender(dotJSX) : dotJSX}</span>
      </span>
    </div>
  );
}
