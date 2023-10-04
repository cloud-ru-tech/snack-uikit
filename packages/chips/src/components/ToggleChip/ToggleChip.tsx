import cn from 'classnames';
import { ChangeEvent, ChangeEventHandler } from 'react';

import { Sun } from '@snack-ui/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Size, Variant } from '../../constants';
import { BaseChipProps } from '../../types';
import styles from './styles.module.scss';

export type ToggleChipProps = WithSupportProps<
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
export function ToggleChip({
  icon,
  size = ToggleChip.sizes.S,
  label,
  checked,
  disabled,
  loading,
  onChange,
  className,
  tabIndex = 0,
  ...rest
}: ToggleChipProps) {
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
        data-test-id='toggle-chip__input'
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        disabled={!loading && disabled}
        tabIndex={disabled ? -1 : tabIndex}
        className={styles.toggleChipInput}
      />

      <span className={styles.toggleChipContent}>
        {variant === Variant.IconBefore && !loading && (
          <span className={styles.icon} data-test-id='toggle-chip__icon'>
            {icon}
          </span>
        )}

        {loading && (
          <span className={styles.spinner} data-test-id='toggle-chip__spinner'>
            <Sun size={spinnerSize} />
          </span>
        )}

        <span className={styles.label} data-test-id='toggle-chip__label'>
          {label}
        </span>
      </span>
    </label>
  );
}

ToggleChip.sizes = Size;
