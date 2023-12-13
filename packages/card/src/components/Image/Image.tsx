import { MODE } from './constants';
import styles from './styles.module.scss';

export type ImageProps = {
  /** Путь до картинки */
  src: string;
  /** Описание картинки */
  alt: string;
} /**  Image mode */ & (
  | { mode?: typeof MODE.Little | typeof MODE.Middle; hideFading?: never }
  | { mode: typeof MODE.Background; hideFading?: boolean }
);

export function Image({ src, alt, mode = MODE.Little, hideFading }: ImageProps) {
  return <img src={src} alt={alt} data-mode={mode} className={styles.image} data-fading={!hideFading || undefined} />;
}
