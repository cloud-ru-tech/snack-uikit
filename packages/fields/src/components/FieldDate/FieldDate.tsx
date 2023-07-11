import mergeRefs from 'merge-refs';
import { forwardRef, KeyboardEventHandler, MutableRefObject, useEffect, useRef } from 'react';
import { useIMask } from 'react-imask';
import { useUncontrolledProp } from 'uncontrollable';

import { Calendar, CalendarProps } from '@snack-ui/calendar';
import { Droplist } from '@snack-ui/droplist';
import { CalendarSSVG, CalendarXsSVG } from '@snack-ui/icons';
import { InputPrivate, InputPrivateProps } from '@snack-ui/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ButtonClearValue, ButtonCopyValue, FieldContainerPrivate } from '../../helperComponents';
import { ButtonSizeMap, ContainerVariant, Size, ValidationState } from '../constants';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import { DATE_MASK_CONFIG, PLACEHOLDER } from './constants';
import styles from './styles.module.scss';

type InputProps = Pick<InputPrivateProps, 'id' | 'name' | 'value' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  'className' | 'label' | 'labelTooltip' | 'required' | 'hint' | 'showHintIcon' | 'size' | 'validationState'
>;

type FieldDateOwnProps = {
  open?: boolean;
  onOpenChange?(value: boolean): void;
  onChange?(value: string): void;
  showCopyButton?: boolean;
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
      showCopyButton = true,
      open,
      onOpenChange,
      onChange,
      onFocus,
      onBlur,
      className,
      label,
      labelTooltip,
      required = false,
      hint,
      showHintIcon,
      size = Size.S,
      validationState = ValidationState.Default,
      locale,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
    const localRef = useRef<HTMLInputElement>(null);
    const calendarNavigateStartRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);

    const {
      value,
      typedValue,
      setValue,
      ref: inputRef,
      maskRef,
    } = useIMask<HTMLInputElement, typeof DATE_MASK_CONFIG>(DATE_MASK_CONFIG, { onAccept: value => onChange?.(value) });

    const CalendarIcon = size === Size.S ? CalendarXsSVG : CalendarSSVG;
    const showDropList = isOpen && !readonly && !disabled;
    const showAdditionalButton = Boolean(value && !disabled);

    const handleClear = () => {
      setValue('');
      localRef.current?.focus();

      if (required) {
        setIsOpen(true);
      }
    };

    // TODO: do not hardcode locale here
    const handleSelectDate = (date: Date) => {
      setValue(date.toLocaleDateString(new Intl.Locale('ru-RU')));
      setIsOpen(false);
    };

    const handleCalendarFocusLeave: CalendarProps['onFocusLeave'] = () => {
      setIsOpen(false);
      localRef.current?.focus();
    };

    const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
      if (event.key === 'ArrowDown') {
        setIsOpen(true);
        calendarNavigateStartRef.current?.focus();
      }
      if (event.shiftKey && event.key === 'Tab') {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      maskRef.current && (maskRef.current.value = valueProp);
    }, [maskRef, valueProp]);

    useEffect(() => {
      if (open) {
        localRef.current?.focus();
      }
    }, [open]);

    return (
      <FieldDecorator
        className={className}
        label={label}
        labelTooltip={labelTooltip}
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
        <Droplist
          trigger={Droplist.triggers.Click}
          className={styles.itemList}
          triggerClassName={styles.trigger}
          widthStrategy={Droplist.widthStrategies.Gte}
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
                value={typedValue || undefined}
                onChangeValue={handleSelectDate}
                navigationStartRef={el => (calendarNavigateStartRef.current = el)}
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
                {showAdditionalButton && !readonly && (
                  <ButtonClearValue size={ButtonSizeMap[size]} onClick={handleClear} />
                )}
                {showCopyButton && showAdditionalButton && readonly && (
                  <ButtonCopyValue size={ButtonSizeMap[size]} valueToCopy={value} />
                )}
                <CalendarIcon className={styles.calendarIcon} data-size={size} />
              </>
            }
          >
            <InputPrivate
              ref={mergeRefs(ref, inputRef, localRef)}
              data-size={size}
              value={value}
              placeholder={PLACEHOLDER[locale?.language ?? 'ru']}
              onChange={setValue}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              readonly={readonly}
              type={InputPrivate.types.Text}
              id={id}
              name={name}
              data-test-id='field-date__input'
            />
          </FieldContainerPrivate>
        </Droplist>
      </FieldDecorator>
    );
  },
);

export const FieldDate = ForwardedFieldDate as typeof ForwardedFieldDate & {
  sizes: typeof Size;
  validationStates: typeof ValidationState;
};

FieldDate.sizes = Size;
FieldDate.validationStates = ValidationState;
