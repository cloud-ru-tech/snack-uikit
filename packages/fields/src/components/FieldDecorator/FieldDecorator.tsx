import cn from 'classnames';
import { ReactNode } from 'react';

import { SIZE } from '@snack-uikit/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { VALIDATION_STATE } from '../../constants';
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

    error?: string;
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
  size = SIZE.S,
  error,
  validationState: validationStateProp = VALIDATION_STATE.Default,
  ...rest
}: FieldDecoratorProps) {
  const isFieldActive = !disabled && !readonly;
  const validationState = error ? VALIDATION_STATE.Error : validationStateProp;

  return (
    <div className={cn(styles.decorator, className)} {...extractSupportProps(rest)} data-size={size}>
      {label && (
        <Header
          labelTooltipPlacement={labelTooltipPlacement}
          required={required}
          label={label}
          labelTooltip={labelTooltip}
          labelFor={labelFor}
          size={size}
        />
      )}
      {children}
      <Footer
        length={isFieldActive ? length : undefined}
        hint={error || hint}
        showHintIcon={showHintIcon}
        size={size}
        validationState={isFieldActive ? validationState : VALIDATION_STATE.Default}
      />
    </div>
  );
}
