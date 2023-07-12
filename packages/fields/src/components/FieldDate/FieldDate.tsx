import mergeRefs from 'merge-refs';
import { forwardRef, KeyboardEvent, MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { useIMask } from 'react-imask';
import { useUncontrolledProp } from 'uncontrollable';

import { Calendar, CalendarProps } from '@snack-ui/calendar';
import { Droplist } from '@snack-ui/droplist';
import { CalendarSSVG, CalendarXsSVG } from '@snack-ui/icons';
import { InputPrivate, InputPrivateProps } from '@snack-ui/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ContainerVariant, Size, ValidationState } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { runAfterRerender } from '../../helpers';
import { useButtonNavigation, useClearButton, useCopyButton } from '../../hooks';
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
      showCopyButton: showCopyButtonProp = true,
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
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);
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
    const showClearButton = showAdditionalButton && !readonly;
    const showCopyButton = showCopyButtonProp && showAdditionalButton && readonly;

    const leaveElement = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setIsOpen(true);
        runAfterRerender(() => calendarNavigateStartRef.current?.focus());
      }
      if (event.shiftKey && event.key === 'Tab') {
        setIsOpen(false);
      }
    };

    const onClear = () => {
      setValue('');

      if (required) {
        localRef.current?.focus();
        setIsOpen(true);
      } else {
        localRef.current?.blur();
        setIsOpen(false);
      }
    };

    const clearButtonSettings = useClearButton({ clearButtonRef, showClearButton, size, onClear });
    const copyButtonSettings = useCopyButton({ copyButtonRef, showCopyButton, size, valueToCopy: value });
    const { buttons, inputTabIndex, onInputKeyDown, setInitialTabIndices } = useButtonNavigation({
      inputRef: localRef,
      buttons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
      onInputKeyDown: leaveElement,
      onButtonKeyDown: leaveElement,
      readonly,
    });

    // TODO: do not hardcode locale here
    const handleSelectDate = (date: Date) => {
      setValue(date.toLocaleDateString(new Intl.Locale('ru-RU')));
      setIsOpen(false);
    };

    const handleCalendarFocusLeave: CalendarProps['onFocusLeave'] = () => {
      setIsOpen(false);
      setInitialTabIndices();
      // TODO: find out why it works not as expected (focus is moved to the next element instead of the focused one)
      // maybe floating-ui causes the problem
      localRef.current?.focus();
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
                {buttons}
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
              onKeyDown={onInputKeyDown}
              tabIndex={inputTabIndex}
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
