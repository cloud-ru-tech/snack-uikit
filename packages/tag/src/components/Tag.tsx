import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { CrossSSVG, CrossXsSVG } from '@snack-ui/icons';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, IconSize, Size } from './constants';
import styles from './styles.module.scss';

export type TagProps = WithSupportProps<{
  label: string;
  size?: Size;
  appearance?: Appearance;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}>;

export function Tag({
  label,
  size = Size.Xs,
  appearance = Appearance.Neutral,
  onDelete,
  className,
  ...rest
}: TagProps) {
  return (
    <span
      {...extractSupportProps(rest)}
      className={cn(styles.tag, className)}
      data-size={size}
      data-appearance={appearance}
      data-removable={Boolean(onDelete)}
    >
      <span className={styles.label}>{label}</span>
      {onDelete && (
        <button type='button' className={styles.tagButton} onClick={onDelete} data-test-id='tag-remove-button'>
          {size === Size.Xs ? (
            <CrossXsSVG size={IconSize[size]} className={styles.icon} />
          ) : (
            <CrossSSVG size={IconSize[size]} className={styles.icon} />
          )}
        </button>
      )}
    </span>
  );
}

Tag.sizes = Size;
Tag.appearances = Appearance;
