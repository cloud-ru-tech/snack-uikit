import cn from 'classnames';
import { CSSProperties, MouseEventHandler, ReactElement, ReactNode, RefObject } from 'react';

import { extractDataProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ContainerVariant, Size, ValidationState } from '../../constants';
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
  selectable?: boolean;
  style?: CSSProperties;
  prefix?: ReactElement;
  postfix?: ReactElement;
  inputRef: RefObject<HTMLElement>;
  onMouseDown?: MouseEventHandler<HTMLElement>;
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
  selectable,
  style,
  prefix,
  postfix,
  inputRef,
  onMouseDown,
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
      data-validation={disabled || readonly ? ValidationState.Default : validationState}
      data-variant={variant}
      data-disabled={disabled || undefined}
      data-readonly={readonly || undefined}
      data-focused={focused || undefined}
      data-selectable={selectable || undefined}
      data-test-id='field-container-private'
      onClick={handleContainerClick}
      onMouseDown={onMouseDown}
      role='textbox'
      tabIndex={-1}
      {...extractDataProps(rest)}
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
