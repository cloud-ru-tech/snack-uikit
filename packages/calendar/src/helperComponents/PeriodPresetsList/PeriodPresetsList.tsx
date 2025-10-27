import cn from 'classnames';
import React, { useContext, useMemo } from 'react';

import { List, ListProps } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { PresetItem, Range } from '../../types';
import { CalendarContext } from '../CalendarContext';
import styles from './styles.module.scss';

export type PresetsListProps = WithSupportProps<{
  /** Действие при выборе пресета */
  onChange(range: Range): void;
  /** Список пресетов */
  items: PresetItem[];
  /**
   * Скрытие заголовка списка
   * @default true
   */
  showTitle?: boolean;
  /** CSS-класс */
  className?: string;
}>;

export function PeriodPresetsList({ items, onChange, showTitle = true, className, ...rest }: PresetsListProps) {
  const { t } = useLocale('Calendar');

  const { size, getTestId } = useContext(CalendarContext);

  const listItems: ListProps['items'] = useMemo(
    () =>
      items.map(item => ({
        id: item.id,
        content: {
          option: item.label,
        },
        onClick() {
          onChange(item.range);
        },
        checked: false,
      })),
    [items, onChange],
  );

  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      {showTitle && (
        <div className={styles.header} data-size={size}>
          <span className={styles.title} data-test-id={getTestId('presets-header')}>
            {t('presets')}
          </span>
        </div>
      )}
      <List
        size={size}
        items={listItems}
        scroll
        selection={{ mode: 'single', value: undefined }}
        hasListInFocusChain={false}
      />
    </div>
  );
}
