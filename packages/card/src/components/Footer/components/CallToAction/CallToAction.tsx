import cn from 'classnames';
import { ReactNode } from 'react';

import { Typography } from '@snack-ui/typography';
import { excludeSupportProps, WithSupportProps } from '@snack-ui/utils';

import styles from './styles.module.scss';

export type FooterCallToActionProps = WithSupportProps<{
  /** Лейбл */
  label: string;
  /** Иконка */
  icon?: ReactNode;
  /** CSS-класс для элемента с контентом */
  className?: string;
}>;

export function FooterCallToAction({ label, icon, className, ...rest }: FooterCallToActionProps) {
  return (
    <div className={cn(styles.callToAction, className)} {...excludeSupportProps(rest)}>
      <Typography.SansLabelL className={styles.label}>{label}</Typography.SansLabelL>
      <span className={styles.icon}>{icon}</span>
    </div>
  );
}
