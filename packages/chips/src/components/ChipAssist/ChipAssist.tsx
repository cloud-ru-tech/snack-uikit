import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { Sun, SunProps } from '@snack-uikit/loaders';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CHIP_ASSIST_TEST_IDS, SIZE, VARIANT } from '../../constants';
import { BaseChipProps, Size } from '../../types';
import styles from './styles.module.scss';

export type ChipAssistProps = WithSupportProps<
  BaseChipProps & {
    /** Размер */
    size?: Size;
    /** Колбек обработки клика */
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
>;

/** Чип с лейблом  */
export function ChipAssist({
  icon,
  size = SIZE.S,
  label,
  disabled,
  loading,
  onClick,
  className,
  tabIndex,
  truncateVariant = 'middle',
  ...rest
}: ChipAssistProps) {
  const variant = icon && size !== SIZE.Xs ? VARIANT.IconBefore : VARIANT.LabelOnly;
  const spinnerSize: SunProps['size'] = size === SIZE.Xs ? 'xs' : 's';

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (disabled || loading) {
      return;
    }

    onClick?.(e);
  };

  return (
    <button
      type='button'
      {...extractSupportProps(rest)}
      tabIndex={tabIndex}
      data-size={size}
      data-loading={loading || undefined}
      data-variant={variant}
      disabled={!loading && disabled}
      onClick={handleClick}
      className={cn(styles.assistChip, className)}
    >
      {variant === VARIANT.IconBefore && !loading && (
        <span className={styles.icon} data-test-id={CHIP_ASSIST_TEST_IDS.icon}>
          {icon}
        </span>
      )}

      {loading && (
        <span className={styles.spinner} data-test-id={CHIP_ASSIST_TEST_IDS.spinner}>
          <Sun size={spinnerSize} />
        </span>
      )}

      <span className={cn(styles.labelLayout, styles.label)} data-test-id={CHIP_ASSIST_TEST_IDS.label}>
        <TruncateString text={label} variant={truncateVariant} />
      </span>
    </button>
  );
}
