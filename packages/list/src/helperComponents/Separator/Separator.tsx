import { Divider } from '@snack-uikit/divider';

import styles from './styles.module.scss';

export type SeparatorProps = {
  label?: string;
  mode?: 'primary' | 'secondary';
  divider?: boolean;
  size?: 's' | 'm' | 'l';
};

export function Separator({ label, divider, mode = 'secondary', size = 's' }: SeparatorProps) {
  if (label) {
    return (
      <div className={styles.separatorWithLabel} data-size={size}>
        <span className={styles.label} data-mode={mode}>
          {label}
        </span>
        {divider && <Divider weight={mode === 'primary' ? 'regular' : 'light'} />}
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
