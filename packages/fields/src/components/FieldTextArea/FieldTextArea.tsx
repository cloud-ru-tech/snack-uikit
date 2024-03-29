import mergeRefs from 'merge-refs';
import { ChangeEvent, forwardRef, useMemo, useRef } from 'react';

import { SIZE, useButtonNavigation, useClearButton } from '@snack-uikit/input-private';
import { Scroll } from '@snack-uikit/scroll';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate, TextArea, TextAreaProps } from '../../helperComponents';
import { useCopyButton, useValueControl } from '../../hooks';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import styles from './styles.module.scss';

type InputProps = Pick<Partial<TextAreaProps>, 'value'> &
  Pick<TextAreaProps, 'id' | 'name' | 'placeholder' | 'maxLength' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

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
  | 'error'
>;

type FieldTextAreaOwnProps = {
  /** Максимальное кол-во строк, до которого размер поля может быть увеличен */
  maxRows?: number;
  /** Может ли ли пользователь изменять размеры поля (если св-во не включено, поле автоматически меняет свой размер) */
  resizable?: boolean;
  /** Колбек смены значения */
  onChange?(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
  /** Отображение кнопки Копировать для поля (актуально только для `readonly = true`) */
  showCopyButton?: boolean;
  /**
   * Отображение кнопки очистки поля
   * @default true
   */
  showClearButton?: boolean;
  /** Можно ли вводить больше разрешённого кол-ва символов */
  allowMoreThanMaxLength?: boolean;
};

export type FieldTextAreaProps = WithSupportProps<FieldTextAreaOwnProps & InputProps & WrapperProps>;

export const FieldTextArea = forwardRef<HTMLTextAreaElement, FieldTextAreaProps>(
  (
    {
      id,
      name,
      value: valueProp,
      placeholder,
      maxLength,
      maxRows,
      disabled = false,
      resizable = false,
      readonly = false,
      showCopyButton: showCopyButtonProp = true,
      showClearButton: showClearButtonProp = true,
      allowMoreThanMaxLength = true,
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
      error,
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const isResizable = !readonly && !disabled && resizable;

    const [value = '', onChange] = useValueControl<string>({
      value: valueProp,
      defaultValue: '',
      onChange: onChangeProp,
    });
    const showCopyButton = showCopyButtonProp && Boolean(value) && !disabled && readonly;
    const showClearButton = showClearButtonProp && Boolean(value) && !disabled && !readonly;

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
        length={maxLength ? { max: maxLength, current: value.length } : undefined}
        hint={hint}
        disabled={disabled}
        readonly={readonly}
        showHintIcon={showHintIcon}
        size={size}
        error={error}
        validationState={validationState}
        {...extractSupportProps(rest)}
      >
        <FieldContainerPrivate
          className={styles.container}
          size={size}
          validationState={validationState}
          disabled={disabled}
          readonly={readonly}
          data-resizable={isResizable || undefined}
          variant={CONTAINER_VARIANT.MultiLine}
          style={{ '--max-rows': maxRows }}
          inputRef={localRef}
          postfix={<span className={styles.postfix}>{buttons}</span>}
        >
          <Scroll
            className={styles.scrollContainer}
            size='s'
            barHideStrategy='never'
            resize={isResizable ? 'vertical' : 'none'}
            data-test-id='field-textarea__scroll-area'
          >
            <TextArea
              className={styles.textarea}
              data-size={size}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled}
              readonly={readonly}
              id={id}
              name={name}
              ref={mergeRefs(ref, localRef)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onInputKeyDown}
              tabIndex={inputTabIndex}
              maxLength={allowMoreThanMaxLength ? undefined : maxLength || undefined}
              data-test-id='field-textarea__input'
            />
          </Scroll>
        </FieldContainerPrivate>
      </FieldDecorator>
    );
  },
);
