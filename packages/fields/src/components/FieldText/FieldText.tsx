import mergeRefs from 'merge-refs';
import { forwardRef, ReactElement, useMemo, useRef } from 'react';

import { InputPrivate, InputPrivateProps, SIZE, useButtonNavigation, useClearButton } from '@snack-uikit/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton, useValueControl } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';

type InputProps = Pick<Partial<InputPrivateProps>, 'value' | 'onChange'> &
  Pick<InputPrivateProps, 'id' | 'name' | 'placeholder' | 'maxLength' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  | 'className'
  | 'label'
  | 'labelTooltip'
  | 'required'
  | 'caption'
  | 'hint'
  | 'showHintIcon'
  | 'size'
  | 'validationState'
  | 'labelTooltipPlacement'
  | 'error'
>;

type FieldTextOwnProps = {
  /** Отображение кнопки Копировать для поля (актуально только для `readonly = true`) */
  showCopyButton?: boolean;
  /**
   * Отображение кнопки очистки поля
   * @default true
   */
  showClearButton?: boolean;
  /** Можно ли вводить больше разрешённого кол-ва символов */
  allowMoreThanMaxLength?: boolean;
  /** Иконка-префикс для поля */
  prefixIcon?: ReactElement;
};

export type FieldTextProps = WithSupportProps<FieldTextOwnProps & InputProps & WrapperProps>;

export const FieldText = forwardRef<HTMLInputElement, FieldTextProps>(
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
      showClearButton: showClearButtonProp = true,
      allowMoreThanMaxLength = false,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      className,
      label,
      labelTooltip,
      labelTooltipPlacement,
      required = false,
      caption,
      hint,
      showHintIcon,
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      prefixIcon,
      error,
      ...rest
    },
    ref,
  ) => {
    const [value = '', onChange] = useValueControl<string>({
      value: valueProp,
      defaultValue: '',
      onChange: onChangeProp,
    });
    const localRef = useRef<HTMLInputElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const showAdditionalButton = Boolean(value && !disabled);
    const showClearButton = showClearButtonProp && showAdditionalButton && !readonly;
    const showCopyButton = showCopyButtonProp && showAdditionalButton && readonly;
    const fieldValidationState = getValidationState({ validationState, error });

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
        caption={caption}
        length={maxLength ? { max: maxLength, current: value.length } : undefined}
        hint={hint}
        disabled={disabled}
        readonly={readonly}
        showHintIcon={showHintIcon}
        size={size}
        validationState={fieldValidationState}
        error={error}
        {...extractSupportProps(rest)}
      >
        <FieldContainerPrivate
          size={size}
          validationState={fieldValidationState}
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
            tabIndex={inputTabIndex}
            onKeyDown={onInputKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readonly={readonly}
            type='text'
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
