import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TrackItem, TrackItemProps } from '../helperComponents/TrackItem';
import { Position } from '../helperComponents/TrackItem/constants';
import { notReachable } from '../helpers';
import styles from './styles.module.scss';

type TimelineItem = Omit<TrackItemProps, 'fullWidth' | 'role'>;

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

const getRole = (index: number, total: number): TrackItemProps['role'] => {
  if (index < 1) {
    return TrackItem.roles.Start;
  }

  if (index < total - 1) {
    return TrackItem.roles.Center;
  }

  return TrackItem.roles.End;
};

const getContentPosition = (
  contentPosition: Position,
  index: number,
  itemPosition?: TrackItemProps['contentPosition'],
  alternate?: boolean,
): TrackItemProps['contentPosition'] => {
  if (itemPosition) {
    return itemPosition;
  }

  if (!alternate) {
    return contentPosition;
  }

  switch (contentPosition) {
    case Position.Right:
      return index % 2 ? TrackItem.contentPositions.Left : TrackItem.contentPositions.Right;
    case Position.Left:
      return index % 2 ? TrackItem.contentPositions.Right : TrackItem.contentPositions.Left;

    default:
      return notReachable(contentPosition);
  }
};

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
            {...itemProps}
          />
        ))}
      </div>
    </div>
  );
}

Timeline.contentPositions = TrackItem.contentPositions;
Timeline.dotVariants = TrackItem.dotVariants;
Timeline.dotAppearances = TrackItem.dotAppearances;
Timeline.lineStyles = TrackItem.lineStyles;
