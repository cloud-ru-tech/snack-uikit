import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Calendar, CalendarProps } from '@snack-uikit/calendar';
import { Dropdown } from '@snack-uikit/dropdown';
import { CalendarSVG } from '@snack-uikit/icons';
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

import { CONTAINER_VARIANT, DEFAULT_LOCALE, MODES, SlotKey, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton, useDateField, useFocusHandlers, useHandlers } from '../../hooks';
import { Mode } from '../../types';
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

type FieldDateWithSeconds = {
  mode: typeof MODES.DateTime;
  showSeconds?: boolean;
};

type FieldDateOwnProps = {
  /** Открыт date-picker */
  open?: boolean;
  /** Колбек открытия пикера */
  onOpenChange?(value: boolean): void;
  /** Значение поля */
  value?: Date;
  /** Колбек смены значения */
  onChange?(value: Date | undefined): void;
  /** Отображение кнопки копирования */
  showCopyButton?: boolean;
  /**
   * Отображение кнопки Очистки поля
   * @default true
   */
  showClearButton?: boolean;
  mode: Mode;
} & Pick<CalendarProps, 'buildCellProps'> &
  (
    | {
        mode: typeof MODES.Date;
      }
    | FieldDateWithSeconds
  );

export type FieldDateProps = WithSupportProps<FieldDateOwnProps & InputProps & WrapperProps>;

export const FieldDate = forwardRef<HTMLInputElement, FieldDateProps>(
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
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      buildCellProps,
      error,
      mode,
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
    const showSeconds = mode === 'date-time' ? ((rest as FieldDateWithSeconds).showSeconds ?? true) : undefined;
    const fieldValidationState = getValidationState({ validationState, error });

    const navigationStartRef: CalendarProps['navigationStartRef'] = useRef(null);

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

    const getStringDateValue = useCallback(
      (date: Date | undefined) => {
        if (!date) return '';

        if (mode === 'date') {
          return date.toLocaleDateString(DEFAULT_LOCALE);
        }

        return date.toLocaleString(DEFAULT_LOCALE, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: showSeconds ? '2-digit' : undefined,
        });
      },
      [mode, showSeconds],
    );

    const valueToCopy = getStringDateValue(valueProp);
    const clearButtonSettings = useClearButton({ clearButtonRef, showClearButton, size, onClear: handleClear });
    const copyButtonSettings = useCopyButton({ copyButtonRef, showCopyButton, size, valueToCopy });
    const calendarIcon: ButtonProps = useMemo(
      () => ({
        active: false,
        show: true,
        id: 'calendarIcon',
        render: props => (
          <CalendarSVG {...props} size={calendarIconSize} className={styles.calendarIcon} data-size={size} />
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
      handleClick: dateInputClickHandler,
      handleKeyDown: dateInputKeyDownHandler,
      handleBlur: dateInputBlurHandler,
      mask,
      setInputFocus,
    } = useDateField({
      inputRef: localRef,
      onChange,
      readonly,
      locale: DEFAULT_LOCALE,
      setIsOpen,
      mode,
      showSeconds,
    });

    const setInputFocusFromButtons = useCallback(
      () => setInputFocus(mode === 'date' ? SlotKey.Year : SlotKey.Seconds),
      [mode, setInputFocus],
    );

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

    const handleSelectDate = (date: Date) => {
      onChange && onChange(date);
      localRef.current?.focus();
      setIsOpen(false);

      if (localRef.current) {
        localRef.current.value = getStringDateValue(date);
      }
    };

    const handleCalendarFocusLeave: CalendarProps['onFocusLeave'] = () => {
      setInitialTabIndices();
      // TODO: find out why it works not as expected (focus is moved to the next element instead of the focused one)
      // maybe floating-ui causes the problem
      runAfterRerender(() => {
        setInputFocus(SlotKey.Day);
        setIsOpen(false);
      });
    };

    const handleInputKeyDown = useHandlers<KeyboardEvent<HTMLInputElement>>([
      checkForLeavingFocus,
      dateInputKeyDownHandler,
      navigationInputKeyDownHandler,
    ]);

    useEffect(() => {
      if (open) {
        localRef.current?.focus();
      }
    }, [open]);

    useEffect(() => {
      if (localRef.current && document.activeElement !== localRef.current) {
        localRef.current.value = getStringDateValue(valueProp);
      }
    }, [getStringDateValue, valueProp]);

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

    const onBlur = useHandlers([dateInputBlurHandler, inputHandlers.onBlur, onBlurProp]);

    const onClick = useCallback(
      (e: MouseEvent<HTMLInputElement>) => {
        dateInputClickHandler();
        if (isOpen) {
          // stop the event because want picker to stay opened
          e.stopPropagation();
        }
      },
      [dateInputClickHandler, isOpen],
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
            <div className={styles.calendarWrapper} data-size={size}>
              <Calendar
                mode={mode}
                size={size}
                value={valueProp}
                showSeconds={showSeconds}
                onChangeValue={handleSelectDate}
                buildCellProps={buildCellProps}
                navigationStartRef={navigationStartRef}
                onFocusLeave={handleCalendarFocusLeave}
                locale={DEFAULT_LOCALE}
                data-test-id='field-date__calendar'
                fitToContainer={false}
              />
            </div>
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
              data-test-id='field-date__input'
            />
          </FieldContainerPrivate>
        </Dropdown>
      </FieldDecorator>
    );
  },
);
