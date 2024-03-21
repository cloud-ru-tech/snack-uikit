import { Divider } from '@snack-uikit/divider';
import { TruncateString, TruncateStringProps } from '@snack-uikit/truncate-string';

import styles from './styles.module.scss';

export type SeparatorProps = {
  label?: string;
  truncate?: {
    variant?: TruncateStringProps['variant'];
  };
  mode?: 'primary' | 'secondary';
  divider?: boolean;
  size?: 's' | 'm' | 'l';
};

export function Separator({ label, truncate, divider, mode = 'secondary', size = 's' }: SeparatorProps) {
  if (label) {
    return (
      <div className={styles.separatorWithLabel} data-size={size}>
        <span className={styles.label} data-mode={mode}>
          <TruncateString variant={truncate?.variant} text={label} maxLines={1} />
        </span>

        {divider && <Divider weight={mode === 'primary' ? 'regular' : 'light'} className={styles.divider} />}
      </div>
    );
  }

  if (divider) {
    return (
      <div className={styles.separatorWithoutLabel} data-size={size}>
        <Divider weight='regular' />
      </div>
    );
  }

  return null;
}
