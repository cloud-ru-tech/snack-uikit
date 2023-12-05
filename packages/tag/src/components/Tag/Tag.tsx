import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Appearance, Size } from '../../constants';
import { IconSize } from './constants';
import styles from './styles.module.scss';

export type TagProps = WithSupportProps<{
  /** Текст */
  label: string;
  /** Размер */
  size?: Size;
  /** Внешний вид */
  appearance?: Appearance;
  /** Коллбэк на удаление */
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  /** CSS-класс */
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
            <CrossSVG size={IconSize[size]} className={styles.icon} />
          ) : (
            <CrossSVG size={IconSize[size]} className={styles.icon} />
          )}
        </button>
      )}
    </span>
  );
}

Tag.sizes = Size;
Tag.appearances = Appearance;
