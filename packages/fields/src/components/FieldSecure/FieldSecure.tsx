import mergeRefs from 'merge-refs';
import { forwardRef, ReactElement, useMemo, useRef, useState } from 'react';

import {
  InputPrivate,
  InputPrivateProps,
  moveCursorToEnd,
  runAfterRerender,
  SIZE,
  useButtonNavigation,
} from '@snack-uikit/input-private';
import { Skeleton, WithSkeleton } from '@snack-uikit/skeleton';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton, useHideButton, useValueControl } from '../../hooks';
import { AsyncValueRequest } from '../../types';
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
  | 'size'
  | 'validationState'
  | 'showHintIcon'
  | 'labelTooltipPlacement'
  | 'error'
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
  /** Свойство позволяет грузить данные в поле по требованию */
  asyncValueGetter?(): Promise<string>;
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
      caption,
      hint,
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      prefixIcon,
      error,
      asyncValueGetter,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const hideButtonRef = useRef<HTMLButtonElement>(null);

    const [isDataRequested, setIsDataRequested] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [value = '', onChange] = useValueControl<string>({
      value: valueProp,
      defaultValue: '',
      onChange: onChangeProp,
    });

    const [hidden = true, setHidden] = useValueControl<boolean>({
      value: hiddenProp,
      defaultValue: true,
      onChange: onHiddenChange,
    });

    const showCopyButton = showCopyButtonProp && Boolean(value) && readonly && !disabled;
    const showHideButton = !(readonly && !value);

    const fieldValidationState = getValidationState({ validationState, error });

    const getAsyncValue = async (): AsyncValueRequest => {
      if (!isDataRequested && asyncValueGetter) {
        setIsLoading(true);

        try {
          const asyncValue = await asyncValueGetter();

          setIsDataRequested(true);
          onChange(asyncValue);

          return {
            success: true,
            value: asyncValue,
          };
        } catch (e) {
          return {
            success: false,
          };
        } finally {
          setIsLoading(false);
        }
      }

      return {
        success: true,
      };
    };

    const toggleHidden = () => {
      getAsyncValue().then(({ success }) => {
        if (success) {
          setHidden(!hidden);

          if (!readonly) {
            runAfterRerender(() => {
              localRef.current?.focus();
              moveCursorToEnd(localRef.current);
            });
          }
        }
      });
    };

    const copyButtonSettings = useCopyButton({
      copyButtonRef,
      showCopyButton,
      size,
      valueToCopy: value,
      onValueRequest: getAsyncValue,
      disabled: isLoading,
    });

    const hideButtonSettings = useHideButton({
      hideButtonRef,
      showHideButton,
      size,
      toggleHidden,
      hidden,
      disabled: disabled || isLoading,
    });

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
        caption={caption}
        length={maxLength ? { max: maxLength, current: value.length } : undefined}
        hint={hint}
        disabled={disabled}
        readonly={readonly}
        showHintIcon={showHintIcon}
        size={size}
        error={error}
        validationState={fieldValidationState}
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
          <WithSkeleton skeleton={<Skeleton width='100%' borderRadius={2} />} loading={isLoading}>
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
          </WithSkeleton>
        </FieldContainerPrivate>
      </FieldDecorator>
    );
  },
);
