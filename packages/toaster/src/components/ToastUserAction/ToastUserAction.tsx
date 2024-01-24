import cn from 'classnames';
import { MouseEvent, useMemo } from 'react';
import { ToastContentProps as RtToastContentProps } from 'react-toastify';

import { Link } from '@snack-uikit/link';
import { Sun } from '@snack-uikit/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TOAST_USER_ACTION_TEST_IDS } from '../../testIds';
import { ToasterId } from '../../types';
import styles from './styles.module.scss';
import { ToastUserActionAppearance } from './types';
import { getIcon } from './utils';

export type ToastUserActionLink = {
  text: string;
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
};

export type ToastUserActionProps = Partial<RtToastContentProps> &
  WithSupportProps<{
    label: string;
    appearance?: ToastUserActionAppearance;
    link?: ToastUserActionLink;
    className?: string;
    loading?: boolean;
    onClose?(id?: ToasterId): void;
  }>;

export function ToastUserAction({
  appearance = 'neutral',
  label,
  link,
  className,
  loading = false,
  ...rest
}: ToastUserActionProps) {
  const icon = useMemo(() => getIcon(appearance), [appearance]);

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)} data-appearance={appearance}>
      {loading ? (
        <span className={styles.loader} data-test-id={TOAST_USER_ACTION_TEST_IDS.loader}>
          <Sun size='s' />
        </span>
      ) : (
        icon && (
          <span className={styles.icon} data-test-id={TOAST_USER_ACTION_TEST_IDS.icon}>
            {icon}
          </span>
        )
      )}
      <div className={styles.contentLayout}>
        <span className={styles.label} data-test-id={TOAST_USER_ACTION_TEST_IDS.label}>
          {label}
        </span>

        {link && (
          <Link
            size='m'
            text={link.text}
            href={link.href}
            onClick={link.onClick}
            appearance='invert-neutral'
            data-test-id={TOAST_USER_ACTION_TEST_IDS.link}
          />
        )}
      </div>
    </div>
  );
}
