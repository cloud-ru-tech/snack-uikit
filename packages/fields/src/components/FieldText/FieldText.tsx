import mergeRefs from 'merge-refs';
import { forwardRef, ReactElement, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { InputPrivate, InputPrivateProps } from '@snack-ui/input-private';
import { Tooltip } from '@snack-ui/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ContainerVariant, Size, ValidationState } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useButtonNavigation, useClearButton, useCopyButton } from '../../hooks';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';

type InputProps = Pick<Partial<InputPrivateProps>, 'value' | 'onChange'> &
  Pick<InputPrivateProps, 'id' | 'name' | 'placeholder' | 'maxLength' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  | 'className'
  | 'label'
  | 'labelTooltip'
  | 'required'
  | 'hint'
  | 'showHintIcon'
  | 'size'
  | 'validationState'
  | 'labelTooltipPlacement'
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
      showCopyButton: showCopyButtonProp = true,
      allowMoreThanMaxLength = false,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      className,
      label,
      labelTooltip,
      labelTooltipPlacement,
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
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const showAdditionalButton = Boolean(value && !disabled);
    const showClearButton = showAdditionalButton && !readonly;
    const showCopyButton = showCopyButtonProp && showAdditionalButton && readonly;

    const onClear = () => {
      onChange('');

      if (required) {
        localRef.current?.focus();
      }
    };

    const clearButtonSettings = useClearButton({ clearButtonRef, showClearButton, size, onClear });
    const copyButtonSettings = useCopyButton({ copyButtonRef, showCopyButton, size, valueToCopy: value });
    const { buttons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
      inputRef: localRef,
      buttons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
      readonly,
    });

    return (
      <FieldDecorator
        className={className}
        label={label}
        labelTooltip={labelTooltip}
        labelTooltipPlacement={labelTooltipPlacement}
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
          postfix={buttons}
        >
          <InputPrivate
            ref={mergeRefs(ref, localRef)}
            data-size={size}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            tabIndex={inputTabIndex}
            onKeyDown={onInputKeyDown}
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
  labelTooltipPlacements: typeof Tooltip.placements;
};

FieldText.sizes = Size;
FieldText.validationStates = ValidationState;
FieldText.labelTooltipPlacements = Tooltip.placements;
