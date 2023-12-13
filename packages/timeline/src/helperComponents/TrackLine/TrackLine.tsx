import styles from '../Track/styles.module.scss';
import { STYLE } from './constants';
import { Style } from './types';

export type TrackLineProps = {
  style?: Style;
};

export function TrackLine({ style = STYLE.Default }: TrackLineProps) {
  return <div className={styles.trackLine} data-style={style} data-test-id={'timeline-track-line'} />;
}

TrackLine.styles = STYLE;
