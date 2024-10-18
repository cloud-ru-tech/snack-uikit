import { Divider as UIKitDivider } from '@snack-uikit/divider';

import styles from './styles.module.scss';

export function Divider() {
  return (
    <div className={styles.wrapper}>
      <UIKitDivider />
    </div>
  );
}
