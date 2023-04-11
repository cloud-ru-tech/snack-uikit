import cn from 'classnames';

import { Counter } from '@snack-ui/counter';
import { Sun } from '@snack-ui/loaders';

import { IconPosition } from '../../constants';
import { ButtonPrivateProps } from './ButtonPrivate';
import { Variant } from './constants';
import styles from './styles.module.scss';

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

type GetWrappedCounterProps = Pick<ButtonPrivateProps, 'loading' | 'disabled' | 'counter'> & {
  counterForIcon: boolean | undefined;
};
type WrappedCounterProp = {
  wrappedCounter?: JSX.Element | undefined;
};

export function getWrappedCounter({ counter, loading, disabled, counterForIcon }: GetWrappedCounterProps) {
  return typeof counter?.value === 'number' && !loading && !disabled ? (
    <span data-test-id={'counter'} className={cn(counterForIcon ? styles.counterForIcon : styles.counterForLabel)}>
      <Counter {...counter} />
    </span>
  ) : undefined;
}

type GetWrappedIconProps = Pick<ButtonPrivateProps, 'icon' | 'iconClassName' | 'loading'> & WrappedCounterProp;

export function getWrappedIcon({ icon, iconClassName, loading, wrappedCounter }: GetWrappedIconProps) {
  if (loading) {
    return (
      <span data-test-id={'loading-icon'} className={iconClassName}>
        <Sun size={Sun.sizes.SizeS} />
      </span>
    );
  }

  if (icon) {
    return (
      <span data-test-id={'icon'} className={cn(iconClassName, { [styles.iconWithCounter]: Boolean(wrappedCounter) })}>
        {icon}
        {wrappedCounter}
      </span>
    );
  }

  return undefined;
}

type GetWrappedLabelProps = Pick<ButtonPrivateProps, 'label' | 'labelClassName'> & WrappedCounterProp;

export function getWrappedLabel({ label, labelClassName, wrappedCounter }: GetWrappedLabelProps) {
  return label ? (
    <span data-test-id={'label'} className={labelClassName}>
      {label}
      {wrappedCounter}
    </span>
  ) : undefined;
}

type GetChildrenProps = Pick<
  ButtonPrivateProps,
  'icon' | 'label' | 'iconPosition' | 'iconClassName' | 'labelClassName' | 'loading' | 'disabled' | 'counter'
>;

export function getChildren({
  icon,
  label,
  iconPosition,
  iconClassName,
  labelClassName,
  loading,
  disabled,
  counter,
}: GetChildrenProps) {
  const counterForIcon = icon && (iconPosition === IconPosition.After || !label);
  const wrappedCounter = getWrappedCounter({ counter, loading, disabled, counterForIcon });
  const wrappedIcon = getWrappedIcon({
    icon,
    iconClassName,
    loading,
    wrappedCounter: counterForIcon ? wrappedCounter : undefined,
  });
  const wrappedLabel = getWrappedLabel({
    label,
    labelClassName,
    wrappedCounter: counterForIcon ? undefined : wrappedCounter,
  });

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
