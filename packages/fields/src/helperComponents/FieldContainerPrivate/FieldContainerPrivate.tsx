import cn from 'classnames';
import { CSSProperties, MouseEventHandler, ReactNode, RefObject } from 'react';

import { Size } from '@snack-uikit/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { VALIDATION_STATE } from '../../constants';
import { ContainerVariant, ValidationState } from '../../types';
import styles from './styles.module.scss';

export type FieldContainerPrivateProps = WithSupportProps<{
  className?: string;
  children: ReactNode;
  size: Size;
  validationState: ValidationState;
  variant: ContainerVariant;
  disabled: boolean;
  readonly: boolean;
  focused?: boolean;
  disableFocus?: boolean;
  selectable?: boolean;
  style?: CSSProperties;
  prefix?: ReactNode;
  postfix?: ReactNode;
  inputRef: RefObject<HTMLElement>;
}>;

export function FieldContainerPrivate({
  className,
  children,
  size,
  validationState,
  variant,
  disabled,
  readonly,
  focused,
  disableFocus,
  selectable,
  style,
  prefix,
  postfix,
  inputRef,
  ...rest
}: FieldContainerPrivateProps) {
  const handleContainerClick: MouseEventHandler<HTMLDivElement> = () => {
    if (disabled) {
      return;
    }
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(className, styles.container)}
      style={style}
      data-size={size}
      data-validation={disabled || readonly ? VALIDATION_STATE.Default : validationState}
      data-variant={variant}
      data-disabled={disabled || undefined}
      data-readonly={readonly || undefined}
      data-focused={focused || undefined}
      data-disable-focus={disableFocus || undefined}
      data-selectable={selectable || undefined}
      data-test-id='field-container-private'
      onClick={handleContainerClick}
      role='textbox'
      tabIndex={-1}
      {...extractSupportProps(rest)}
    >
      {prefix && (
        <span className={styles.prefix} data-test-id='field-container-private__prefix-icon'>
          {prefix}
        </span>
      )}

      {children}

      {postfix && <span className={styles.postfix}>{postfix}</span>}
    </div>
  );
}
