import cn from 'classnames';

import { extractSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from '../../constants';
import { TagLinkProps } from '../../types';
import styles from './styles.module.scss';

export function TagLink({
  label,
  size = SIZE.Xs,
  appearance = APPEARANCE.Neutral,
  className,
  tabIndex,
  href,
  onClick,
  target,
  ...rest
}: TagLinkProps) {
  return (
    <a
      {...extractSupportProps(rest)}
      className={cn(styles.tag, className)}
      data-size={size}
      data-appearance={appearance}
      tabIndex={tabIndex}
      href={href}
      target={target}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
    </a>
  );
}
