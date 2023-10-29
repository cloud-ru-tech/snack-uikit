import { Ref } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type PageButtonProps = WithSupportProps<{
  label: number | string;
  activated?: boolean;
  onClick(): void;
  setButtonRef?: Ref<HTMLButtonElement>;
}>;

export function PageButton({ label, activated, onClick, setButtonRef, ...rest }: PageButtonProps) {
  return (
    <button
      className={styles.pageButton}
      onClick={onClick}
      ref={setButtonRef}
      {...extractSupportProps(rest)}
      data-activated={activated || undefined}
    >
      {label}
    </button>
  );
}
