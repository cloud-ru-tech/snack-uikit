import { cloneElement, ReactElement } from 'react';

import { Size, Type, Variant } from '../../constants';
import { LoadingIcon } from '../LoadingIcon';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import classNames from './styles.scss';

type LabelIconProps = {
  label?: string;
  icon?: ReactElement;
};

export type ButtonFilledProps = LabelIconProps & {
  type?: Type;
  size?: Size;
  onClick(): void;
  disabled?: boolean;
  loading?: boolean;
};

const getVariant = ({ label, icon }: LabelIconProps): Variant => {
  if (label && icon) return Variant.LabelIcon;
  if (label) return Variant.LabelOnly;
  return Variant.IconOnly;
};

export const ButtonFilled = ({
  label,
  type = Type.Primary,
  size = Size.SizeS,
  icon,
  onClick,
  disabled,
  loading,
}: ButtonFilledProps) => {
  const variant = getVariant({ label, icon });

  return (
    <button
      className={classNames.button}
      data-type={type}
      data-size={size}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      data-variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      <label className={classNames.buttonLabel}>{label}</label>
      {loading ? (
        <LoadingIcon className={classNames.buttonIcon} />
      ) : (
        icon && cloneElement(icon, { className: classNames.buttonIcon })
      )}
    </button>
  );
};

ButtonFilled.types = Type;
ButtonFilled.sizes = Size;
