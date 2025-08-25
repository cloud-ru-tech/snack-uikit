import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TrackItem, TrackItemProps } from '../helperComponents/TrackItem';
import { getContentPosition, getRole } from './helpers';
import styles from './styles.module.scss';

export type TimelineItem = Omit<TrackItemProps, 'fullWidth' | 'role'>;

export type TimelineProps = WithSupportProps<{
  /** Пункты таймлайна */
  items: TimelineItem[];
  /** Положение контента */
  contentPosition?: TrackItemProps['contentPosition'];
  /** Перемешать положение контента  */
  alternate?: boolean;
  /** Сделать таймлайн во всю ширину */
  fullWidth?: boolean;
  /** CSS-класс для элемента с контентом */
  className?: string;
}>;

export function Timeline({
  items,
  fullWidth,
  contentPosition = TrackItem.contentPositions.Right,
  alternate,
  className,
  ...rest
}: TimelineProps) {
  return (
    <div className={styles.timelineWrapper} data-full-width={fullWidth || undefined} data-test-id={'timeline-track'}>
      <div className={cn(styles.timeline, className)} {...extractSupportProps(rest)}>
        {items.map(({ contentPosition: itemContentPosition, ...itemProps }, index) => (
          <TrackItem
            key={index}
            contentPosition={getContentPosition(contentPosition, index, itemContentPosition, alternate)}
            role={getRole(index, items.length)}
            alternateMode={alternate}
            showLines={items.length > 1}
            {...itemProps}
          />
        ))}
      </div>
    </div>
  );
}
