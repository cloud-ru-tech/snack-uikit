import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  KeyboardEventHandler,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { MinusSVG, PlusSVG } from '@snack-uikit/icons';
import { InputPrivate, InputPrivateProps, SIZE } from '@snack-uikit/input-private';
import { useLocale } from '@snack-uikit/locale';
import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { usePostfix, usePrefix, useValueControl } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import styles from './styles.module.scss';

type InputProps = Pick<
  InputPrivateProps,
  'id' | 'name' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur' | 'min' | 'max' | 'autoFocus'
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

type FieldStepperOwnProps = {
  /** Значение поля */
  value?: number;
  /** Колбек смены значения */
  onChange?(value: number, e?: ChangeEvent<HTMLInputElement>): void;
  /** Шаг поля */
  step?: number;
  /** Можно ли вводить c клавиатуры числа, выходящие за пределы min/max */
  allowMoreThanLimits?: boolean;
  /** Произвольный префикс для поля */
  prefix?: ReactNode;
  /** Произвольный постфикс для поля */
  postfix?: ReactNode;
  /** Тултип над кнопкой увеличения значения */
  plusButtonTooltip?: TooltipProps;
  /** Тултип над кнопкой уменьшения значения */
  minusButtonTooltip?: TooltipProps;
};

export type FieldStepperProps = WithSupportProps<FieldStepperOwnProps & InputProps & WrapperProps>;

const TOOLTIP_TIMEOUT = 2000;

const getDefaultValue = (min: number, max: number) => {
  if (min > 0) {
    return min;
  }

  if (max < 0) {
    return max;
  }

  return 0;
};

const SymbolWidth = {
  s: 8,
  m: 9,
  l: 10,
};

export const FieldStepper = forwardRef<HTMLInputElement, FieldStepperProps>(
  (
    {
      id,
      name,
      value: valueProp,
      min = Number.NEGATIVE_INFINITY,
      max = Number.POSITIVE_INFINITY,
      plusButtonTooltip,
      minusButtonTooltip,
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
      caption,
      hint,
      showHintIcon,
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      error,
      prefix,
      postfix,
      autoFocus,
      ...rest
    },
    ref,
  ) => {
    const { t } = useLocale('Fields');
    const [value = 0, setValue] = useValueControl<number>({
      value: valueProp,
      defaultValue: getDefaultValue(min, max),
      onChange: onChangeProp,
    });
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltip, setTooltip] = useState('');
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const inputRef = useRef<HTMLInputElement>(null);

    const isMinusButtonDisabled = (typeof min === 'number' && value <= min) || readonly || disabled;
    const isPlusButtonDisabled = (typeof max === 'number' && value >= max) || readonly || disabled;

    const prefixSettings = usePrefix({ prefix, disabled });
    const postfixSettings = usePostfix({ postfix, disabled });

    const fieldValidationState = getValidationState({ validationState, error });

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
          setTooltip(`${t('limitTooltip.max')}${max}`);
          adjustValue(max);
        }

        if (min !== undefined && value < min) {
          setTooltip(`${t('limitTooltip.min')}${min}`);
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

    const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = () => {
      if (readonly || disabled) {
        return;
      }
    };

    const handleMinusButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(Math.min(Math.max(min, value - step), max));
    };

    const handlePlusButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setValue(Math.max(Math.min(max, value + step), min));
    };

    const handleMinusButtonKeyDown: KeyboardEventHandler<HTMLInputElement> = () => {
      if (readonly || disabled) {
        return;
      }
    };

    const handlePlusButtonKeyDown: KeyboardEventHandler<HTMLInputElement> = () => {
      if (readonly || disabled) {
        return;
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
        caption={caption}
        hint={hint}
        disabled={disabled}
        readonly={readonly}
        showHintIcon={showHintIcon}
        size={size}
        validationState={fieldValidationState}
        error={error}
        {...extractSupportProps(rest)}
      >
        <Tooltip
          tip={tooltip}
          open={allowMoreThanLimits ? false : tooltipOpen}
          data-test-id='field-stepper__limit-tooltip'
          triggerClassName={styles.trigger}
        >
          <FieldContainerPrivate
            size={size}
            validationState={fieldValidationState}
            disabled={disabled}
            readonly={readonly}
            variant={CONTAINER_VARIANT.SingleLine}
            inputRef={inputRef}
            prefix={
              <Tooltip
                {...minusButtonTooltip}
                open={minusButtonTooltip ? minusButtonTooltip?.open : false}
                tip={minusButtonTooltip?.tip}
                data-test-id='field-stepper__minus-button-tooltip'
              >
                <ButtonFunction
                  tabIndex={-1}
                  size='xs'
                  className={styles.button}
                  icon={<MinusSVG />}
                  onClick={handleMinusButtonClick}
                  onKeyDown={handleMinusButtonKeyDown}
                  disabled={isMinusButtonDisabled}
                  data-test-id='field-stepper__minus-button'
                />
              </Tooltip>
            }
            postfix={
              <Tooltip
                {...plusButtonTooltip}
                open={plusButtonTooltip ? plusButtonTooltip?.open : false}
                tip={plusButtonTooltip?.tip}
                data-test-id='field-stepper__plus-button-tooltip'
              >
                <ButtonFunction
                  tabIndex={-1}
                  size='xs'
                  className={styles.button}
                  icon={<PlusSVG />}
                  onClick={handlePlusButtonClick}
                  onKeyDown={handlePlusButtonKeyDown}
                  disabled={isPlusButtonDisabled}
                  data-test-id='field-stepper__plus-button'
                />
              </Tooltip>
            }
          >
            <div className={styles.wrap}>
              <div className={cn({ [styles.prefixWrapper]: prefixSettings.show })}>
                {prefixSettings.show && prefixSettings.render({ key: prefixSettings.id })}
              </div>

              <div
                style={{
                  width: String(value).length * SymbolWidth[size],
                  maxWidth: '100%',
                }}
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
                  step={step}
                  name={name}
                  min={min}
                  max={max}
                  autoFocus={autoFocus}
                  data-test-id='field-stepper__input'
                />
              </div>
              <div className={cn({ [styles.postfixWrapper]: postfixSettings.show })}>
                {postfixSettings.show && postfixSettings.render({ key: postfixSettings.id })}
              </div>
            </div>
          </FieldContainerPrivate>
        </Tooltip>
      </FieldDecorator>
    );
  },
);
