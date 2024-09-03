import { Row } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { DownloadSVG } from '@snack-uikit/icons';
import { Droplist } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { ColumnDefinition } from '../../types';

type ExportProps<TData> = { fileName: string; columnDefinitions: ColumnDefinition<TData>[]; data: TData[] };

export type ExportButtonProps<TData extends object> = {
  /** Данные для отрисовки */
  data: TData[];
  /** Определение внешнего вида и функционала колонок */
  columnDefinitions: ColumnDefinition<TData>[];

  settings: {
    /** Название файла при экспорте */
    fileName: string;

    /** Настройка фильтрации данных */
    filterData?: boolean;

    /** Обработчик экспорта в CSV */
    exportToCSV?(args: ExportProps<TData>): void;
    /** Обработчик экспорта в XLSX */
    exportToXLSX?(args: ExportProps<TData>): void;
  };

  topRows: Row<TData>[];
  centerRows: Row<TData>[];
};

export function ExportButton<TData extends object>({
  settings,
  data,
  columnDefinitions,
  topRows,
  centerRows,
}: ExportButtonProps<TData>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useLocale('Table');

  const { fileName, filterData = true } = settings;

  const filteredData = useMemo(() => {
    let newData = data;

    if (filterData) {
      newData = [...topRows, ...centerRows].map(row => row.original);
    }

    return newData;
  }, [centerRows, data, filterData, topRows]);

  return (
    <Droplist
      trigger='clickAndFocusVisible'
      open={isOpen}
      onOpenChange={setIsOpen}
      scroll
      placement='bottom-end'
      items={[
        {
          content: { option: t('export') + 'CSV' },
          onClick: () => {
            settings.exportToCSV?.({ fileName, columnDefinitions, data: filteredData });
            setIsOpen(false);
          },
          hidden: !settings.exportToCSV,
        },
        {
          content: { option: t('export') + 'XLSX' },
          onClick: () => {
            settings.exportToXLSX?.({ fileName, columnDefinitions, data: filteredData });
            setIsOpen(false);
          },
          hidden: !settings.exportToXLSX,
        },
      ]}
    >
      <ButtonFunction size='m' icon={<DownloadSVG />} />
    </Droplist>
  );
}
