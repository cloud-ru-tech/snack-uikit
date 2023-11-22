import styles from '../Track/styles.module.scss';
import { Style } from './constants';

export type TrackLineProps = {
  style?: Style;
};

export function TrackLine({ style = Style.Default }: TrackLineProps) {
  return <div className={styles.trackLine} data-style={style} data-test-id={'timeline-track-line'} />;
}

TrackLine.styles = Style;
