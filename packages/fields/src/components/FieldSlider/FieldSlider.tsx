import mergeRefs from 'merge-refs';
import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { InputPrivate, InputPrivateProps, SIZE } from '@snack-uikit/input-private';
import { Slider, SliderProps as SliderComponentProps } from '@snack-uikit/slider';
import { extractSupportProps, useEventHandler, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useValueControl } from '../../hooks';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import { generateAllowedValues, getClosestMark, getTextFieldValue, isMarkObject } from './helpers';
import styles from './styles.module.scss';
import { TextInputFormatter } from './types';

type SliderProps = Pick<InputPrivateProps, 'id' | 'name' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'> &
  Pick<SliderComponentProps, 'range' | 'value' | 'onChange' | 'tipFormatter'> &
  Required<Pick<SliderComponentProps, 'min' | 'max' | 'step' | 'marks'>>;

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
  | 'labelTooltipPlacement'
>;

type FieldSliderOwnProps = {
  /** Иконка-постфикс для поля */
  postfixIcon?: ReactElement;
  /** Отображение линейки */
  showScaleBar?: boolean;
  /** Функция для форматирования значений в текстовом поле */
  textInputFormatter?: TextInputFormatter;
  /** Отвязать текстовое поле от значений на линейке */
  unbindInputFromMarks?: boolean;
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
      caption,
      hint,
      showHintIcon,
      size = SIZE.S,
      postfixIcon,
      textInputFormatter,
      unbindInputFromMarks,
      ...rest
    },
    ref,
  ) => {
    const getMarkValue = useCallback(
      (key: keyof SliderProps['marks']) => {
        const mark = marks[key];

        if (isMarkObject(mark)) {
          return mark.label;
        }

        return mark;
      },
      [marks],
    );

    const hasMarksEqualToValues = useMemo(
      () => Object.keys(marks).every(key => key === getMarkValue(key)),
      [getMarkValue, marks],
    );

    const [value = getDefaultValue(range, min, max, valueProp), onChange] = useValueControl<number | number[]>({
      value: valueProp,
      defaultValue: getDefaultValue(range, min, max, valueProp),
      onChange: onChangeProp,
    });

    const [textFieldInputValue, setTextFieldInputValue] = useState<string>(
      getTextFieldValue(value, textInputFormatter),
    );
    const localRef = useRef<HTMLInputElement>(null);

    const onTextFieldChange = (textFieldValue: string) => {
      const numValue = parseInt(textFieldValue);

      if (textFieldValue && Number.isNaN(numValue)) {
        return;
      }

      setTextFieldInputValue(textFieldValue);
    };

    const handleNonEqualMarksSliderChange = (textFieldNumValue: number) => {
      const handleChange = (key: string | number) => {
        setTextFieldInputValue(String(getMarkValue(key)));
        onChange(Number(key));
      };

      const allowedValues = Object.keys(marks).map(key => ({
        key,
        value: parseInt(String(getMarkValue(key))),
      }));
      const suitableEntry = allowedValues.find(entry => entry.value === textFieldNumValue);

      if (suitableEntry) {
        handleChange(suitableEntry.key);
        return;
      }

      const actualMin = parseInt(String(getMarkValue(min)));
      const actualMax = parseInt(String(getMarkValue(max)));

      if (textFieldNumValue < actualMin) {
        handleChange(min);
        return;
      }

      if (textFieldNumValue > actualMax) {
        handleChange(max);
        return;
      }

      const { mark } = getClosestMark(textFieldNumValue, allowedValues, mark => mark.value);
      handleChange(mark.key);
    };

    const handleEqualMarksSliderChange = (textFieldNumValue: number) => {
      const handleChange = (value: number) => {
        setTextFieldInputValue(String(value));
        onChange(value);
      };

      if (textFieldNumValue <= min) {
        handleChange(min);
        return;
      }

      if (textFieldNumValue >= max) {
        handleChange(max);
        return;
      }

      if (step === null) {
        const allowedValues = Object.keys(marks).map(Number);
        if (allowedValues.includes(textFieldNumValue)) {
          setTextFieldInputValue(String(textFieldNumValue));
          handleChange(textFieldNumValue);
          return;
        }

        const { mark } = getClosestMark(textFieldNumValue, allowedValues, mark => mark);
        handleChange(mark);
        return;
      }

      const allowedValues = generateAllowedValues(min, max, step);
      if (allowedValues.includes(textFieldNumValue)) {
        handleChange(textFieldNumValue);
        return;
      }

      const { mark } = getClosestMark(textFieldNumValue, allowedValues, mark => mark);
      handleChange(mark);
    };

    const handleTextValueChange = useEventHandler(() => {
      if (range) {
        return;
      }

      const parsedValue = parseInt(textFieldInputValue);
      const actualMinByMark = parseInt(String(getMarkValue(min)));
      const actualMin = Number.isNaN(actualMinByMark) ? min : actualMinByMark;

      const textFieldNumValue = textFieldInputValue ? parsedValue : actualMin;

      if (Number.isNaN(textFieldNumValue)) {
        return;
      }

      if (hasMarksEqualToValues || unbindInputFromMarks) {
        handleEqualMarksSliderChange(textFieldNumValue);
      } else {
        handleNonEqualMarksSliderChange(textFieldNumValue);
      }
    });

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

    useEffect(() => {
      handleTextValueChange();
    }, [marks, min, max, handleTextValueChange]);

    return (
      <FieldDecorator
        className={className}
        label={label}
        labelTooltip={labelTooltip}
        labelTooltipPlacement={labelTooltipPlacement}
        labelFor={id}
        disabled={disabled}
        required={required}
        caption={caption}
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
