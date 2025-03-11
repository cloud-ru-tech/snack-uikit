import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { CrossSVG, PlusSVG } from '@snack-uikit/icons';
import { Droplist, DroplistProps } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';
import { Tooltip } from '@snack-uikit/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CHIP_CHOICE_ROW_IDS } from '../../constants';
import { ForwardedChipChoice } from './components';
import { CHIP_CHOICE_ROW_SIZE, MAP_ROW_SIZE_TO_BUTTON_SIZE, MAP_ROW_SIZE_TO_CHOICE_SIZE } from './constants';
import { areValuesEqual } from './helpers';
import styles from './styles.module.scss';
import { ChipChoiceProps, ChipChoiceRowSize, FilterValue, OmitBetter } from './types';

export type FiltersState = Record<string, unknown>;

export type ChipChoiceRowFilter = OmitBetter<ChipChoiceProps, 'onChange' | 'value' | 'size' | 'defaultValue'> & {
  pinned?: boolean;
};

export type ChipChoiceRowProps<TState extends FiltersState> = WithSupportProps<{
  /** Состояние фильтров */
  value?: TState;
  /** Начальное состояние фильтров */
  defaultValue?: Partial<TState>;
  /** Колбек изменения состояния фильтров */
  onChange?(filters: TState): void;
  /** Массив чипов */
  filters: ChipChoiceRowFilter[];
  /** Размер @default 's' */
  size?: ChipChoiceRowSize;
  /** CSS-класс */
  className?: string;
  /** Скрыть/показать кнопку очиски фильтров @default true */
  showClearButton?: boolean;
  /** Скрыть/показать кнопку добавления фильров @default true */
  showAddButton?: boolean;
  /** Состояние для видимых фильтров */
  visibleFilters?: string[];
  /** Коллбек на изменение видимых фильтров */
  onVisibleFiltersChange?(value: string[]): void;
}>;

export function ChipChoiceRow<TState extends FiltersState>({
  filters,
  onChange,
  showClearButton: showClearButtonProp = true,
  showAddButton = true,
  className,
  value,
  defaultValue: defaultValueProp,
  size = CHIP_CHOICE_ROW_SIZE.S,
  visibleFilters: visibleFiltersProp,
  onVisibleFiltersChange,
  ...rest
}: ChipChoiceRowProps<TState>) {
  const { t } = useLocale('Chips');

  const defaultValue = useMemo(() => (defaultValueProp ?? {}) as TState, [defaultValueProp]);

  const [state, setState] = useUncontrolledProp<TState>(value, defaultValue, newState => {
    const result = typeof newState === 'function' ? newState(state) : newState;
    onChange?.(result);
  });

  const [addListValue, setAddListValue] = useUncontrolledProp<string[]>(
    visibleFiltersProp,
    Object.keys(state),
    newState => {
      const result = typeof newState === 'function' ? newState(addListValue) : newState;
      onVisibleFiltersChange?.(result);
    },
  );

  const [openedChip, setOpenedChip] = useState<string>('');

  const [addListOpen, setAddListOpen] = useState(false);

  const handleChange = (fieldId: string, value: FilterValue) => {
    setState((state: TState) => ({
      ...state,
      [fieldId]: value,
    }));
  };

  const handleChipOpen = useCallback(
    (filterId: string) => (isOpen: boolean) => {
      setOpenedChip(isOpen ? filterId : '');
    },
    [],
  );

  const handleFiltersClear = () => {
    const defaultState = filters.reduce((res, filter) => {
      if (filter.pinned) {
        return { ...res, [filter.id]: defaultValue[filter.id] } as TState;
      }

      return res;
    }, {} as TState);

    setState(defaultState);
    setAddListValue([]);
  };

  const { pinnedFilters, nonPinnedFilters } = useMemo(
    () =>
      filters.reduce(
        (res, filter) => {
          if (filter.pinned) {
            res.pinnedFilters.push(filter);
          } else {
            res.nonPinnedFilters.push(filter);
          }

          return res;
        },
        { pinnedFilters: [] as ChipChoiceRowFilter[], nonPinnedFilters: [] as ChipChoiceRowFilter[] },
      ),
    [filters],
  );

  const visibleFilters = useMemo(
    () =>
      addListValue.reduce((res, filterId) => {
        const filter = nonPinnedFilters.find(filter => filter.id === filterId);

        if (filter) {
          res.push(filter);
        }

        return res;
      }, [] as ChipChoiceRowFilter[]),
    [addListValue, nonPinnedFilters],
  );

  const hasAnyFilter = useMemo(
    () =>
      visibleFilters.length > 0 ||
      pinnedFilters.some(filter => !areValuesEqual(state[filter.id], defaultValue[filter.id])),
    [defaultValue, pinnedFilters, state, visibleFilters.length],
  );

  const handleClearPinnedFilter = (filterId: string) => {
    const defaultFilterValue = defaultValue[filterId];

    if (areValuesEqual(state[filterId], defaultFilterValue)) {
      return;
    }

    return () => setState((prevState: TState) => ({ ...prevState, [filterId]: defaultFilterValue }));
  };

  const handleRemoveVisibleFilter = (filterId: string) => () => {
    setAddListValue((prev?: string[]) => prev?.filter(item => filterId !== item));
    setState((prevState: TState) => ({ ...prevState, [filterId]: undefined }));
  };

  const addSelectorOptions = useMemo(
    () =>
      nonPinnedFilters.reduce(
        (res, filter, index) => {
          if (addListValue.includes(filter.id)) {
            return res;
          }

          res.push({
            id: filter.id,
            content: { option: filter.label ?? filter.id },
            onClick: () => {
              setAddListValue(function (prevValue?: string[]) {
                return [...(prevValue ?? []), filter.id];
              });
              setAddListOpen(false);
            },
            'data-test-id': `${CHIP_CHOICE_ROW_IDS.addButtonOption}-${filter['data-test-id'] ?? index}`,
          });

          return res;
        },
        [] as DroplistProps['items'],
      ),
    [addListValue, nonPinnedFilters, setAddListValue],
  );

  const canAddChips = addSelectorOptions.length > 0;

  const addListPrevValue = useRef(addListValue);

  useEffect(() => {
    const prevValue = addListPrevValue.current;

    if (addListValue.length > prevValue.length) {
      const newItem = addListValue.find(item => !prevValue.includes(item));

      if (newItem) {
        handleChipOpen(newItem)(true);
      }
    }

    addListPrevValue.current = addListValue;
  }, [addListValue, handleChipOpen]);

  const showClearButton = showClearButtonProp && hasAnyFilter;
  const showPinnedFiltersDivider = showAddButton || showClearButton || visibleFilters.length > 0;

  return (
    <div className={cn(styles.chipChoiceRow, className)} {...extractSupportProps(rest)}>
      {pinnedFilters.length > 0 && (
        <div className={styles.pinnedItems}>
          {pinnedFilters.map(filter => (
            <ForwardedChipChoice
              key={filter.id}
              {...filter}
              value={state[filter.id] as never}
              size={MAP_ROW_SIZE_TO_CHOICE_SIZE[size]}
              onChange={(value: FilterValue) => handleChange(filter.id, value)}
              onClearButtonClick={handleClearPinnedFilter(filter.id)}
            />
          ))}

          {showPinnedFiltersDivider && <Divider orientation='vertical' className={styles.divider} />}
        </div>
      )}

      {visibleFilters.map(filter => (
        <ForwardedChipChoice
          key={filter.id}
          {...filter}
          value={state[filter.id] as never}
          size={MAP_ROW_SIZE_TO_CHOICE_SIZE[size]}
          onChange={(value: FilterValue) => handleChange(filter.id, value)}
          onClearButtonClick={handleRemoveVisibleFilter(filter.id)}
          open={openedChip === filter.id}
          onOpenChange={handleChipOpen(filter.id)}
        />
      ))}

      <div className={styles.controlWrapper}>
        {showAddButton && (
          <Tooltip
            tip={t('addButtonDisabledTip')}
            open={canAddChips ? false : undefined}
            placement='bottom'
            data-test-id={CHIP_CHOICE_ROW_IDS.addButtonTooltip}
          >
            <Droplist
              open={canAddChips && addListOpen}
              onOpenChange={setAddListOpen}
              items={addSelectorOptions}
              triggerClassName={styles.addButtonWrapper}
              trigger='clickAndFocusVisible'
            >
              <ButtonFunction
                disabled={!canAddChips}
                label={t('add')}
                icon={<PlusSVG />}
                iconPosition='before'
                size={MAP_ROW_SIZE_TO_BUTTON_SIZE[size]}
                data-test-id={CHIP_CHOICE_ROW_IDS.addButton}
              />
            </Droplist>
          </Tooltip>
        )}

        {showClearButton && (
          <ButtonFunction
            onClick={handleFiltersClear}
            label={t('clear')}
            icon={<CrossSVG />}
            iconPosition='before'
            size={MAP_ROW_SIZE_TO_BUTTON_SIZE[size]}
            data-test-id={CHIP_CHOICE_ROW_IDS.clearButton}
          />
        )}
      </div>
    </div>
  );
}
