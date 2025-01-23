import cn from 'classnames';
import { forwardRef, useCallback, useMemo } from 'react';

import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';
import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { Droplist, DroplistProps, ItemId } from '@snack-uikit/list';
import { extractSupportProps, useValueControl, WithSupportProps } from '@snack-uikit/utils';

import { DROPLIST_SIZE_MAP } from './constants';
import styles from './styles.module.scss';
import { Item } from './types';
import { extractDroplistItemProps } from './utils';

export type ButtonComboProps = WithSupportProps<
  Pick<ButtonFilledProps, 'className' | 'disabled' | 'loading' | 'size' | 'tabIndex' | 'fullWidth'> &
    Pick<DroplistProps, 'open' | 'onOpenChange'> & {
      /** CSS-класс Dropdown */
      dropdownClassName?: string;
      /** CSS-класс Option кнопки */
      optionClassName?: string;
      /** CSS-класс Dropdown trigger кнопки */
      dropdownTriggerClassName?: string;
      /** Controlled состояние */
      value?: ItemId;
      /** Controlled обработчик измения состояния */
      onChange?(value: ItemId): void;
      /** Начальное состояние */
      defaultValue?: string;
      /** Начальное состояние лейбла */
      defaultLabel?: string;
      /** Основные элементы списка */
      items: Item[];
    }
>;

export const ButtonCombo = forwardRef<HTMLDivElement, ButtonComboProps>(
  (
    {
      size = 's',
      defaultLabel = '',
      className,
      dropdownClassName,
      optionClassName,
      dropdownTriggerClassName,
      defaultValue,
      items,
      tabIndex,
      fullWidth,
      disabled,
      loading,
      value: valueProp,
      open: openProp,
      onOpenChange,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });
    const [value, setValue] = useValueControl<ItemId>({ value: valueProp, defaultValue, onChange });

    const droplistItems = useMemo(
      () => items.map(extractDroplistItemProps).map(item => ({ ...item, id: item?.id, content: item?.label })),
      [items],
    );

    const activeOption = useMemo(() => items.find(item => item?.id === value), [items, value]);

    const handleSelectionChange = useCallback(
      (selectionValue: ItemId) => {
        if (selectionValue) {
          const option = items.find(item => item?.id === selectionValue);

          option && setValue(selectionValue);
        }
      },
      [items, setValue],
    );

    return (
      <div
        {...extractSupportProps(rest)}
        ref={ref}
        className={cn(styles.buttonComboWrapper, className)}
        tabIndex={tabIndex}
        data-full-width={fullWidth || undefined}
      >
        <ButtonFilled
          data-type='option'
          size={size}
          label={activeOption?.label ?? defaultLabel}
          onClick={activeOption?.onClick}
          className={optionClassName}
          fullWidth={fullWidth}
          disabled={disabled}
          loading={loading}
          data-test-id='button-combo__option'
        />
        <Droplist
          items={droplistItems}
          open={open}
          onOpenChange={setOpen}
          selection={{
            defaultValue,
            mode: 'single',
            onChange: handleSelectionChange,
          }}
          className={dropdownClassName}
          size={DROPLIST_SIZE_MAP[size]}
          placement='bottom-end'
          closeDroplistOnItemClick
          data-test-id='button-combo__dropdown'
        >
          <ButtonFilled
            data-type='dropdown'
            className={dropdownTriggerClassName}
            size={size}
            disabled={disabled}
            loading={loading}
            icon={open ? <ChevronUpSVG /> : <ChevronDownSVG />}
            data-test-id='button-combo__dropdown-button'
          />
        </Droplist>
      </div>
    );
  },
);
