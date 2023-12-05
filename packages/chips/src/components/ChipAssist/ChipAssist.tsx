import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { Sun } from '@snack-uikit/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CHIP_ASSIST_TEST_IDS, Size, Variant } from '../../constants';
import { BaseChipProps } from '../../types';
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
  size = ChipAssist.sizes.S,
  label,
  disabled,
  loading,
  onClick,
  className,
  tabIndex,
  ...rest
}: ChipAssistProps) {
  const variant = icon && size !== Size.Xs ? Variant.IconBefore : Variant.LabelOnly;
  const spinnerSize = size === Size.Xs ? Sun.sizes.XS : Sun.sizes.S;

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (disabled || loading) {
      return;
    }

    onClick?.(e);
  };

  return (
    <button
      {...extractSupportProps(rest)}
      tabIndex={tabIndex}
      data-size={size}
      data-loading={loading || undefined}
      data-variant={variant}
      disabled={!loading && disabled}
      onClick={handleClick}
      className={cn(styles.assistChip, className)}
    >
      {variant === Variant.IconBefore && !loading && (
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
        {label}
      </span>
    </button>
  );
}

ChipAssist.sizes = Size;
