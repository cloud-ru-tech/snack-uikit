import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { Sun } from '@snack-ui/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Size, Variant } from '../../constants';
import { BaseChipProps } from '../../types';
import styles from './styles.module.scss';

export type AssistChipProps = WithSupportProps<
  BaseChipProps & {
    size?: Size;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
>;

export function AssistChip({
  icon,
  size = AssistChip.sizes.S,
  label,
  disabled,
  loading,
  onClick,
  className,
  tabIndex,
  ...rest
}: AssistChipProps) {
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
        <span className={styles.icon} data-test-id='assist-chip__icon'>
          {icon}
        </span>
      )}

      {loading && (
        <span className={styles.spinner} data-test-id='assist-chip__spinner'>
          <Sun size={spinnerSize} />
        </span>
      )}

      <span className={styles.label} data-test-id='assist-chip__label'>
        {label}
      </span>
    </button>
  );
}

AssistChip.sizes = Size;
