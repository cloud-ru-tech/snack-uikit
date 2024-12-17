import { MouseEvent, Ref } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { usePaginationContext } from '../../contexts';
import styles from './styles.module.scss';

export type PageButtonProps = WithSupportProps<{
  label: number | string;
  activated?: boolean;
  onClick(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void;
  href?: string;
  setButtonRef?: Ref<HTMLButtonElement | HTMLAnchorElement>;
}>;

export function PageButton({ label, activated, onClick, href, setButtonRef, ...rest }: PageButtonProps) {
  const { size, variant } = usePaginationContext();

  if (variant === 'link') {
    return (
      <a
        role='button'
        className={styles.pageButton}
        onClick={onClick}
        ref={setButtonRef as Ref<HTMLAnchorElement>}
        data-size={size}
        {...extractSupportProps(rest)}
        data-activated={activated || undefined}
        href={href}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type='button'
      className={styles.pageButton}
      onClick={onClick}
      ref={setButtonRef as Ref<HTMLButtonElement>}
      data-size={size}
      {...extractSupportProps(rest)}
      data-activated={activated || undefined}
    >
      {label}
    </button>
  );
}
