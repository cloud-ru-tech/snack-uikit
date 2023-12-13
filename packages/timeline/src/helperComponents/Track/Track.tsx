import { notReachable } from '../../helpers';
import { TrackDot, TrackDotProps } from '../TrackDot';
import { TrackLine, TrackLineProps } from '../TrackLine';
import { ROLE } from './constants';
import styles from './styles.module.scss';
import { Role } from './types';

export type TrackProps = {
  role: Role;
  lineStyle?: TrackLineProps['style'];
  dotVariant?: TrackDotProps['variant'];
  dotAppearance?: TrackDotProps['appearance'];
};

export function Track({ role, lineStyle, dotVariant = TrackDot.variants.Default, dotAppearance }: TrackProps) {
  switch (role) {
    case ROLE.Start:
      return (
        <div
          className={styles.track}
          data-position={role}
          data-dot-variant={dotVariant}
          data-test-id={'timeline-track'}
        >
          <TrackDot variant={dotVariant} appearance={dotAppearance} />
          <TrackLine style={lineStyle} />
        </div>
      );

    case ROLE.Center:
      return (
        <div
          className={styles.track}
          data-position={role}
          data-dot-variant={dotVariant}
          data-test-id={'timeline-track'}
        >
          <div className={styles.trackLinePre}>
            <TrackLine style={TrackLine.styles.Default} />
          </div>
          <TrackDot variant={dotVariant} appearance={dotAppearance} />
          <TrackLine style={lineStyle} />
        </div>
      );

    case ROLE.End:
      return (
        <div
          className={styles.track}
          data-position={role}
          data-dot-variant={dotVariant}
          data-test-id={'timeline-track'}
        >
          <div className={styles.trackLinePre}>
            <TrackLine style={TrackLine.styles.Default} />
          </div>
          <TrackDot variant={dotVariant} appearance={dotAppearance} />
        </div>
      );

    default:
      return notReachable(role);
  }
}

Track.roles = ROLE;
Track.dotVariants = TrackDot.variants;
Track.dotAppearances = TrackDot.appearances;
Track.lineStyles = TrackLine.styles;
