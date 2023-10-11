import mergeRefs from 'merge-refs';
import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Calendar, CalendarProps } from '@snack-ui/calendar';
import { Dropdown } from '@snack-ui/droplist';
import { CalendarSVG } from '@snack-ui/icons';
import {
  IconSize,
  InputPrivate,
  InputPrivateProps,
  runAfterRerender,
  Size,
  useButtonNavigation,
  useClearButton,
} from '@snack-ui/input-private';
import { Tooltip } from '@snack-ui/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ContainerVariant, ValidationState } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton } from '../../hooks';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import { DEFAULT_LOCALE, SlotKey } from './constants';
import { useDateField } from './hooks';
import { useFocusHandlers } from './hooks/useFocusHandlers';
import { useHandlers } from './hooks/useHandlers';
import styles from './styles.module.scss';
import { parseDate } from './utils';

type InputProps = Pick<InputPrivateProps, 'id' | 'name' | 'value' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

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

type FieldDateOwnProps = {
  /** Открыт date-picker */
  open?: boolean;
  /** Колбек открытия пикера */
  onOpenChange?(value: boolean): void;
  /** Колбек смены значения */
  onChange?(value: string): void;
  /** Отображать ли кнопку копирования */
  showCopyButton?: boolean;
  /** Текущая локаль календаря */
  locale?: Intl.Locale;
};

export type FieldDateProps = WithSupportProps<FieldDateOwnProps & InputProps & WrapperProps>;

const CALENDAR_SIZE_MAP = {
  [Size.S]: Calendar.sizes.S,
  [Size.M]: Calendar.sizes.M,
  [Size.L]: Calendar.sizes.M,
};

const ForwardedFieldDate = forwardRef<HTMLInputElement, FieldDateProps>(
  (
    {
      id,
      name,
      value: valueProp,
      disabled = false,
      readonly = false,
      showCopyButton: showCopyButtonProp = true,
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
      hint,
      showHintIcon,
      size = Size.S,
      validationState = ValidationState.Default,
      locale = DEFAULT_LOCALE,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
    const [pickerAutofocus, setPickerAutofocus] = useState(false);

    const localRef = useRef<HTMLInputElement>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
    const calendarIconSize = size === Size.S ? IconSize.Xs : IconSize.S;
    const showDropList = isOpen && !readonly && !disabled;
    const showAdditionalButton = Boolean(valueProp && !disabled);
    const showClearButton = showAdditionalButton && !readonly;
    const showCopyButton = showCopyButtonProp && showAdditionalButton && readonly;

    const checkForLeavingFocus = useCallback(
      <T extends HTMLInputElement | HTMLButtonElement>(event: KeyboardEvent<T>) => {
        if (event.key === 'ArrowDown') {
          setPickerAutofocus(true);
          setIsOpen(true);
        }
      },
      [setIsOpen],
    );

    const handleClear = useCallback(() => {
      onChange && onChange('');
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

    const clearButtonSettings = useClearButton({ clearButtonRef, showClearButton, size, onClear: handleClear });
    const copyButtonSettings = useCopyButton({ copyButtonRef, showCopyButton, size, valueToCopy: valueProp || '' });

    const memorizedButtons = useMemo(
      () => [clearButtonSettings, copyButtonSettings],
      [clearButtonSettings, copyButtonSettings],
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
      locale,
      setIsOpen,
    });

    const setInputFocusFromButtons = useCallback(() => setInputFocus(SlotKey.Year), [setInputFocus]);

    const {
      buttons,
      inputTabIndex,
      onInputKeyDown: navigationInputKeyDownHandler,
      setInitialTabIndices,
    } = useButtonNavigation({
      setInputFocus: setInputFocusFromButtons,
      inputRef: localRef,
      buttons: memorizedButtons,
      onButtonKeyDown: checkForLeavingFocus,
      readonly,
      submitKeys: ['Enter', 'Space', 'Tab'],
    });

    // TODO: do not hardcode locale here
    const handleSelectDate = (date: Date) => {
      onChange && onChange(date.toLocaleDateString(DEFAULT_LOCALE));
      localRef.current?.focus();
      setIsOpen(false);
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
      if (localRef.current && valueProp) {
        localRef.current.value = valueProp;
      }
    }, [valueProp]);

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
        hint={hint}
        disabled={disabled}
        readonly={readonly}
        showHintIcon={showHintIcon}
        size={size}
        validationState={validationState}
        {...extractSupportProps(rest)}
      >
        <Dropdown
          trigger={Dropdown.triggers.Click}
          triggerClassName={styles.triggerClassName}
          widthStrategy={Dropdown.widthStrategies.Gte}
          {...(readonly || disabled
            ? { open: false }
            : {
                open: showDropList,
                onOpenChange: setIsOpen,
              })}
          content={
            <div className={styles.calendarWrapper} data-size={size}>
              <Calendar
                mode={Calendar.modes.Date}
                size={CALENDAR_SIZE_MAP[size]}
                value={valueProp ? parseDate(valueProp) : undefined}
                onChangeValue={handleSelectDate}
                navigationStartRef={element => {
                  if (pickerAutofocus) {
                    element?.focus();
                    setPickerAutofocus(false);
                  }
                }}
                onFocusLeave={handleCalendarFocusLeave}
                locale={locale}
                data-test-id='field-date__calendar'
              />
            </div>
          }
        >
          <FieldContainerPrivate
            className={styles.container}
            size={size}
            validationState={validationState}
            disabled={disabled}
            readonly={readonly}
            variant={ContainerVariant.SingleLine}
            focused={showDropList}
            inputRef={localRef}
            postfix={
              <>
                {buttons}
                <CalendarSVG size={calendarIconSize} className={styles.calendarIcon} data-size={size} />
              </>
            }
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
              type={InputPrivate.types.Text}
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

export const FieldDate = ForwardedFieldDate as typeof ForwardedFieldDate & {
  sizes: typeof Size;
  validationStates: typeof ValidationState;
  labelTooltipPlacements: typeof Tooltip.placements;
};

FieldDate.sizes = Size;
FieldDate.validationStates = ValidationState;
FieldDate.labelTooltipPlacements = Tooltip.placements;
