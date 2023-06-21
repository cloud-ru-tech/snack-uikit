import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { Spinner } from '@snack-ui/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Variant } from '../../constants';
import { BaseChipProps } from '../../types';
import { Size } from './constants';
import styles from './styles.module.scss';

export type FilterChipProps = WithSupportProps<
  Partial<BaseChipProps> & {
    value: string;
    size?: Size;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
>;

export function FilterChip({
  label,
  size = Size.S,
  disabled,
  loading,
  icon,
  value,
  onClick,
  className,
  tabIndex = 0,
  ...rest
}: FilterChipProps) {
  const variant = icon && size !== Size.Xs ? Variant.IconBefore : Variant.LabelOnly;
  const spinnerSize = size === Size.Xs ? Spinner.sizes.XS : Spinner.sizes.S;
  const isLabelExist = Boolean(label);

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (loading || disabled) return;

    onClick?.(e);
  };

  return (
    <button
      {...extractSupportProps(rest)}
      type='button'
      className={cn(styles.filterChip, className)}
      data-size={size}
      data-variant={variant}
      data-loading={loading || undefined}
      data-label={isLabelExist || undefined}
      disabled={!loading && disabled}
      onClick={handleClick}
      tabIndex={tabIndex}
    >
      {loading && !isLabelExist && (
        <span className={styles.spinner} data-test-id='filter-chip__spinner'>
          <Spinner size={spinnerSize} data-test-id='filter-chip__spinner' />
        </span>
      )}

      {variant === Variant.IconBefore && (
        <span className={styles.icon} data-test-id='filter-chip__icon'>
          {icon}
        </span>
      )}

      {!isLabelExist && (
        <span className={styles.value} data-test-id='filter-chip__value'>
          {value}
        </span>
      )}

      {isLabelExist && (
        <>
          <span className={styles.label}>
            <span data-test-id='filter-chip__label'>{label}</span>
            {': '}
          </span>

          {loading ? (
            <span className={styles.spinner} data-test-id='filter-chip__spinner'>
              <Spinner size={spinnerSize} />
            </span>
          ) : (
            <span className={styles.value} data-test-id='filter-chip__value'>
              {value}
            </span>
          )}
        </>
      )}
    </button>
  );
}

FilterChip.sizes = Size;
FilterChip.variants = Variant;
