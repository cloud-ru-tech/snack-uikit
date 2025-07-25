import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import { SIZE } from '@snack-uikit/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { VALIDATION_STATE } from '../../constants';
import { getValidationState } from '../../utils/getValidationState';
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

export const FieldDecorator = forwardRef<HTMLDivElement, FieldDecoratorProps>(
  (
    {
      children,
      className,
      label,
      labelTooltip,
      required,
      labelFor,
      caption,
      length,
      hint,
      disabled,
      readonly,
      showHintIcon,
      labelTooltipPlacement,
      size = SIZE.S,
      error,
      validationState = VALIDATION_STATE.Default,
      ...rest
    },
    ref,
  ) => {
    const isFieldActive = !disabled && !readonly;
    const fieldValidationState = getValidationState({ validationState, error });

    return (
      <div className={cn(styles.decorator, className)} {...extractSupportProps(rest)} data-size={size} ref={ref}>
        {label && (
          <Header
            labelTooltipPlacement={labelTooltipPlacement}
            required={required}
            label={label}
            labelTooltip={labelTooltip}
            labelFor={labelFor}
            caption={caption}
            size={size}
          />
        )}
        {children}
        <Footer
          length={isFieldActive ? length : undefined}
          hint={error || hint}
          showHintIcon={showHintIcon}
          size={size}
          validationState={isFieldActive ? fieldValidationState : VALIDATION_STATE.Default}
        />
      </div>
    );
  },
);
