import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type PageSliderButtonProps = WithSupportProps<{
  activated?: boolean;
  onClick(): void;
}>;

export function PageSliderButton({ activated, onClick, ...rest }: PageSliderButtonProps) {
  return (
    <button
      className={styles.pageButtonSlider}
      onClick={onClick}
      {...extractSupportProps(rest)}
      data-activated={activated || undefined}
    >
      <div className={styles.pageButtonSliderDot} />
    </button>
  );
}
