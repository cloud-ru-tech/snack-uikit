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
      data-activated={activated || undefined}
      onClick={onClick}
      {...extractSupportProps(rest)}
    >
      <div className={styles.pageButtonSliderDot} />
    </button>
  );
}
