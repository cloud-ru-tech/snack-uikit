import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from '../../constants';
import { Appearance, Size } from '../../types';
import { ICON_SIZE } from './constants';
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
  /** tabIndex кнопки удаления */
  tabIndex?: number;
}>;

export function Tag({
  label,
  size = SIZE.Xs,
  appearance = APPEARANCE.Neutral,
  onDelete,
  className,
  tabIndex,
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

export { APPEARANCE };
