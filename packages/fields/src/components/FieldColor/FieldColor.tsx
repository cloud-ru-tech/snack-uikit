import mergeRefs from 'merge-refs';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { ColorPicker, ColorPickerProps } from '@snack-uikit/color-picker';
import { Dropdown } from '@snack-uikit/dropdown';
import { InputPrivate, InputPrivateProps, SIZE, useButtonNavigation, useClearButton } from '@snack-uikit/input-private';
import { extractSupportProps, useValueControl, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import styles from './styles.module.scss';

type InputProps = Pick<
  InputPrivateProps,
  'id' | 'name' | 'value' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur' | 'placeholder'
>;

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

type FieldDateOwnProps = {
  /** Открыт color-picker */
  open?: boolean;
  /** Колбек открытия пикера */
  onOpenChange?(value: boolean): void;
  /** Отображение кнопки копирования */
  showCopyButton?: boolean;
  /**
   * Отображение кнопки Очистки поля
   * @default true
   */
  showClearButton?: boolean;

  value?: string;
  onChange?(value: string): void;
} & Omit<ColorPickerProps, 'onChange' | 'value'>;

export type FieldColorProps = WithSupportProps<FieldDateOwnProps & InputProps & WrapperProps>;

export const FieldColor = forwardRef<HTMLInputElement, FieldColorProps>(
  (
    {
      id,
      name,
      value: valueProp,
      disabled = false,
      readonly = false,
      showCopyButton: showCopyButtonProp = true,
      showClearButton: showClearButtonProp = true,
      open,
      onChange,
      onOpenChange,
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
      error,
      withAlpha,
      autoApply,
      placeholder,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);

    const localRef = useRef<HTMLInputElement>(null);

    const showDropList = isOpen && !readonly && !disabled;
    const fieldValidationState = getValidationState({ validationState, error });

    const [value = '', setValue] = useValueControl<string>({ value: valueProp || '', onChange: onChange });

    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const showAdditionalButton = Boolean(value && !disabled);
    const showClearButton = showClearButtonProp && showAdditionalButton && !readonly;
    const showCopyButton = showCopyButtonProp && showAdditionalButton && readonly;

    const onClear = () => {
      setValue?.('');

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

    useEffect(() => {
      if (open) {
        localRef.current?.focus();
      }
    }, [open]);

    return (
      <FieldDecorator
        className={className}
        label={label}
        labelTooltip={labelTooltip}
        labelTooltipPlacement={labelTooltipPlacement}
        labelFor={id}
        required={required}
        caption={caption}
        hint={hint}
        disabled={disabled}
        readonly={readonly}
        showHintIcon={showHintIcon}
        size={size}
        error={error}
        validationState={fieldValidationState}
        {...extractSupportProps(rest)}
      >
        <Dropdown
          trigger='click'
          triggerClassName={styles.triggerClassName}
          widthStrategy='auto'
          {...(readonly || disabled
            ? { open: false }
            : {
                open: showDropList,
                onOpenChange: setIsOpen,
              })}
          content={
            <ColorPicker
              withAlpha={withAlpha}
              autoApply={autoApply}
              value={value}
              onChange={({ hex }) => {
                setValue?.(hex || '');
              }}
              colorMode={{
                hex: false,
              }}
            />
          }
        >
          <FieldContainerPrivate
            className={styles.container}
            size={size}
            validationState={fieldValidationState}
            disabled={disabled}
            readonly={readonly}
            variant={CONTAINER_VARIANT.SingleLine}
            focused={showDropList}
            inputRef={localRef}
            postfix={buttons}
            prefix={
              <div
                className={styles.colorPreview}
                style={{
                  '--color': value,
                }}
              />
            }
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
              disabled={disabled}
              readonly={readonly}
              placeholder={placeholder}
              type='text'
              id={id}
              name={name}
              data-test-id='field-color__input'
            />
          </FieldContainerPrivate>
        </Dropdown>
      </FieldDecorator>
    );
  },
);
