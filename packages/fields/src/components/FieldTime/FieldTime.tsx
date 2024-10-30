import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { TimePicker, TimePickerProps } from '@snack-uikit/calendar';
import { Dropdown } from '@snack-uikit/dropdown';
import { WatchSVG } from '@snack-uikit/icons';
import {
  ButtonProps,
  ICON_SIZE,
  InputPrivate,
  InputPrivateProps,
  runAfterRerender,
  SIZE,
  useButtonNavigation,
  useClearButton,
} from '@snack-uikit/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, DEFAULT_LOCALE, SlotKey, TIME_MODES, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton, useDateField, useFocusHandlers, useHandlers } from '../../hooks';
import { getValidationState } from '../../utils/getValidationState';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import styles from './styles.module.scss';

type InputProps = Pick<InputPrivateProps, 'id' | 'name' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

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

type FieldTimeOwnProps = {
  /** Открыт time-picker */
  open?: boolean;
  /** Колбек открытия пикера */
  onOpenChange?(value: boolean): void;
  /** Значение поля */
  value?: TimePickerProps['value'];
  /** Колбек смены значения */
  onChange?: TimePickerProps['onChangeValue'];
  /** Отображение кнопки копирования */
  showCopyButton?: boolean;
  /** Показывать ли секунды */
  showSeconds?: boolean;
  /**
   * Отображение кнопки Очистки поля
   * @default true
   */
  showClearButton?: boolean;
};

export type FieldTimeProps = WithSupportProps<FieldTimeOwnProps & InputProps & WrapperProps>;

const getStringTimeValue = (
  time: TimePickerProps['value'],
  { showSeconds, locale }: Pick<TimePickerProps, 'showSeconds'> & { locale: Intl.Locale },
) => {
  if (!time) {
    return '';
  }

  const date = new Date();
  date.setHours(time.hours ?? 0);
  date.setMinutes(time.minutes ?? 0);
  date.setSeconds(time.seconds ?? 0);

  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: showSeconds ? 'numeric' : undefined,
  });
};

export const FieldTime = forwardRef<HTMLInputElement, FieldTimeProps>(
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
      onOpenChange,
      onChange,
      onFocus,
      onBlur: onBlurProp,
      className,
      label,
      labelTooltip,
      labelTooltipPlacement,
      required = false,
      caption,
      hint,
      showHintIcon,
      showSeconds = true,
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      error,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);

    const localRef = useRef<HTMLInputElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const calendarIconSize = size === SIZE.S ? ICON_SIZE.Xs : ICON_SIZE.S;
    const showDropList = isOpen && !readonly && !disabled;
    const showAdditionalButton = Boolean(valueProp && !disabled);
    const showClearButton = showClearButtonProp && showAdditionalButton && !readonly;
    const showCopyButton = showCopyButtonProp && showAdditionalButton && readonly;
    const fieldValidationState = getValidationState({ validationState, error });
    const navigationStartRef: TimePickerProps['navigationStartRef'] = useRef(null);

    const checkForLeavingFocus = useCallback(
      <T extends HTMLInputElement | HTMLButtonElement>(event: KeyboardEvent<T>) => {
        if (event.key === 'ArrowDown') {
          setIsOpen(true);
          setTimeout(() => navigationStartRef.current?.focus(), 0);
        }
      },
      [setIsOpen],
    );

    const handleClear = useCallback(() => {
      onChange && onChange(undefined);
      if (localRef.current?.value) {
        localRef.current.value = '';
      }

      if (required) {
        localRef.current?.focus();
        setIsOpen(true);
      } else {
        localRef.current?.blur();
        setIsOpen(false);
      }
    }, [onChange, required, setIsOpen]);

    const valueToCopy = getStringTimeValue(valueProp, { showSeconds, locale: DEFAULT_LOCALE });
    const clearButtonSettings = useClearButton({ clearButtonRef, showClearButton, size, onClear: handleClear });
    const copyButtonSettings = useCopyButton({ copyButtonRef, showCopyButton, size, valueToCopy });
    const calendarIcon: ButtonProps = useMemo(
      () => ({
        active: false,
        show: true,
        id: 'watchIcon',
        render: props => (
          <WatchSVG {...props} size={calendarIconSize} className={styles.calendarIcon} data-size={size} />
        ),
      }),
      [calendarIconSize, size],
    );

    const memorizedButtons = useMemo(
      () => [clearButtonSettings, copyButtonSettings, calendarIcon],
      [clearButtonSettings, copyButtonSettings, calendarIcon],
    );

    const {
      value,
      handleChange,
      handleClick: timeInputClickHandler,
      handleKeyDown: timeInputKeyDownHandler,
      handleBlur: timeInputBlurHandler,
      mask,
      setInputFocus,
    } = useDateField({
      inputRef: localRef,
      onChange,
      readonly,
      locale: DEFAULT_LOCALE,
      setIsOpen,
      mode: showSeconds ? TIME_MODES.FullTime : TIME_MODES.NoSeconds,
      showSeconds,
    });

    const setInputFocusFromButtons = useCallback(() => setInputFocus(SlotKey.Seconds), [setInputFocus]);

    const {
      postfixButtons,
      inputTabIndex,
      onInputKeyDown: navigationInputKeyDownHandler,
      setInitialTabIndices,
    } = useButtonNavigation({
      setInputFocus: setInputFocusFromButtons,
      inputRef: localRef,
      postfixButtons: memorizedButtons,
      onButtonKeyDown: checkForLeavingFocus,
      readonly,
      submitKeys: ['Enter', 'Space', 'Tab'],
    });

    const handleSelectTime = (time: TimePickerProps['value']) => {
      onChange && onChange(time);
      localRef.current?.focus();
      setIsOpen(false);

      if (localRef.current) {
        localRef.current.value = getStringTimeValue(time, { showSeconds, locale: DEFAULT_LOCALE });
      }
    };

    const handleCalendarFocusLeave: TimePickerProps['onFocusLeave'] = () => {
      setInitialTabIndices();
      // TODO: find out why it works not as expected (focus is moved to the next element instead of the focused one)
      // maybe floating-ui causes the problem
      runAfterRerender(() => {
        setInputFocus(SlotKey.Hours);
        setIsOpen(false);
      });
    };

    const handleInputKeyDown = useHandlers<KeyboardEvent<HTMLInputElement>>([
      checkForLeavingFocus,
      timeInputKeyDownHandler,
      navigationInputKeyDownHandler,
    ]);

    useEffect(() => {
      if (open) {
        localRef.current?.focus();
      }
    }, [open]);

    // TODO input ref - determine whether to update ref based on input/non-input state
    useEffect(() => {
      if (localRef.current && document.activeElement !== localRef.current) {
        localRef.current.value = getStringTimeValue(valueProp, { showSeconds, locale: DEFAULT_LOCALE });
      }
    }, [showSeconds, valueProp]);

    const onFocusByKeyboard = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        setInputFocus();
        onFocus?.(e);
      },
      [onFocus, setInputFocus],
    );

    const inputHandlers = useFocusHandlers({
      onFocusByClick: onFocus,
      onFocusByKeyboard,
    });

    const onBlur = useHandlers([timeInputBlurHandler, inputHandlers.onBlur, onBlurProp]);

    const onClick = useCallback(
      (e: MouseEvent<HTMLInputElement>) => {
        timeInputClickHandler();
        if (isOpen) {
          // stop the event because want picker to stay opened
          e.stopPropagation();
        }
      },
      [timeInputClickHandler, isOpen],
    );

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
            <TimePicker
              size={size}
              value={valueProp}
              onChangeValue={handleSelectTime}
              navigationStartRef={navigationStartRef}
              onFocusLeave={handleCalendarFocusLeave}
              data-test-id='field-time__timepicker'
              fitToContainer={false}
              showSeconds={showSeconds}
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
            postfix={postfixButtons}
          >
            <InputPrivate
              ref={mergeRefs(ref, localRef)}
              data-size={size}
              value={value || ''}
              placeholder={mask}
              onChange={handleChange}
              onFocus={inputHandlers.onFocus}
              onMouseDown={inputHandlers.onMouseDown}
              onBlur={onBlur}
              onKeyDown={handleInputKeyDown}
              onClick={onClick}
              disabled={disabled}
              readonly={readonly}
              tabIndex={inputTabIndex}
              type='text'
              id={id}
              name={name}
              data-test-id='field-time__input'
            />
          </FieldContainerPrivate>
        </Dropdown>
      </FieldDecorator>
    );
  },
);
