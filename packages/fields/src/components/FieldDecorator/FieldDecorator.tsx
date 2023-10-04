import cn from 'classnames';
import { ReactNode } from 'react';

import { Size } from '@snack-ui/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ValidationState } from '../../constants';
import { Footer, FooterProps } from './Footer';
import { Header, HeaderProps } from './Header';
import styles from './styles.module.scss';

export type FieldDecoratorProps = WithSupportProps<
  {
    className?: string;
    /** Контент */
    children: ReactNode;
    /** Деактивирован ли элемент */
    disabled?: boolean;
    /** Является ли поле доступным только на чтение */
    readonly?: boolean;
  } & HeaderProps &
    FooterProps
>;

export function FieldDecorator({
  children,
  className,
  label,
  labelTooltip,
  required,
  labelFor,
  length,
  hint,
  disabled,
  readonly,
  showHintIcon,
  labelTooltipPlacement,
  size = Size.S,
  validationState = ValidationState.Default,
  ...rest
}: FieldDecoratorProps) {
  const isFieldActive = !disabled && !readonly;

  return (
    <div className={cn(styles.decorator, className)} data-size={size} {...extractSupportProps(rest)}>
      <Header
        labelTooltipPlacement={labelTooltipPlacement}
        required={required}
        label={label}
        labelTooltip={labelTooltip}
        labelFor={labelFor}
        size={size}
      />
      {children}
      <Footer
        length={isFieldActive ? length : undefined}
        hint={hint}
        showHintIcon={showHintIcon}
        size={size}
        validationState={isFieldActive ? validationState : ValidationState.Default}
      />
    </div>
  );
}
