import cn from 'classnames';
import { MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Droplist } from '@snack-ui/droplist';
import { Spinner } from '@snack-ui/loaders';
import { extractSupportProps } from '@snack-ui/utils';

import { Variant } from '../../constants';
import { SelectionMode, Size } from './constants';
import styles from './styles.module.scss';
import { MultiSelectionProps, SingleSelectionProps } from './types';
import { defaultMultiValueLabelFormatter, fallbackValue, normalizeValue } from './utils';

export type FilterChipProps = SingleSelectionProps | MultiSelectionProps;

export function FilterChip({
  size = Size.S,
  disabled,
  loading,
  icon,
  label,
  onClick,
  className,
  tabIndex = 0,
  options,
  value,
  defaultValue,
  onChangeValue,
  selectionMode,
  labelFormatter,
  'data-test-id': testId,
  ...rest
}: FilterChipProps) {
  const variant = icon && size !== Size.Xs ? Variant.IconBefore : Variant.LabelOnly;
  const spinnerSize = size === Size.Xs ? Spinner.sizes.XS : Spinner.sizes.S;
  const isLabelExist = selectionMode === SelectionMode.Multi;
  const [isDroplistOpened, setIsDroplistOpened] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (loading || disabled) return;
    onClick?.(e);
    !isDroplistOpened && setIsDroplistOpened(true);
  };

  const onChangeHandler = useCallback(
    (value: string[]) => {
      if (selectionMode === SelectionMode.Single) {
        onChangeValue?.(value[0]);
        return;
      }
      onChangeValue?.(value);
    },
    [onChangeValue, selectionMode],
  );

  const [rawSelectedValue, setSelectedValue] = useUncontrolledProp<string[]>(
    normalizeValue(selectionMode, options, value),
    normalizeValue(selectionMode, options, defaultValue) || [],
    onChangeHandler,
  );

  const selectedValue = fallbackValue(selectionMode, options, rawSelectedValue);

  const selectedOptions = useMemo(
    () => options.filter(({ value }) => selectedValue.includes(value)),
    [options, selectedValue],
  );

  const Item = selectionMode === SelectionMode.Single ? Droplist.ItemSingle : Droplist.ItemMultiple;

  const items = useMemo(
    () =>
      options.map(({ label, value, ...rest }) => {
        const checked = selectedValue.includes(value) || false;
        const onChangeHandler = () => {
          if (selectionMode === SelectionMode.Single) {
            setSelectedValue([value]);
            setIsDroplistOpened(false);
          } else {
            if (checked) {
              setSelectedValue(selectedValue.filter(selected => selected !== value));
            } else {
              setSelectedValue([...selectedValue, value]);
            }
          }
        };
        return (
          <Item
            {...rest}
            key={value}
            option={label}
            checked={checked}
            onChange={onChangeHandler}
            data-test-id={testId && `${testId}__option`}
          />
        );
      }),
    [Item, options, selectedValue, selectionMode, setSelectedValue, testId],
  );

  const [singleSelectedOption] = selectedOptions;

  return (
    <Droplist
      trigger={Droplist.triggers.Click}
      content={items}
      open={isDroplistOpened}
      onOpenChange={opened => !opened && setIsDroplistOpened(false)}
      className={styles.droplist}
      widthStrategy={Droplist.widthStrategies.Auto}
    >
      <button
        {...extractSupportProps(rest)}
        type='button'
        className={cn(styles.filterChip, className)}
        data-size={size}
        data-variant={variant}
        data-loading={loading || undefined}
        data-label={isLabelExist || undefined}
        data-test-id={testId || undefined}
        disabled={!loading && disabled}
        onClick={handleClick}
        tabIndex={tabIndex}
      >
        {loading && !isLabelExist && (
          <span className={styles.spinner} data-test-id='filter-chip__spinner'>
            <Spinner size={spinnerSize} data-test-id='filter-chip__spinner' />
          </span>
        )}

        {variant === Variant.IconBefore && (
          <span className={styles.icon} data-test-id='filter-chip__icon'>
            {icon}
          </span>
        )}

        {selectionMode === SelectionMode.Single && (
          <span className={styles.value} data-test-id='filter-chip__value'>
            {(singleSelectedOption && labelFormatter?.(singleSelectedOption)) || singleSelectedOption?.label}
          </span>
        )}

        {selectionMode === SelectionMode.Multi && (
          <>
            <span className={styles.label}>
              <span data-test-id='filter-chip__label'>{label}</span>
              {': '}
            </span>

            {loading ? (
              <span className={styles.spinner} data-test-id='filter-chip__spinner'>
                <Spinner size={spinnerSize} />
              </span>
            ) : (
              <span className={styles.value} data-test-id='filter-chip__value'>
                {labelFormatter?.(selectedOptions) || defaultMultiValueLabelFormatter(selectedOptions)}
              </span>
            )}
          </>
        )}
      </button>
    </Droplist>
  );
}

FilterChip.sizes = Size;
FilterChip.variants = Variant;
FilterChip.selectionModes = SelectionMode;
