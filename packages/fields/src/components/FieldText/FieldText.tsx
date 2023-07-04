import mergeRefs from 'merge-refs';
import { forwardRef, ReactElement, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { InputPrivate, InputPrivateProps } from '@snack-ui/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ButtonClearValue, ButtonCopyValue, FieldContainerPrivate } from '../../helperComponents';
import { ButtonSizeMap, ContainerVariant, Size, ValidationState } from '../constants';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';

type InputProps = Pick<Partial<InputPrivateProps>, 'value' | 'onChange'> &
  Pick<InputPrivateProps, 'id' | 'name' | 'placeholder' | 'maxLength' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  'className' | 'label' | 'labelTooltip' | 'required' | 'hint' | 'showHintIcon' | 'size' | 'validationState'
>;

type FieldTextOwnProps = {
  showCopyButton?: boolean;
  allowMoreThanMaxLength?: boolean;
  prefixIcon?: ReactElement;
};

export type FieldTextProps = WithSupportProps<FieldTextOwnProps & InputProps & WrapperProps>;

const ForwardedFieldText = forwardRef<HTMLInputElement, FieldTextProps>(
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
      onChange: onChangeProp,
      onFocus,
      onBlur,
      className,
      label,
      labelTooltip,
      required = false,
      hint,
      showHintIcon,
      size = Size.S,
      validationState = ValidationState.Default,
      prefixIcon,
      ...rest
    },
    ref,
  ) => {
    const [value, onChange] = useUncontrolledProp(valueProp, '', onChangeProp);
    const localRef = useRef<HTMLInputElement>(null);
    const showAdditionalButton = Boolean(value && !disabled);

    const handleClear = () => {
      onChange('');
      localRef.current?.focus();
    };

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
              {showAdditionalButton && !readonly && (
                <ButtonClearValue size={ButtonSizeMap[size]} onClick={handleClear} />
              )}
              {showCopyButton && showAdditionalButton && readonly && (
                <ButtonCopyValue size={ButtonSizeMap[size]} valueToCopy={value} />
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
            type={InputPrivate.types.Text}
            maxLength={allowMoreThanMaxLength ? undefined : maxLength || undefined}
            id={id}
            name={name}
            data-test-id='field-text__input'
          />
        </FieldContainerPrivate>
      </FieldDecorator>
    );
  },
);

export const FieldText = ForwardedFieldText as typeof ForwardedFieldText & {
  sizes: typeof Size;
  validationStates: typeof ValidationState;
};

FieldText.sizes = Size;
FieldText.validationStates = ValidationState;
