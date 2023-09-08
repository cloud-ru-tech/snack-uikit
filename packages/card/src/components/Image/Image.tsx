import { Mode } from './constants';
import styles from './styles.module.scss';

export type ImageProps = {
  /** Путь до картинки */
  src: string;
  /** Описание картинки */
  alt: string;
} /**  Image mode */ & (
  | { mode?: Mode.Little | Mode.Middle; hideFading?: never }
  | { mode: Mode.Background; hideFading?: boolean }
);

export function Image({ src, alt, mode = Mode.Little, hideFading }: ImageProps) {
  return <img src={src} alt={alt} data-mode={mode} className={styles.image} data-fading={!hideFading || undefined} />;
}

Image.modes = Mode;
