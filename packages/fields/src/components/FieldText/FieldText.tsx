import mergeRefs from 'merge-refs';
import {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { InputPrivate, InputPrivateProps, SIZE, useButtonNavigation, useClearButton } from '@snack-uikit/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton, usePostfix, usePostfixButton, usePrefix, usePrefixButton, useValueControl } from '../../hooks';
import { Button } from '../../types';
import { getValidationState } from '../../utils/getValidationState';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import { getContainerVariant } from './helpers';

type InputProps = Pick<Partial<InputPrivateProps>, 'value' | 'onChange'> &
  Pick<Required<InputPrivateProps>, 'inputMode'> &
  Pick<
    InputPrivateProps,
    | 'id'
    | 'name'
    | 'placeholder'
    | 'maxLength'
    | 'disabled'
    | 'readonly'
    | 'onFocus'
    | 'onBlur'
    | 'autoComplete'
    | 'autoFocus'
    | 'onPaste'
    | 'onKeyDown'
    | 'spellCheck'
    | 'pattern'
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

type FieldTextOwnProps = {
  /** Отображение кнопки Копировать для поля (актуально только для `readonly = true`) */
  showCopyButton?: boolean;
  /** Колбек клика по кнопке Копировать для поля */
  onCopyButtonClick?(): void;
  /**
   * Отображение кнопки очистки поля
   * @default true
   */
  showClearButton?: boolean;
  /** Колбек клика по кнопке очистки поля */
  onClearButtonClick?(): void;
  /** Можно ли вводить больше разрешённого кол-ва символов */
  allowMoreThanMaxLength?: boolean;
  /** Иконка-префикс для поля */
  prefixIcon?: ReactElement;
  /** Произвольный префикс для поля */
  prefix?: ReactNode;
  /** Произвольный постфикс для поля */
  postfix?: ReactNode;
  /** Кнопка действия внутри поля */
  button?: Button;

  /* HTMLInputTypeAttribute */
  type?: 'text' | 'tel' | 'email';
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
      onCopyButtonClick,
      onClearButtonClick,
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
      autoComplete,
      autoFocus,
      prefixIcon,
      prefix,
      postfix,
      button: buttonProp,
      onPaste,
      onKeyDown,
      type = 'text',
      inputMode,
      spellCheck,
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

    const button: Button | undefined = useMemo(
      () =>
        buttonProp
          ? {
              ...buttonProp,
              selection: {
                ...buttonProp.selection,
                onChange: value => {
                  buttonProp.selection?.onChange?.(value);
                  setTimeout(() => localRef.current?.focus(), 0);
                },
              },
            }
          : undefined,
      [buttonProp],
    );

    const containerVariant = getContainerVariant({ button });

    const [isFieldFocused, setIsFieldFocused] = useState(false);
    const focusedRef = useRef(false);

    const onClear: MouseEventHandler<HTMLButtonElement> = e => {
      e.preventDefault();
      onChange('');
      onClearButtonClick?.();

      if (focusedRef.current) {
        localRef.current?.focus();
      }
    };

    const handleClearClickDown = () => {
      focusedRef.current = isFieldFocused;
    };

    const clearButtonSettings = useClearButton({
      clearButtonRef,
      showClearButton,
      onClear,
      onDown: handleClearClickDown,
      size,
    });

    const copyButtonSettings = useCopyButton({
      copyButtonRef,
      showCopyButton,
      size,
      valueToCopy: value,
      prefix: typeof prefix === 'string' ? prefix : undefined,
      postfix: typeof postfix === 'string' ? postfix : undefined,
      onCopyButtonClick,
    });

    const [isButtonFocused, setIsButtonFocused] = useState(false);
    const onButtonFocus = useCallback(() => setIsButtonFocused(true), []);
    const onButtonBlur = useCallback(() => setIsButtonFocused(false), []);

    const prefixSettings = usePrefix({ prefix, disabled });
    const prefixButtonSettings = usePrefixButton({
      button,
      prefixIcon,
      size,
      disabled,
      readonly,
      onFocus: onButtonFocus,
      onBlur: onButtonBlur,
    });

    const postfixSettings = usePostfix({ postfix, disabled });
    const postfixButtonSettings = usePostfixButton({
      button,
      size,
      disabled,
      readonly,
      onFocus: onButtonFocus,
      onBlur: onButtonBlur,
    });

    const { postfixButtons, prefixButtons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
      inputRef: localRef,
      postfixButtons: useMemo(
        () => [clearButtonSettings, copyButtonSettings, postfixSettings, postfixButtonSettings],
        [clearButtonSettings, copyButtonSettings, postfixSettings, postfixButtonSettings],
      ),
      prefixButtons: useMemo(() => [prefixButtonSettings, prefixSettings], [prefixButtonSettings, prefixSettings]),
      readonly,
      submitKeys: ['Enter', 'Space', 'Tab'],
    });

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
      onInputKeyDown(event);
      onKeyDown?.(event);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      const nextTarget = event.relatedTarget as HTMLElement | null;

      // если фокус ушёл на кнопку очистки — игнорируем внешний onBlur
      if (nextTarget && nextTarget === clearButtonRef.current) {
        setIsFieldFocused(false);
        return;
      }

      onBlur?.(event);
      setIsFieldFocused(false);
    };

    const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
      onFocus?.(event);
      setIsFieldFocused(true);
    };

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
          variant={containerVariant}
          inputRef={localRef}
          prefix={prefixButtons}
          postfix={postfixButtons}
          disableFocus={isButtonFocused}
        >
          <InputPrivate
            ref={mergeRefs(ref, localRef)}
            data-size={size}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={inputTabIndex}
            onKeyDown={handleKeyDown}
            onPaste={onPaste}
            placeholder={placeholder}
            disabled={disabled}
            readonly={readonly}
            type={type}
            inputMode={inputMode}
            maxLength={allowMoreThanMaxLength ? undefined : maxLength || undefined}
            id={id}
            name={name}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            spellCheck={spellCheck}
            data-test-id='field-text__input'
          />
        </FieldContainerPrivate>
      </FieldDecorator>
    );
  },
);
