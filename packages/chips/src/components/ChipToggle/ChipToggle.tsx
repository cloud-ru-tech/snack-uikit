import cn from 'classnames';
import { ChangeEvent, ChangeEventHandler } from 'react';

import { Sun } from '@snack-uikit/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CHIP_TOGGLE_TEST_IDS, Size, Variant } from '../../constants';
import { BaseChipProps } from '../../types';
import styles from './styles.module.scss';

export type ChipToggleProps = WithSupportProps<
  BaseChipProps & {
    /** Отмечен ли компонент */
    checked: boolean;
    /** Размер */
    size?: Size;
    /** Колбек смены значения */
    onChange(checked: boolean, e: ChangeEvent<HTMLInputElement>): void;
  }
>;

/** Чип с состоянием выбран/не выбран */
export function ChipToggle({
  icon,
  size = ChipToggle.sizes.S,
  label,
  checked,
  disabled,
  loading,
  onChange,
  className,
  tabIndex = 0,
  ...rest
}: ChipToggleProps) {
  const variant = icon && size !== Size.Xs ? Variant.IconBefore : Variant.LabelOnly;
  const spinnerSize = size === Size.Xs ? Sun.sizes.XS : Sun.sizes.S;

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (disabled || loading) {
      return;
    }

    onChange?.(!checked, e);
  };

  return (
    <label
      {...extractSupportProps(rest)}
      data-size={size}
      data-loading={loading || undefined}
      data-disabled={(!loading && disabled) || undefined}
      data-variant={variant}
      data-checked={checked || undefined}
      className={cn(styles.toggleChip, className)}
    >
      <input
        data-test-id={CHIP_TOGGLE_TEST_IDS.input}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        disabled={!loading && disabled}
        tabIndex={disabled ? -1 : tabIndex}
        className={styles.toggleChipInput}
      />

      <span className={styles.toggleChipContent}>
        {variant === Variant.IconBefore && !loading && (
          <span className={styles.icon} data-test-id={CHIP_TOGGLE_TEST_IDS.icon}>
            {icon}
          </span>
        )}

        {loading && (
          <span className={styles.spinner} data-test-id={CHIP_TOGGLE_TEST_IDS.spinner}>
            <Sun size={spinnerSize} />
          </span>
        )}

        <span className={cn(styles.labelLayout, styles.label)} data-test-id={CHIP_TOGGLE_TEST_IDS.label}>
          {label}
        </span>
      </span>
    </label>
  );
}

ChipToggle.sizes = Size;
