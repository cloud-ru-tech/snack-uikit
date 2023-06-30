import mergeRefs from 'merge-refs';
import { FocusEventHandler, forwardRef, KeyboardEventHandler, RefObject, useState } from 'react';

import { Droplist } from '@snack-ui/droplist';
import { InputPrivate } from '@snack-ui/input-private';
import { extractSupportProps } from '@snack-ui/utils';

import { ButtonClearValue, ButtonCopyValue, FieldContainerPrivate } from '../../helperComponents';
import { ButtonSizeMap, ContainerVariant, Size, ValidationState } from '../constants';
import { FieldDecorator } from '../FieldDecorator';
import { getArrowIcon } from './helpers';
import styles from './styles.module.scss';
import { ExtendedOption, FieldSelectBaseProps, Option, SelectionMode } from './types';

type BaseProps = Omit<FieldSelectBaseProps, 'open' | 'onOpenChange' | 'options'> &
  Required<Pick<FieldSelectBaseProps, 'open' | 'onOpenChange'>> & {
    localRef: RefObject<HTMLInputElement>;
    options: ExtendedOption[];
    showAdditionalButton: boolean;
    onClear(): void;
    onChange(option: Option): () => void;
    inputValue: string;
    onInputValueChange(value: string): void;
    displayedValue: string;
    valueToCopy: string;
    onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  };

type Props =
  | ({
      selectionMode: SelectionMode.Single;
      selected: Option;
    } & BaseProps)
  | ({
      selectionMode: SelectionMode.Multi;
      selected: Option[];
    } & BaseProps);

export const FieldSelectBase = forwardRef<HTMLInputElement, Props>(
  (
    {
      selectionMode,
      showAdditionalButton,
      onClear,
      onChange,
      inputValue,
      onInputValueChange,
      displayedValue,
      valueToCopy,
      localRef,
      onInputKeyDown,
      id,
      name,
      placeholder,
      options,
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
      locale,
      noDataText = locale?.language === 'ru' ? 'Нет данных' : 'No data',
      ...rest
    },
    ref,
  ) => {
    const ArrowIcon = getArrowIcon({ size, open });
    const Item = selectionMode === SelectionMode.Single ? Droplist.ItemSingle : Droplist.ItemMultiple;

    const [isFocused, setIsFocused] = useState(true);

    const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const commonInputProps = {
      id,
      name,
      type: InputPrivate.types.Text,
      placeholder,
      ref: mergeRefs(ref, localRef),
      onFocus: handleFocus,
      onBlur: handleBlur,
      disabled,
      'data-size': size,
      'data-test-id': 'field-select__input',
      onKeyDown: onInputKeyDown,
      onChange: searchable ? onInputValueChange : undefined,
    };

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
          {...(readonly || disabled ? { open: false } : { open, onOpenChange })}
          content={
            <div data-test-id='field-select__list'>
              {options.length === 0 ? (
                <Droplist.NoData size={size} label={noDataText} data-test-id='field-select__no-data' />
              ) : (
                options.map(option => (
                  <Item
                    onChange={onChange(option)}
                    key={option.value}
                    size={size}
                    data-test-id={'field-select__list-option-' + option.value}
                    {...option}
                  />
                ))
              )}
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
            focused={open}
            selectable={!searchable}
            inputRef={localRef}
            prefix={prefixIcon}
            postfix={
              <>
                {showAdditionalButton && !readonly && <ButtonClearValue size={ButtonSizeMap[size]} onClick={onClear} />}
                {showCopyButton && showAdditionalButton && readonly && (
                  <ButtonCopyValue size={ButtonSizeMap[size]} valueToCopy={valueToCopy} />
                )}
                <ArrowIcon className={styles.arrowIcon} data-size={size} />
              </>
            }
          >
            {/* TODO: find better solution */}
            {/* need to render separate inputs so that to escape change event conflict */}
            {isFocused ? (
              <InputPrivate
                {...commonInputProps}
                readonly={!searchable || readonly}
                value={searchable ? inputValue : displayedValue}
              />
            ) : (
              <InputPrivate {...commonInputProps} readonly={true} value={displayedValue} />
            )}
          </FieldContainerPrivate>
        </Droplist.Container>
      </FieldDecorator>
    );
  },
);
