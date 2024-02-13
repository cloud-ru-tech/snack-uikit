import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { InputPrivate, InputPrivateProps, SIZE } from '@snack-uikit/input-private';
import { Slider, SliderProps as SliderComponentProps } from '@snack-uikit/slider';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import { generateAllowedValues, getClosestMark, getTextFieldValue } from './helpers';
import styles from './styles.module.scss';
import { TextInputFormatter } from './types';

type SliderProps = Pick<InputPrivateProps, 'id' | 'name' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'> &
  Pick<SliderComponentProps, 'range' | 'value' | 'onChange' | 'tipFormatter'> &
  Required<Pick<SliderComponentProps, 'min' | 'max' | 'step' | 'marks'>>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  'className' | 'label' | 'labelTooltip' | 'required' | 'hint' | 'showHintIcon' | 'size' | 'labelTooltipPlacement'
>;

type FieldSliderOwnProps = {
  /** Иконка-постфикс для поля */
  postfixIcon?: ReactElement;
  /** Отображение линейки */
  showScaleBar?: boolean;
  /** Функция для форматирования значений в текстовом поле */
  textInputFormatter?: TextInputFormatter;
};

export type FieldSliderProps = WithSupportProps<FieldSliderOwnProps & SliderProps & WrapperProps>;

const getDefaultValue = (
  range: boolean,
  min: FieldSliderProps['min'],
  max: FieldSliderProps['max'],
  value: FieldSliderProps['value'],
): number | number[] => {
  if (range) {
    if (value) {
      return value;
    }

    return [min, max];
  }

  return value ?? min;
};

export const FieldSlider = forwardRef<HTMLInputElement, FieldSliderProps>(
  (
    {
      id,
      name,
      min,
      max,
      step,
      marks,
      showScaleBar = true,
      value: valueProp,
      range = false,
      disabled = false,
      readonly = false,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      className,
      label,
      labelTooltip,
      labelTooltipPlacement,
      required,
      hint,
      showHintIcon,
      size = SIZE.S,
      postfixIcon,
      textInputFormatter,
      ...rest
    },
    ref,
  ) => {
    const [value, onChange] = useUncontrolledProp(valueProp, getDefaultValue(range, min, max, valueProp), onChangeProp);
    const [textFieldInputValue, setTextFieldInputValue] = useState<string>(
      getTextFieldValue(value, textInputFormatter),
    );
    const localRef = useRef<HTMLInputElement>(null);

    const onTextFieldChange = (textFieldValue: string) => {
      const numValue = Number(textFieldValue);
      if (Number.isNaN(numValue)) {
        return;
      }

      setTextFieldInputValue(textFieldValue);
    };

    const handleTextValueChange = () => {
      const textFieldNumValue = Number(textFieldInputValue);
      if (Number.isNaN(textFieldNumValue)) {
        return;
      }

      if (textFieldNumValue < min) {
        setTextFieldInputValue(String(min));
        onChange(min);
        return;
      }

      if (textFieldNumValue > max) {
        setTextFieldInputValue(String(max));
        onChange(max);
        return;
      }

      if (step === null) {
        const allowedValues = Object.keys(marks).map(Number);
        if (allowedValues.includes(textFieldNumValue)) {
          onChange(textFieldNumValue);
          return;
        }

        const { mark } = getClosestMark(textFieldNumValue, allowedValues);
        setTextFieldInputValue(String(mark));
        onChange(mark);
        return;
      }

      const allowedValues = generateAllowedValues(min, max, step);
      if (allowedValues.includes(textFieldNumValue)) {
        onChange(textFieldNumValue);
        return;
      }

      const { mark } = getClosestMark(textFieldNumValue, allowedValues);
      setTextFieldInputValue(String(mark));
      onChange(mark);
    };

    const onTextFieldBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
      onBlur?.(e);
      handleTextValueChange();
    };

    const handleTextFieldKeyChange = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleTextValueChange();
      }
    };

    useEffect(() => {
      setTextFieldInputValue(getTextFieldValue(value, textInputFormatter));
    }, [value, textInputFormatter]);

    return (
      <FieldDecorator
        className={className}
        label={label}
        labelTooltip={labelTooltip}
        labelTooltipPlacement={labelTooltipPlacement}
        labelFor={id}
        disabled={disabled}
        required={required}
        hint={hint}
        showHintIcon={showHintIcon}
        readonly={readonly}
        size={size}
        {...extractSupportProps(rest)}
      >
        <FieldContainerPrivate
          className={styles.fieldContainer}
          size={size}
          validationState={VALIDATION_STATE.Default}
          disabled={disabled}
          readonly={readonly}
          variant={CONTAINER_VARIANT.SingleLine}
          inputRef={localRef}
          postfix={postfixIcon}
        >
          <InputPrivate
            ref={mergeRefs(ref, localRef)}
            data-size={size}
            value={textFieldInputValue}
            onChange={range ? undefined : onTextFieldChange}
            onFocus={onFocus}
            onBlur={range ? onBlur : onTextFieldBlur}
            onKeyDown={handleTextFieldKeyChange}
            disabled={disabled}
            readonly={range ? true : readonly}
            type='text'
            id={id}
            name={name}
            data-test-id='field-slider__input'
          />
        </FieldContainerPrivate>
        <div className={styles.sliderWrapper}>
          <div className={styles.slider} data-size={size}>
            <Slider
              range={range}
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={onChange}
              marks={showScaleBar ? marks : undefined}
              disabled={readonly || disabled}
              data-test-id='field-slider__slider'
            />
          </div>
        </div>
      </FieldDecorator>
    );
  },
);
