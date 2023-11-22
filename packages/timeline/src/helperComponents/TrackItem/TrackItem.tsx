import { ReactNode } from 'react';

import { notReachable } from '../../helpers';
import { Track, TrackProps } from '../Track';
import { Position } from './constants';
import styles from './styles.module.scss';

export type TrackItemProps = {
  content: ReactNode;
  contentPosition?: Position;
  role: TrackProps['role'];
  opposite?: ReactNode;
  lineStyle?: TrackProps['lineStyle'];
  dotVariant?: TrackProps['dotVariant'];
  dotAppearance?: TrackProps['dotAppearance'];
  alternateMode?: boolean;
};

export function TrackItem({
  content,
  role,
  contentPosition = Position.Right,
  opposite,
  lineStyle,
  dotVariant,
  dotAppearance,
  alternateMode,
}: TrackItemProps) {
  const showOppositeBlock = Boolean(opposite || alternateMode);

  switch (contentPosition) {
    case Position.Right:
      return (
        <div className={styles.trackItem} data-test-id={'timeline-track-item'}>
          {showOppositeBlock && (
            <div className={styles.opposite} data-test-id={'timeline-track-item-opposite'}>
              {opposite || null}
            </div>
          )}
          <Track role={role} lineStyle={lineStyle} dotVariant={dotVariant} dotAppearance={dotAppearance} />
          <div className={styles.content}>{content}</div>
        </div>
      );

    case Position.Left:
      return (
        <div className={styles.trackItem} data-test-id={'timeline-track-item'}>
          <div className={styles.content}>{content}</div>
          <Track role={role} lineStyle={lineStyle} dotVariant={dotVariant} dotAppearance={dotAppearance} />
          {showOppositeBlock && (
            <div className={styles.opposite} data-test-id={'timeline-track-item-opposite'}>
              {opposite || null}
            </div>
          )}
        </div>
      );

    default:
      return notReachable(contentPosition);
  }
}

TrackItem.roles = Track.roles;
TrackItem.contentPositions = Position;
TrackItem.dotVariants = Track.dotVariants;
TrackItem.dotAppearances = Track.dotAppearances;
TrackItem.lineStyles = Track.lineStyles;
