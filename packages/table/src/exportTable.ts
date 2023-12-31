import { utils as xlsxUtils, writeFileXLSX } from 'xlsx';

import { ColumnDefinition } from './types';

type ExportTableData<TData> = {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
  fileName?: string;
};

function getColumnAccessorKey<TData>(column: ColumnDefinition<TData>): string | undefined {
  if ('accessorKey' in column && column.accessorKey) {
    return String(column.accessorKey);
  }
}

function getFilteredColumnsIds<TData extends object>(columnDefinitions: ColumnDefinition<TData>[]) {
  return (columnDefinitions as ColumnDefinition<TData>[])
    .filter(column => getColumnAccessorKey(column) && !column.meta?.skipOnExport)
    .map(column => getColumnAccessorKey(column));
}

function getXlsxFormatTable<TData extends object>({
  data,
  columnDefinitions,
}: {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
}) {
  const filteredIds = getFilteredColumnsIds(columnDefinitions);
  return data.map((line: TData) => {
    const lineRecord = line as Record<string, string>;
    const result: string[] = [];
    filteredIds.forEach(key => {
      if (!key) {
        result.push('');
        return;
      }

      result.push(lineRecord[key]);
    });
    return result;
  });
}

export function exportToCSV<TData extends object>({
  columnDefinitions,
  fileName = 'Table',
  data,
}: ExportTableData<TData>) {
  const xlsxData = getXlsxFormatTable({ data, columnDefinitions });
  const filteredIds = getFilteredColumnsIds(columnDefinitions);
  const table = [filteredIds, ...xlsxData];
  const csv = table.map(line => line.map(el => `"${el}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const tempLink = Object.assign(document.createElement('a'), {
    target: '_blank',
    href: url,
    download: fileName,
  });
  tempLink.click();
  tempLink.remove();

  return csv;
}

export function exportToXLSX<TData extends object>({
  columnDefinitions,
  fileName = 'Table',
  data,
}: ExportTableData<TData>) {
  const xlsxData = getXlsxFormatTable({ data, columnDefinitions });
  const filteredIds = getFilteredColumnsIds(columnDefinitions);
  const workbook = xlsxUtils.book_new();
  const worksheet = xlsxUtils.aoa_to_sheet([filteredIds, ...xlsxData]);
  xlsxUtils.book_append_sheet(workbook, worksheet);
  writeFileXLSX(workbook, `${fileName}.xlsx`);

  return worksheet;
}
