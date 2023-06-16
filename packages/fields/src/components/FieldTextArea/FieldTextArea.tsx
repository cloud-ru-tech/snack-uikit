import mergeRefs from 'merge-refs';
import { ChangeEvent, forwardRef, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Scroll } from '@snack-ui/scroll';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ButtonClearValue, ButtonCopyValue, FieldContainerPrivate } from '../../helperComponents';
import { ButtonSizeMap, ContainerVariant, Size, ValidationState } from '../constants';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import { TextArea, TextAreaProps } from '../TextArea';
import styles from './styles.module.scss';

type InputProps = Pick<Partial<TextAreaProps>, 'value'> &
  Pick<TextAreaProps, 'id' | 'name' | 'placeholder' | 'maxLength' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  'className' | 'label' | 'labelTooltip' | 'required' | 'hint' | 'size' | 'validationState' | 'showHintIcon'
>;

type FieldTextAreaOwnProps = {
  maxRows?: number;
  resizable?: boolean;
  onChange?(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
  showCopyButton?: boolean;
  allowMoreThanMaxLength: boolean;
};

export type FieldTextAreaProps = WithSupportProps<FieldTextAreaOwnProps & InputProps & WrapperProps>;

const ForwardedFieldTextArea = forwardRef<HTMLTextAreaElement, FieldTextAreaProps>(
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
      showCopyButton = true,
      allowMoreThanMaxLength = true,
      showHintIcon,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      className,
      label,
      labelTooltip,
      required,
      hint,
      size = Size.S,
      validationState = ValidationState.Default,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const isResizable = !readonly && !disabled && resizable;
    const [value, onChange] = useUncontrolledProp(valueProp, '', onChangeProp);

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
          className={styles.container}
          size={size}
          validationState={validationState}
          disabled={disabled}
          readonly={readonly}
          data-resizable={isResizable || undefined}
          variant={ContainerVariant.MultiLine}
          style={{ '--max-rows': maxRows }}
          inputRef={localRef}
          postfix={
            <span className={styles.postfix}>
              {value && !disabled && !readonly && <ButtonClearValue size={ButtonSizeMap[size]} onClick={handleClear} />}
              {showCopyButton && value && !disabled && readonly && (
                <ButtonCopyValue size={ButtonSizeMap[size]} valueToCopy={value} />
              )}
            </span>
          }
        >
          <Scroll
            className={styles.scrollContainer}
            size={Scroll.sizes.S}
            barHideStrategy={Scroll.barHideStrategies.Never}
            resize={isResizable ? Scroll.resizes.Vertical : Scroll.resizes.None}
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
              maxLength={allowMoreThanMaxLength ? undefined : maxLength || undefined}
              data-test-id='field-textarea__input'
            />
          </Scroll>
        </FieldContainerPrivate>
      </FieldDecorator>
    );
  },
);

export const FieldTextArea = ForwardedFieldTextArea as typeof ForwardedFieldTextArea & {
  sizes: typeof Size;
  validationState: typeof ValidationState;
};

FieldTextArea.sizes = Size;
FieldTextArea.validationState = ValidationState;
