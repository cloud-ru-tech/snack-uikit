import mergeRefs from 'merge-refs';
import { forwardRef, ReactElement, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import {
  InputPrivate,
  InputPrivateProps,
  moveCursorToEnd,
  runAfterRerender,
  Size,
  useButtonNavigation,
} from '@snack-ui/input-private';
import { Tooltip } from '@snack-ui/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ContainerVariant, ValidationState } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton, useHideButton } from '../../hooks';
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
  | 'size'
  | 'validationState'
  | 'showHintIcon'
  | 'labelTooltipPlacement'
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
      showCopyButton: showCopyButtonProp = true,
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
      labelTooltipPlacement,
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
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const hideButtonRef = useRef<HTMLButtonElement>(null);
    const [value, onChange] = useUncontrolledProp(valueProp, '', onChangeProp);
    const [hidden, setHidden] = useUncontrolledProp(hiddenProp, false, onHiddenChange);
    const showCopyButton = showCopyButtonProp && Boolean(value) && readonly && !disabled;
    const showHideButton = !(readonly && !value);

    const toggleHidden = () => {
      setHidden(!hidden);

      if (!readonly) {
        runAfterRerender(() => {
          localRef.current?.focus();
          moveCursorToEnd(localRef.current);
        });
      }
    };

    const copyButtonSettings = useCopyButton({ copyButtonRef, showCopyButton, size, valueToCopy: value });
    const hideButtonSettings = useHideButton({ hideButtonRef, showHideButton, size, toggleHidden, hidden, disabled });
    const { buttons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
      inputRef: localRef,
      buttons: useMemo(() => [copyButtonSettings, hideButtonSettings], [copyButtonSettings, hideButtonSettings]),
      readonly,
      submitKeys: ['Enter', 'Space', 'Tab'],
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
            onKeyDown={onInputKeyDown}
            tabIndex={inputTabIndex}
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
  labelTooltipPlacements: typeof Tooltip.placements;
};

FieldSecure.sizes = Size;
FieldSecure.validationStates = ValidationState;
FieldSecure.labelTooltipPlacements = Tooltip.placements;
