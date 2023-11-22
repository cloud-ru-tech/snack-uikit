import { Appearance, Variant } from './constants';
import styles from './styles.module.scss';

export type TrackDotProps = {
  variant?: Variant;
  appearance?: Appearance;
};

export function TrackDot({ variant = Variant.Default, appearance = Appearance.Neutral }: TrackDotProps) {
  return (
    <div className={styles.trackDotContainer} data-test-id={'timeline-track-dot'}>
      <div className={styles.trackDot} data-variant={variant} data-appearance={appearance} />
    </div>
  );
}

TrackDot.variants = Variant;
TrackDot.appearances = Appearance;
