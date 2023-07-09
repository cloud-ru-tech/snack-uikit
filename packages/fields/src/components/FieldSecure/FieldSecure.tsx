import mergeRefs from 'merge-refs';
import { forwardRef, ReactElement, useEffect, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { InputPrivate, InputPrivateProps } from '@snack-ui/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ButtonSizeMap, ContainerVariant, Size, ValidationState } from '../../constants';
import { ButtonCopyValue, ButtonHideValue, FieldContainerPrivate } from '../../helperComponents';
import { moveCursorToEnd } from '../../helpers';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';

type InputProps = Pick<Partial<InputPrivateProps>, 'value' | 'onChange'> &
  Pick<InputPrivateProps, 'id' | 'name' | 'placeholder' | 'maxLength' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  'className' | 'label' | 'labelTooltip' | 'required' | 'hint' | 'size' | 'validationState' | 'showHintIcon'
>;

type FieldSecureOwnProps = {
  hidden?: boolean;
  onHiddenChange?(value: boolean): void;
  showCopyButton?: boolean;
  allowMoreThanMaxLength?: boolean;
  prefixIcon?: ReactElement;
};

export type FieldSecureProps = WithSupportProps<FieldSecureOwnProps & InputProps & WrapperProps>;

const ForwardedFieldSecure = forwardRef<HTMLInputElement, FieldSecureProps>(
  (
    {
      id,
      name,
      value: valueProp,
      placeholder,
      maxLength,
      disabled = false,
      readonly = false,
      showCopyButton = true,
      allowMoreThanMaxLength = false,
      hidden: hiddenProp,
      onHiddenChange,
      showHintIcon,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      className,
      label,
      labelTooltip,
      required = false,
      hint,
      size = Size.S,
      validationState = ValidationState.Default,
      prefixIcon,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const [value, onChange] = useUncontrolledProp(valueProp, '', onChangeProp);
    const clickedByHiddenButton = useRef(false);
    const [hidden, setHidden] = useUncontrolledProp(hiddenProp, false, onHiddenChange);
    const toggleHidden = () => {
      setHidden(!hidden);
      clickedByHiddenButton.current = true;
    };

    useEffect(() => {
      if (clickedByHiddenButton.current) {
        moveCursorToEnd(localRef.current);
      }

      clickedByHiddenButton.current = false;
    }, [hidden]);

    return (
      <FieldDecorator
        className={className}
        label={label}
        labelTooltip={labelTooltip}
        labelFor={id}
        required={required}
        length={maxLength ? { max: maxLength, current: value.length } : undefined}
        hint={hint}
        disabled={disabled}
        readonly={readonly}
        showHintIcon={showHintIcon}
        size={size}
        validationState={validationState}
        {...extractSupportProps(rest)}
      >
        <FieldContainerPrivate
          size={size}
          validationState={validationState}
          disabled={disabled}
          readonly={readonly}
          variant={ContainerVariant.SingleLine}
          inputRef={localRef}
          prefix={prefixIcon}
          postfix={
            <>
              {showCopyButton && value && readonly && !disabled && (
                <ButtonCopyValue size={ButtonSizeMap[size]} valueToCopy={value} />
              )}
              {!(readonly && !value) && (
                <ButtonHideValue
                  size={ButtonSizeMap[size]}
                  disabled={disabled}
                  hidden={hidden}
                  onClick={toggleHidden}
                />
              )}
            </>
          }
        >
          <InputPrivate
            ref={mergeRefs(ref, localRef)}
            data-size={size}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            readonly={readonly}
            type={hidden ? InputPrivate.types.Password : InputPrivate.types.Text}
            maxLength={allowMoreThanMaxLength ? undefined : maxLength || undefined}
            id={id}
            name={name}
            data-test-id='field-secure__input'
          />
        </FieldContainerPrivate>
      </FieldDecorator>
    );
  },
);

export const FieldSecure = ForwardedFieldSecure as typeof ForwardedFieldSecure & {
  sizes: typeof Size;
  validationStates: typeof ValidationState;
};

FieldSecure.sizes = Size;
FieldSecure.validationStates = ValidationState;
