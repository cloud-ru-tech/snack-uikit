import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { COLUMN_PIN_POSITION, TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import { MIN_STATUS_CELL_SIZE, STATUS_APPEARANCE } from './constants';
import styles from './styles.module.scss';
import { StatusAppearance } from './types';

export type { StatusAppearance };

export { STATUS_APPEARANCE };

type StatusCellProps = {
  label?: string;
  appearance: StatusAppearance;
};

export type MapStatusToAppearanceFnType = (value: string | number) => StatusAppearance;

type BaseStatusColumnDef = {
  /** Имя ключа соответствующее полю в data */
  accessorKey: string;
  /** Маппинг значений статуса на цвета */
  mapStatusToAppearance: MapStatusToAppearanceFnType;
  /** Включение/выключение сортировки */
  enableSorting?: boolean;
};

type StatusColumnDef = BaseStatusColumnDef & {
  renderDescription?: never;
  size?: never;
  minSize?: never;
  maxSize?: never;
  header?: never;
  enableResizing?: never;
};

type StatusColumnDefWithDescription<TData> = BaseStatusColumnDef & {
  /** Функция для отрисовки текста, если не передана, то будет отрисован только индикатор статуса */
  renderDescription(cellValue: string, row: TData): string;
  /** Размер ячейки */
  size: number;
  minSize?: number;
  maxSize?: number;
  /** Заголовок колонки */
  header?: ColumnDefinition<TData>['header'];
  /** Включение/выключение ресайза колонки */
  enableResizing?: boolean;
};

export type StatusColumnDefinitionProps<TData> = StatusColumnDef | StatusColumnDefWithDescription<TData>;

function StatusCell({ appearance, label }: StatusCellProps) {
  const isLoading = appearance === STATUS_APPEARANCE.Loading;

  return (
    <div className={styles.statusCell} data-no-label={!label || undefined}>
      <div
        data-appearance={isLoading ? undefined : appearance}
        className={styles.statusCellIndicator}
        data-loading={isLoading || undefined}
        data-test-id={TEST_IDS.statusIndicator}
      />

      {label && (
        <div className={styles.statusCellLabel} data-test-id={TEST_IDS.statusLabel}>
          <Typography.LightLabelS>
            <TruncateString text={label} />
          </Typography.LightLabelS>
        </div>
      )}
    </div>
  );
}

/** Вспомогательная функция для создания ячейки со статусом */
export function getStatusColumnDef<TData>({
  header,
  accessorKey,
  mapStatusToAppearance,
  renderDescription,
  size,
  maxSize,
  minSize,
  enableSorting = true,
  enableResizing,
}: StatusColumnDefinitionProps<TData>): ColumnDefinition<TData> {
  const hasDescription = Boolean(renderDescription);

  return {
    id: 'snack_predefined_statusColumn',
    pinned: COLUMN_PIN_POSITION.Left,
    noBodyCellPadding: true,
    noHeaderCellPadding: !hasDescription,
    noHeaderCellBorderOffset: hasDescription,
    size: hasDescription ? (size as number) : MIN_STATUS_CELL_SIZE,
    minSize: enableSorting || hasDescription ? Math.max(MIN_STATUS_CELL_SIZE, minSize || 0) : 1,
    maxSize: maxSize,
    meta: {
      skipOnExport: true,
    },
    accessorKey,
    enableSorting,
    header: hasDescription ? header : undefined,
    enableResizing: enableResizing ?? hasDescription,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accessorFn: (row: any) =>
      renderDescription && Object.hasOwn(row as object, accessorKey)
        ? renderDescription(row[accessorKey] as string, row)
        : undefined,
    cell: cell => {
      const value =
        typeof cell.row.original === 'object' && Object.hasOwn(cell.row.original as object, accessorKey)
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (cell.row.original[accessorKey] as string)
          : cell.getValue<string>();

      const appearance = mapStatusToAppearance(value);

      return (
        <StatusCell
          appearance={appearance}
          label={renderDescription ? renderDescription(value, cell.row.original) : undefined}
        />
      );
    },
  };
}
