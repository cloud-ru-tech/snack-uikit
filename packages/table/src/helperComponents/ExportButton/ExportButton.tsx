import { Row } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { DownloadSVG } from '@snack-uikit/icons';
import { Droplist } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { exportToCSV, exportToXLSX } from '../../exportTable';
import { ColumnDefinition } from '../../types';

type Format = {
  csv?: boolean;
  xslx?: boolean;
};

export type ExportButtonProps<TData extends object> = {
  /** Данные для отрисовки */
  data: TData[];
  /** Определение внешнего вида и функционала колонок */
  columnDefinitions: ColumnDefinition<TData>[];

  settings: {
    /** Название файла при экспорте */
    fileName: string;

    /** Доступные форматы экспорта */
    format?: Format;

    /** Настройка фильтрации данных */
    filterData?: boolean;
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
  const format: Format = Object.assign({ csv: true, xslx: true }, settings.format);

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
            exportToCSV<TData>({ fileName, columnDefinitions, data: filteredData });
            setIsOpen(false);
          },
          hidden: !format.csv,
        },
        {
          content: { option: t('export') + 'XLSX' },
          onClick: () => {
            exportToXLSX<TData>({ fileName, columnDefinitions, data: filteredData });
            setIsOpen(false);
          },
          hidden: !format.xslx,
        },
      ]}
    >
      <ButtonFunction size='m' icon={<DownloadSVG />} />
    </Droplist>
  );
}
