import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { forwardRef, KeyboardEventHandler, MouseEventHandler, RefObject } from 'react';

import { Droplist } from '@snack-ui/droplist';
import { InputPrivate } from '@snack-ui/input-private';
import { Scroll } from '@snack-ui/scroll';
import { extractSupportProps } from '@snack-ui/utils';

import { ButtonSizeMap, ContainerVariant, Size, ValidationState } from '../../constants';
import { ButtonClearValue, ButtonCopyValue, FieldContainerPrivate } from '../../helperComponents';
import { FieldDecorator } from '../FieldDecorator';
import { getArrowIcon } from './helpers';
import styles from './styles.module.scss';
import { ExtendedOption, FieldSelectBaseProps, Option, SelectionMode } from './types';

type BaseProps = Omit<FieldSelectBaseProps, 'open' | 'onOpenChange' | 'options'> &
  Required<Pick<FieldSelectBaseProps, 'open' | 'onOpenChange'>> & {
    localRef: RefObject<HTMLInputElement>;
    options: ExtendedOption[];
    onClear(): void;
    onChange(option: Option): () => void;
    inputValue: string;
    onInputValueChange(value: string): void;
    displayedValue?: string;
    valueToCopy: string;
    onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
    showClearButton: boolean;
    scrollVisible: boolean;
    clearButtonRef: RefObject<HTMLButtonElement>;
    onClick?: MouseEventHandler<HTMLElement>;
    onContainerPrivateMouseDown?: MouseEventHandler<HTMLElement>;
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
      onClear,
      showClearButton,
      clearButtonRef,
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
      onContainerPrivateMouseDown,
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
      scrollVisible,
      ...rest
    },
    ref,
  ) => {
    const ArrowIcon = getArrowIcon({ size, open });
    const Item = selectionMode === SelectionMode.Single ? Droplist.ItemSingle : Droplist.ItemMultiple;

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
          triggerClickByKeys={!searchable}
          data-test-id={'field-select__list'}
          {...(readonly || disabled ? { open: false } : { open, onOpenChange })}
          content={
            options.length === 0 ? (
              <Droplist.NoData size={size} label={noDataText} data-test-id='field-select__no-data' />
            ) : (
              <Scroll
                className={cn({
                  [styles.scrollContainerS]: scrollVisible && size === Size.S,
                  [styles.scrollContainerM]: scrollVisible && size === Size.M,
                  [styles.scrollContainerL]: scrollVisible && size === Size.L,
                })}
                barHideStrategy={Scroll.barHideStrategies.Never}
                size={Scroll.sizes.S}
              >
                {options.map(option => (
                  <Item
                    onChange={onChange(option)}
                    key={option.value}
                    size={size}
                    data-test-id={'field-select__list-option-' + option.value}
                    {...option}
                    option={option.label}
                  />
                ))}
              </Scroll>
            )
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
            onMouseDown={onContainerPrivateMouseDown}
            postfix={
              <>
                {showClearButton && (
                  <ButtonClearValue size={ButtonSizeMap[size]} onClick={onClear} ref={clearButtonRef} />
                )}
                {showCopyButton && <ButtonCopyValue size={ButtonSizeMap[size]} valueToCopy={valueToCopy} />}
                <ArrowIcon className={styles.arrowIcon} />
              </>
            }
          >
            <InputPrivate
              id={id}
              name={name}
              type={InputPrivate.types.Text}
              placeholder={placeholder}
              ref={mergeRefs(ref, localRef)}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
              data-size={size}
              data-test-id={'field-select__input'}
              onKeyDown={onInputKeyDown}
              onChange={searchable ? onInputValueChange : undefined}
              readonly={!searchable || readonly}
              value={inputValue}
            />
            {displayedValue && (
              <span
                className={styles.displayValue}
                data-test-id='field-select__displayed-value'
                data-displayed-value={true}
              >
                {displayedValue}
              </span>
            )}
          </FieldContainerPrivate>
        </Droplist>
      </FieldDecorator>
    );
  },
);
