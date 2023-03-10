import { Sun } from '@snack-ui/loaders';

import { IconPosition } from '../../constants';
import { ButtonPrivateProps } from './ButtonPrivate';
import { Variant } from './constants';

type GetVariantProps = Pick<ButtonPrivateProps, 'label' | 'icon' | 'iconPosition'>;

export function getVariant({ label, icon, iconPosition }: GetVariantProps) {
  if (label && icon && iconPosition === IconPosition.After) {
    return Variant.IconAfter;
  }

  if (label && icon && iconPosition === IconPosition.Before) {
    return Variant.IconBefore;
  }

  if (label) {
    return Variant.LabelOnly;
  }

  return Variant.IconOnly;
}

type GetWrappedIconProps = Pick<ButtonPrivateProps, 'icon' | 'iconClassName' | 'loading'>;

export function getWrappedIcon({ icon, iconClassName, loading }: GetWrappedIconProps) {
  if (loading) {
    return (
      <span data-test-id={'loading-icon'} className={iconClassName}>
        <Sun size={Sun.sizes.SizeS} />
      </span>
    );
  }

  if (icon) {
    return (
      <span data-test-id={'icon'} className={iconClassName}>
        {icon}
      </span>
    );
  }

  return undefined;
}

type GetWrappedLabelProps = Pick<ButtonPrivateProps, 'label' | 'labelClassName'>;

export function getWrappedLabel({ label, labelClassName }: GetWrappedLabelProps) {
  return label ? (
    <span data-test-id={'label'} className={labelClassName}>
      {label}
    </span>
  ) : undefined;
}

type GetChildrenProps = Pick<
  ButtonPrivateProps,
  'icon' | 'label' | 'iconPosition' | 'iconClassName' | 'labelClassName' | 'loading'
>;

export function getChildren({ icon, label, iconPosition, iconClassName, labelClassName, loading }: GetChildrenProps) {
  const wrappedIcon = getWrappedIcon({ icon, iconClassName, loading });
  const wrappedLabel = getWrappedLabel({ label, labelClassName });

  switch (iconPosition) {
    case IconPosition.Before: {
      return (
        <>
          {wrappedIcon}
          {wrappedLabel}
        </>
      );
    }
    case IconPosition.After:
    default: {
      return (
        <>
          {wrappedLabel}
          {wrappedIcon}
        </>
      );
    }
  }
}
