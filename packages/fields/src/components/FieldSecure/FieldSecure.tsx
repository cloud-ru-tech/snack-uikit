import mergeRefs from 'merge-refs';
import { forwardRef, ReactElement, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import {
  InputPrivate,
  InputPrivateProps,
  moveCursorToEnd,
  runAfterRerender,
  SIZE,
  useButtonNavigation,
} from '@snack-uikit/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
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
  /** Замаскированно ли значение поля */
  hidden?: boolean;
  /** Колбек смены маскирования */
  onHiddenChange?(value: boolean): void;
  /** Отображение кнопки копирования */
  showCopyButton?: boolean;
  /** Можно ли вводить больше разрешённого кол-ва символов */
  allowMoreThanMaxLength?: boolean;
  /** Иконка-префикс для поля */
  prefixIcon?: ReactElement;
};

export type FieldSecureProps = WithSupportProps<FieldSecureOwnProps & InputProps & WrapperProps>;

export const FieldSecure = forwardRef<HTMLInputElement, FieldSecureProps>(
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
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      prefixIcon,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const hideButtonRef = useRef<HTMLButtonElement>(null);
    const [value, onChange] = useUncontrolledProp(valueProp, '', onChangeProp);
    const [hidden, setHidden] = useUncontrolledProp(hiddenProp, true, onHiddenChange);
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
          variant={CONTAINER_VARIANT.SingleLine}
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
            type={hidden ? 'password' : 'text'}
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
