import cn from 'classnames';
import { MouseEvent } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from '../../constants';
import { CommonTagProps } from '../../types';
import styles from './styles.module.scss';

export type TagLinkProps = WithSupportProps<CommonTagProps> & {
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
  target?: HTMLAnchorElement['target'];
};

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
      <span title={label} className={styles.label}>
        {label}
      </span>
    </a>
  );
}
