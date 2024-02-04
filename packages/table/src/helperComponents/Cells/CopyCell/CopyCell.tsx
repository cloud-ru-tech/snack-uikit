import { TruncateString } from '@snack-uikit/truncate-string';

import { CopyButton } from './components';
import styles from './styles.module.scss';

export type CopyCellProps = {
  value?: string | number;
};

export function CopyCell({ value }: CopyCellProps) {
  return (
    <div className={styles.copyCell}>
      <TruncateString text={String(value)} maxLines={1} />
      <CopyButton valueToCopy={value} className={styles.copyButton} />
    </div>
  );
}
