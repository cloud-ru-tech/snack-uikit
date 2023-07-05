import mergeRefs from 'merge-refs';
import { FocusEventHandler, forwardRef, ReactElement, useEffect, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Droplist } from '@snack-ui/droplist';
import { ChevronDownSSVG, ChevronDownXsSVG, ChevronUpSSVG, ChevronUpXsSVG } from '@snack-ui/icons';
import { InputPrivate, InputPrivateProps } from '@snack-ui/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ButtonClearValue, ButtonCopyValue, FieldContainerPrivate } from '../../helperComponents';
import { ButtonSizeMap, ContainerVariant, Size, ValidationState } from '../constants';
import { FieldDecorator, FieldDecoratorProps } from '../FieldDecorator';
import styles from './styles.module.scss';

type Option = {
  value: string;
  label: string;
};

type InputProps = Pick<
  InputPrivateProps,
  'id' | 'name' | 'placeholder' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'
>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  'className' | 'label' | 'labelTooltip' | 'required' | 'hint' | 'showHintIcon' | 'size' | 'validationState'
>;

type FieldSelectOwnProps = {
  value?: Option['value'];
  onChange(value?: Option['value']): void;
  options: Option[];
  open?: boolean;
  onOpenChange?(value: boolean): void;
  searchable?: boolean;
  showCopyButton?: boolean;
  prefixIcon?: ReactElement;
};

export type FieldSelectProps = WithSupportProps<FieldSelectOwnProps & InputProps & WrapperProps>;

const ICON_MAP = {
  [Size.S]: {
    open: ChevronUpXsSVG,
    closed: ChevronDownXsSVG,
  },
  [Size.M]: {
    open: ChevronUpSSVG,
    closed: ChevronDownSSVG,
  },
  [Size.L]: {
    open: ChevronUpSSVG,
    closed: ChevronDownSSVG,
  },
};

const EMPTY_OPTION: Option = { value: '', label: '' };

const ForwardedFieldSelect = forwardRef<HTMLInputElement, FieldSelectProps>(
  (
    {
      id,
      name,
      placeholder,
      value,
      options,
      onChange,
      disabled = false,
      readonly = false,
      searchable = true,
      showCopyButton = true,
      open,
      onOpenChange,
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
      prefixIcon,
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const touched = useRef(false);
    const selectedOption = options.find(option => option.value === value) ?? EMPTY_OPTION;
    const [inputValue, setInputValue] = useState(selectedOption.label);
    const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
    const showDropList = isOpen && !readonly && !disabled;
    const showAdditionalButton = value && !disabled;
    const ArrowIcon = ICON_MAP[size][showDropList ? 'open' : 'closed'];
    const filteredOptions =
      searchable && touched.current && inputValue
        ? options.filter(item => item.label.toLowerCase().includes(inputValue.toLowerCase().trim()))
        : options;

    const handleInputValueChange = (value: string) => {
      touched.current = true;
      setIsOpen(true);
      setInputValue(value);
    };

    const handleClear = () => {
      onChange(undefined);
      setInputValue('');
      localRef.current?.focus();
      setIsOpen(true);
    };

    const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
      onFocus?.(event);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      touched.current = false;
      setIsOpen(false);

      if (searchable) {
        setInputValue(selectedOption.label);
      }

      onBlur?.(event);
    };

    useEffect(() => {
      if (open) {
        localRef.current?.focus();
      }
    }, [open]);

    useEffect(() => {
      setInputValue(selectedOption.label);
    }, [selectedOption.label]);

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
        <Droplist.Container
          trigger={Droplist.triggers.Click}
          className={styles.itemList}
          triggerClassName={styles.trigger}
          triggerClickByKeys={!searchable}
          {...(readonly || disabled
            ? { open: false }
            : {
                open: showDropList,
                onOpenChange: setIsOpen,
              })}
          content={
            <div className={styles.list} data-test-id='field-select__list'>
              {filteredOptions.map(option => (
                <span
                  role='button'
                  tabIndex={0}
                  // use onMouseDown here to prevent onBlur to run earlier
                  onMouseDown={() => {
                    onChange(option.value);
                    setInputValue(option.label);
                    setIsOpen(false);
                  }}
                  key={option.value}
                  data-selected={selectedOption.value === option.value || undefined}
                  data-size={size}
                  data-test-id={'field-select__list-option-' + option.value}
                >
                  {option.label}
                </span>
              ))}
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
            selectable={!searchable}
            inputRef={localRef}
            prefix={prefixIcon}
            postfix={
              <>
                {showAdditionalButton && !readonly && (
                  <ButtonClearValue size={ButtonSizeMap[size]} onClick={handleClear} />
                )}
                {showCopyButton && showAdditionalButton && readonly && (
                  <ButtonCopyValue size={ButtonSizeMap[size]} valueToCopy={selectedOption.label} />
                )}
                <ArrowIcon className={styles.arrowIcon} data-size={size} />
              </>
            }
          >
            <InputPrivate
              id={id}
              name={name}
              type={InputPrivate.types.Text}
              placeholder={placeholder}
              ref={mergeRefs(ref, localRef)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              readonly={!searchable || readonly}
              data-size={size}
              data-searchable={searchable || undefined}
              data-test-id='field-select__input'
              {...(searchable
                ? { value: inputValue, onChange: handleInputValueChange }
                : { value: selectedOption.label })}
            />
          </FieldContainerPrivate>
        </Droplist.Container>
      </FieldDecorator>
    );
  },
);

export const FieldSelect = ForwardedFieldSelect as typeof ForwardedFieldSelect & {
  sizes: typeof Size;
  validationStates: typeof ValidationState;
};

FieldSelect.sizes = Size;
FieldSelect.validationStates = ValidationState;
