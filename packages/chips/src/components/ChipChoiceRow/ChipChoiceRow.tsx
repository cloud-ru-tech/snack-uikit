import cn from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';

import { ButtonFunction } from '@snack-uikit/button';
import { CrossSVG } from '@snack-uikit/icons';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CHIP_CHOICE_ROW_IDS } from '../../constants';
import { ForwardedChipChoice } from './components';
import { CHIP_CHOICE_ROW_SIZE, MAP_ROW_SIZE_TO_BUTTON_SIZE, MAP_ROW_SIZE_TO_CHOICE_SIZE } from './constants';
import styles from './styles.module.scss';
import { ChipChoiceProps, ChipChoiceRowSize, FilterValue, OmitBetter } from './types';

export type FiltersState = Record<string, unknown>;

export type ChipChoiceRowProps<TState extends FiltersState> = WithSupportProps<{
  /** Состояние фильтров */
  value?: TState;
  /** Начальное состояние фильтров */
  defaultValue?: Partial<TState>;
  /** Колбек изменения состояния фильтров */
  onChange?(filters: TState): void;
  /** Массив чипов */
  filters: OmitBetter<ChipChoiceProps, 'onChange' | 'value' | 'size' | 'defaultValue'>[];
  /** Размер @default 's' */
  size?: ChipChoiceRowSize;
  /** CSS-класс */
  className?: string;
  /** Скрыть/показать кнопку очиски @default true */
  showClearAllButton?: boolean;
  /** Текст кнопки очистки @default 'Clear all' */
  clearAllButtonLabel?: string;
}>;

export function ChipChoiceRow<TState extends FiltersState>({
  filters,
  onChange,
  showClearAllButton = true,
  clearAllButtonLabel = 'Clear all',
  className,
  value,
  defaultValue,
  size = CHIP_CHOICE_ROW_SIZE.S,
  ...rest
}: ChipChoiceRowProps<TState>) {
  const [state, setState] = useUncontrolledProp<TState>(value, (defaultValue ?? {}) as TState, newState => {
    const result = typeof newState === 'function' ? newState(state) : newState;
    onChange?.(result);
  });

  const handleChange = (fieldId: string, value: FilterValue) => {
    setState((state: TState) => ({
      ...state,
      [fieldId]: value,
    }));
  };

  const handleFiltersClear = () => {
    setState({} as TState);
  };

  const hasAnyFilter = Object.values(state).some(filter => {
    if (Array.isArray(filter)) {
      return filter.length > 0 && Object.values(filter).some(Boolean);
    }

    if (filter && typeof filter === 'object') {
      return Object.values(filter).some(Boolean) || filter instanceof Date;
    }

    return Boolean(filter);
  });

  return (
    <div className={cn(styles.chipChoiceRow, className)} {...extractSupportProps(rest)}>
      {filters.map(filter => (
        <ForwardedChipChoice
          key={filter.id}
          {...filter}
          value={state[filter.id] as never}
          size={MAP_ROW_SIZE_TO_CHOICE_SIZE[size]}
          onChange={(value: FilterValue) => handleChange(filter.id, value)}
        />
      ))}

      {showClearAllButton && hasAnyFilter && (
        <ButtonFunction
          onClick={handleFiltersClear}
          label={clearAllButtonLabel}
          icon={<CrossSVG />}
          iconPosition='before'
          size={MAP_ROW_SIZE_TO_BUTTON_SIZE[size]}
          data-test-id={CHIP_CHOICE_ROW_IDS.clearAllButton}
        />
      )}
    </div>
  );
}
