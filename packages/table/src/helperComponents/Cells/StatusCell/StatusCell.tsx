import { TruncateString } from '@snack-ui/truncate-string';
import { Typography } from '@snack-ui/typography';

import { ColumnPinPosition, TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import { MIN_STATUS_CELL_SIZE, StatusAppearance } from './constants';
import styles from './styles.module.scss';

export { StatusAppearance };

type StatusCellProps = {
  label?: string;
  appearance: StatusAppearance;
};

type BaseStatusColumnDef = {
  /** Имя ключа соответствующее полю в data */
  accessorKey: string;
  /** Маппинг значений статуса на цвета */
  mapStatusToAppearance(value: string | number): StatusAppearance;
  /** Включение/выключение сортировки */
  enableSorting?: boolean;
};

type StatusColumnDef = BaseStatusColumnDef & {
  renderDescription?: never;
  size?: never;
  header?: never;
};

type StatusColumnDefWithDescription<TData> = BaseStatusColumnDef & {
  /** Функция для отрисовки текста, если не передана, то будет отрисован только индикатор статуса */
  renderDescription(cellValue: string): string;
  /** Размер ячейки */
  size: number;
  /** Заголовок колонки */
  header?: ColumnDefinition<TData>['header'];
};

export type StatusColumnDefinitionProps<TData> = StatusColumnDef | StatusColumnDefWithDescription<TData>;

function StatusCell({ appearance, label }: StatusCellProps) {
  const isLoading = appearance === StatusAppearance.Loading;

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
  enableSorting,
}: StatusColumnDefinitionProps<TData>): ColumnDefinition<TData> {
  const hasDescription = Boolean(renderDescription);

  return {
    id: 'snack_predefined_statusColumn',
    pinned: ColumnPinPosition.Left,
    noBodyCellPadding: true,
    noHeaderCellPadding: !hasDescription,
    noHeaderCellBorderOffset: hasDescription,
    size: hasDescription ? (size as number) : MIN_STATUS_CELL_SIZE,
    minSize: MIN_STATUS_CELL_SIZE,
    meta: {
      skipOnExport: true,
    },
    accessorKey,
    enableSorting,
    header: hasDescription ? header : undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accessorFn: (row: any) =>
      renderDescription && Object.hasOwn(row as object, accessorKey)
        ? renderDescription(row[accessorKey] as string)
        : undefined,
    cell: cell => {
      const value =
        typeof cell.row.original === 'object' && Object.hasOwn(cell.row.original as object, accessorKey)
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (cell.row.original[accessorKey] as string)
          : cell.getValue<string>();

      const appearance = mapStatusToAppearance(value);

      return <StatusCell appearance={appearance} label={renderDescription ? renderDescription(value) : undefined} />;
    },
  };
}
