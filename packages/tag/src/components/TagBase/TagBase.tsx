import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from '../../constants';
import { CommonTagProps } from '../../types';
import { ICON_SIZE } from './constants';
import styles from './styles.module.scss';

export type TagBaseProps = WithSupportProps<{
  /** Коллбэк на удаление */
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}> &
  CommonTagProps;

export function TagBase({
  label,
  size = SIZE.Xs,
  appearance = APPEARANCE.Neutral,
  onDelete,
  className,
  tabIndex,
  ...rest
}: TagBaseProps) {
  return (
    <span
      {...extractSupportProps(rest)}
      className={cn(styles.tag, className)}
      data-size={size}
      data-appearance={appearance}
      data-removable={Boolean(onDelete)}
    >
      <span title={label} className={styles.label}>
        {label}
      </span>
      {onDelete && (
        <button
          type='button'
          className={styles.tagButton}
          onClick={onDelete}
          data-test-id='tag-remove-button'
          tabIndex={tabIndex}
        >
          {size === SIZE.Xs ? (
            <CrossSVG size={ICON_SIZE[size]} className={styles.icon} />
          ) : (
            <CrossSVG size={ICON_SIZE[size]} className={styles.icon} />
          )}
        </button>
      )}
    </span>
  );
}
