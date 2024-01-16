import mergeRefs from 'merge-refs';
import {
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  RefCallback,
  RefObject,
  useMemo,
} from 'react';

import { Droplist } from '@snack-uikit/droplist';
import { InputPrivate, SIZE, useButtonNavigation, useClearButton } from '@snack-uikit/input-private';
import { extractSupportProps } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from '../../constants';
import { FieldContainerPrivate } from '../../helperComponents';
import { useCopyButton } from '../../hooks';
import { useHandlers } from '../FieldDate/hooks/useHandlers';
import { FieldDecorator } from '../FieldDecorator';
import { SELECTION_MODE } from './constants';
import { getArrowIcon } from './helpers';
import styles from './styles.module.scss';
import { ExtendedOption, FieldSelectBaseProps, Option } from './types';

type BaseProps = Omit<FieldSelectBaseProps, 'open' | 'onOpenChange' | 'options'> &
  Required<Pick<FieldSelectBaseProps, 'open' | 'onOpenChange'>> & {
    localRef: RefObject<HTMLInputElement>;
    options: ExtendedOption[];
    onClear: MouseEventHandler<HTMLButtonElement>;
    onChange(option: Option): () => void;
    inputValue: string;
    onInputValueChange(value: string): void;
    displayedValue?: string;
    valueToCopy: string;
    onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
    onButtonKeyDown: KeyboardEventHandler<HTMLButtonElement>;
    showClearButton: boolean;
    clearButtonRef: RefObject<HTMLButtonElement>;
    copyButtonRef: RefObject<HTMLButtonElement>;
    onClick?: MouseEventHandler<HTMLElement>;
    onContainerPrivateMouseDown?: MouseEventHandler<HTMLElement>;
    onDroplistFocusLeave(direction: string): void;
    firstDroplistItemRefCallback: RefCallback<HTMLButtonElement>;
  };

type Props =
  | ({
      selectionMode: typeof SELECTION_MODE.Single;
      selected: Option;
    } & BaseProps)
  | ({
      selectionMode: typeof SELECTION_MODE.Multi;
      selected: Option[];
    } & BaseProps);

export const FieldSelectBase = forwardRef<HTMLInputElement, Props>(
  (
    {
      selectionMode,
      onClear,
      showClearButton,
      clearButtonRef,
      copyButtonRef,
      onChange,
      inputValue,
      onInputValueChange,
      displayedValue,
      valueToCopy,
      localRef,
      onInputKeyDown: onInputKeyDownProp,
      onButtonKeyDown: onButtonKeyDownProp,
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
      labelTooltipPlacement,
      required = false,
      hint,
      showHintIcon,
      size = SIZE.S,
      validationState = VALIDATION_STATE.Default,
      prefixIcon,
      locale,
      noDataText = locale?.language === 'ru' ? 'Нет данных' : 'No data',
      firstDroplistItemRefCallback,
      onDroplistFocusLeave,
      ...rest
    },
    ref,
  ) => {
    const { ArrowIcon, arrowIconSize } = getArrowIcon({ size, open });
    const Item = selectionMode === SELECTION_MODE.Single ? Droplist.ItemSingle : Droplist.ItemMultiple;

    const clearButtonSettings = useClearButton({ clearButtonRef, showClearButton, size, onClear });
    const copyButtonSettings = useCopyButton({ copyButtonRef, showCopyButton, size, valueToCopy });
    const {
      onInputKeyDown: inputKeyDownNavigationHandler,
      inputTabIndex,
      setInitialTabIndices,
      buttons,
    } = useButtonNavigation({
      inputRef: localRef,
      buttons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
      onButtonKeyDown: onButtonKeyDownProp,
      readonly,
      submitKeys: ['Enter', 'Space', 'Tab'],
    });

    const onInputKeyDownHandler = useHandlers<KeyboardEvent<HTMLInputElement>>([
      inputKeyDownNavigationHandler,
      onInputKeyDownProp,
    ]);

    const onFocusLeaveHandler = useHandlers([
      (direction: string) => {
        if (direction === 'common') setInitialTabIndices();
      },
      onDroplistFocusLeave,
    ]);

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
        <Droplist
          trigger='click'
          triggerClassName={styles.triggerClassName}
          triggerClickByKeys={!searchable}
          placement='bottom'
          onFocusLeave={onFocusLeaveHandler}
          firstElementRefCallback={firstDroplistItemRefCallback}
          data-test-id='field-select__list'
          {...(readonly || disabled ? { open: false } : { open, onOpenChange })}
          triggerElement={
            <FieldContainerPrivate
              className={styles.container}
              size={size}
              validationState={validationState}
              disabled={disabled}
              readonly={readonly}
              variant={CONTAINER_VARIANT.SingleLine}
              focused={open}
              selectable={!searchable}
              inputRef={localRef}
              prefix={prefixIcon}
              onMouseDown={onContainerPrivateMouseDown}
              postfix={
                <>
                  {buttons}
                  <ArrowIcon size={arrowIconSize} className={styles.arrowIcon} />
                </>
              }
            >
              <InputPrivate
                id={id}
                name={name}
                type='text'
                placeholder={displayedValue ? undefined : placeholder}
                ref={mergeRefs(ref, localRef)}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                data-size={size}
                data-test-id='field-select__input'
                onKeyDown={onInputKeyDownHandler}
                onChange={searchable ? onInputValueChange : undefined}
                readonly={!searchable || readonly}
                value={inputValue}
                tabIndex={inputTabIndex}
              />

              {displayedValue && (
                <span className={styles.displayValue} data-test-id='field-select__displayed-value'>
                  {displayedValue}
                </span>
              )}
            </FieldContainerPrivate>
          }
        >
          {options.length === 0 ? (
            <Droplist.NoData size={size} label={noDataText} data-test-id='field-select__no-data' />
          ) : (
            options.map(option => (
              <Item
                onChange={onChange(option)}
                key={option.value}
                data-test-id={'field-select__list-option-' + option.value}
                {...option}
                option={option.label}
              />
            ))
          )}
        </Droplist>
      </FieldDecorator>
    );
  },
);
