import mergeRefs from 'merge-refs';
import { ChangeEvent, forwardRef, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Scroll } from '@snack-ui/scroll';
import { Tooltip } from '@snack-ui/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ContainerVariant, Size, ValidationState } from '../../constants';
import { FieldContainerPrivate, TextArea, TextAreaProps } from '../../helperComponents';
import { useButtonNavigation, useClearButton, useCopyButton } from '../../hooks';
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
>;

type FieldTextAreaOwnProps = {
  maxRows?: number;
  resizable?: boolean;
  onChange?(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
  showCopyButton?: boolean;
  allowMoreThanMaxLength?: boolean;
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
      showCopyButton: showCopyButtonProp = true,
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
      size = Size.S,
      validationState = ValidationState.Default,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const isResizable = !readonly && !disabled && resizable;
    const [value, onChange] = useUncontrolledProp(valueProp, '', onChangeProp);
    const showCopyButton = showCopyButtonProp && Boolean(value) && !disabled && readonly;
    const showClearButton = Boolean(value) && !disabled && !readonly;

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
          className={styles.container}
          size={size}
          validationState={validationState}
          disabled={disabled}
          readonly={readonly}
          data-resizable={isResizable || undefined}
          variant={ContainerVariant.MultiLine}
          style={{ '--max-rows': maxRows }}
          inputRef={localRef}
          postfix={<span className={styles.postfix}>{buttons}</span>}
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

export const FieldTextArea = ForwardedFieldTextArea as typeof ForwardedFieldTextArea & {
  sizes: typeof Size;
  validationStates: typeof ValidationState;
  labelTooltipPlacements: typeof Tooltip.placements;
};

FieldTextArea.sizes = Size;
FieldTextArea.validationStates = ValidationState;
FieldTextArea.labelTooltipPlacements = Tooltip.placements;
