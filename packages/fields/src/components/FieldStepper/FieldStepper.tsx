import mergeRefs from 'merge-refs';
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  KeyboardEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { ButtonFunction } from '@snack-uikit/button';
import { MinusSVG, PlusSVG } from '@snack-uikit/icons';
import { InputPrivate, InputPrivateProps, SIZE } from '@snack-uikit/input-private';
import { useLocale } from '@snack-uikit/locale';
import { Tooltip } from '@snack-uikit/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import styles from './styles.module.scss';

type InputProps = Pick<
  InputPrivateProps,
  'id' | 'name' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur' | 'min' | 'max'
>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  | 'className'
  | 'label'
  | 'labelTooltip'
  | 'required'
  | 'hint'
  | 'showHintIcon'
  | 'size'
  | 'validationState'
  | 'labelTooltipPlacement'
>;

type FieldStepperOwnProps = {
  /** Значение поля */
  value?: number;
  /** Колбек смены значения */
  onChange?(value: number, e?: ChangeEvent<HTMLInputElement>): void;
  /** Шаг поля */
  step?: number;
  /** Можно ли вводить c клавиатуры числа, выходящие за пределы min/max */
  allowMoreThanLimits?: boolean;
};

export type FieldStepperProps = WithSupportProps<FieldStepperOwnProps & InputProps & WrapperProps>;

const TOOLTIP_TIMEOUT = 2000;

export const FieldStepper = forwardRef<HTMLInputElement, FieldStepperProps>(
  (
    {
      id,
      name,
      value: valueProp,
      min,
      max,
      step = 1,
      disabled = false,
      readonly = false,
      allowMoreThanLimits = true,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      className,
      label,
      labelTooltip,
      labelTooltipPlacement,
      required = false,
      hint,
      showHintIcon,
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      ...rest
    },
    ref,
  ) => {
    const [locales] = useLocale('Fields');
    const [value, setValue] = useUncontrolledProp(valueProp, 0, onChangeProp);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltip, setTooltip] = useState('');
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const inputRef = useRef<HTMLInputElement>(null);
    const minusButtonRef = useRef<HTMLButtonElement>(null);
    const plusButtonRef = useRef<HTMLButtonElement>(null);
    const isMinusButtonDisabled = value === min || readonly || disabled;
    const isPlusButtonDisabled = value === max || readonly || disabled;

    const adjustValue = (value: number) => {
      setValue(value);
      setTooltipOpen(true);

      timerRef.current = setTimeout(() => {
        setTooltipOpen(false);
        setTooltip('');
      }, TOOLTIP_TIMEOUT);
    };

    useEffect(
      () => () => {
        clearTimeout(timerRef.current);
      },
      [],
    );

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (!allowMoreThanLimits) {
        if (max !== undefined && value > max) {
          setTooltip(`${locales.limitTooltip.max}${max}`);
          adjustValue(max);
        }

        if (min !== undefined && value < min) {
          setTooltip(`${locales.limitTooltip.min}${min}`);
          adjustValue(min);
        }
      }

      onBlur?.(event);
    };

    const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
      clearTimeout(timerRef.current);
      setTooltipOpen(false);
      setTooltip('');

      onFocus?.(event);
    };

    const handleInputChange = (value: string, event: ChangeEvent<HTMLInputElement>) => setValue(Number(value), event);

    const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
      if (readonly || disabled) {
        return;
      }

      if (event.key === 'ArrowRight' && !isPlusButtonDisabled) {
        plusButtonRef.current?.focus();
      }

      if (event.key === 'ArrowLeft' && !isMinusButtonDisabled) {
        minusButtonRef.current?.focus();
      }
    };

    const handleMinusButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(min !== undefined ? Math.max(min, value - step) : value - step);
    };

    const handlePlusButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(max !== undefined ? Math.min(max, value + step) : value + step);
    };

    const handleMinusButtonKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
      if (readonly || disabled) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    const handlePlusButtonKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
      if (readonly || disabled) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    return (
      <FieldDecorator
        className={className}
        label={label}
        labelTooltip={labelTooltip}
        labelTooltipPlacement={labelTooltipPlacement}
        labelFor={id}
        required={required}
        hint={hint}
        disabled={disabled}
        readonly={readonly}
        showHintIcon={showHintIcon}
        size={size}
        validationState={validationState}
        {...extractSupportProps(rest)}
      >
        <Tooltip
          tip={tooltip}
          open={allowMoreThanLimits ? false : tooltipOpen}
          data-test-id='field-stepper__limit-tooltip'
        >
          <FieldContainerPrivate
            size={size}
            validationState={validationState}
            disabled={disabled}
            readonly={readonly}
            variant={CONTAINER_VARIANT.SingleLine}
            inputRef={inputRef}
            prefix={
              <ButtonFunction
                tabIndex={-1}
                ref={minusButtonRef}
                size='xs'
                className={styles.button}
                icon={<MinusSVG />}
                onClick={handleMinusButtonClick}
                onKeyDown={handleMinusButtonKeyDown}
                disabled={isMinusButtonDisabled}
                data-test-id='field-stepper__minus-button'
              />
            }
            postfix={
              <ButtonFunction
                ref={plusButtonRef}
                tabIndex={-1}
                size='xs'
                className={styles.button}
                icon={<PlusSVG />}
                onClick={handlePlusButtonClick}
                onKeyDown={handlePlusButtonKeyDown}
                disabled={isPlusButtonDisabled}
                data-test-id='field-stepper__plus-button'
              />
            }
          >
            <InputPrivate
              ref={mergeRefs(ref, inputRef)}
              className={styles.stepper}
              data-size={size}
              value={String(value)}
              tabIndex={0}
              onKeyDown={handleInputKeyDown}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              disabled={disabled}
              readonly={readonly}
              type='number'
              id={id}
              name={name}
              min={min}
              max={max}
              data-test-id='field-stepper__input'
            />
          </FieldContainerPrivate>
        </Tooltip>
      </FieldDecorator>
    );
  },
);
