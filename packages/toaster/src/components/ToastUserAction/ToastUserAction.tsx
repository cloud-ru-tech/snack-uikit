import cn from 'classnames';
import { MouseEvent, useMemo } from 'react';
import { ToastContentProps as RtToastContentProps } from 'react-toastify';

import { Link } from '@snack-uikit/link';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TOAST_USER_ACTION_TEST_IDS } from '../../testIds';
import { ToastUserActionAppearance, Variant } from './constants';
import styles from './styles.module.scss';
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
  }>;

export function ToastUserAction({
  appearance = ToastUserActionAppearance.Neutral,
  label,
  link,
  className,
  ...rest
}: ToastUserActionProps) {
  const icon = useMemo(() => getIcon(appearance), [appearance]);

  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-appearance={appearance}
      data-variant={icon ? Variant.WithIcon : Variant.LabelOnly}
    >
      <div className={styles.content}>
        {icon && (
          <span className={styles.icon} data-test-id={TOAST_USER_ACTION_TEST_IDS.icon}>
            {icon}
          </span>
        )}
        <span className={styles.label} data-test-id={TOAST_USER_ACTION_TEST_IDS.label}>
          {label}
        </span>
      </div>

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
  );
}

ToastUserAction.appearances = ToastUserActionAppearance;
