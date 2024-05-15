import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { MODE } from './constants';
import styles from './styles.module.scss';

export type ImageProps = WithSupportProps<
  {
    /** Путь до картинки */
    src: string;
    /** Описание картинки */
    alt: string;
  } /**  Image mode */ & (
    | { mode?: typeof MODE.Little | typeof MODE.Middle; hideFading?: never }
    | { mode: typeof MODE.Background; hideFading?: boolean }
  )
>;

export function Image({ src, alt, mode = MODE.Little, hideFading, ...rest }: ImageProps) {
  return (
    <img
      {...extractSupportProps(rest)}
      src={src}
      alt={alt}
      data-mode={mode}
      className={styles.image}
      data-fading={!hideFading || undefined}
    />
  );
}
