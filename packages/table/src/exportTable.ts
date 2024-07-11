import { utils as xlsxUtils, writeFileXLSX } from 'xlsx';

import { ColumnDefinition } from './types';

type ExportTableData<TData> = {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
  fileName?: string;
};

type ColumnKey<TData> = keyof ColumnDefinition<TData>;

function getColumnValue<TData>(column: ColumnDefinition<TData>, key: ColumnKey<TData>): string | undefined {
  if (key in column && column[key] && typeof column[key] !== 'object' && typeof column[key] !== 'function') {
    return String(column[key]);
  }
}

function getFilteredColumnsIds<TData extends object>(columnDefinitions: ColumnDefinition<TData>[]) {
  const accessorKey = 'accessorKey' as ColumnKey<TData>;

  return (columnDefinitions as ColumnDefinition<TData>[])
    .filter(column => getColumnValue(column, accessorKey) && !column.meta?.skipOnExport)
    .map(column => getColumnValue(column, accessorKey));
}

function getFilteredColumnsHeaders<TData extends object>(columnDefinitions: ColumnDefinition<TData>[]) {
  const accessorKey = 'accessorKey' as ColumnKey<TData>;
  const header = 'header' as ColumnKey<TData>;

  return (columnDefinitions as ColumnDefinition<TData>[])
    .filter(column => getColumnValue(column, accessorKey) && !column.meta?.skipOnExport)
    .map(column => getColumnValue(column, header) || getColumnValue(column, accessorKey));
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
  const headers = getFilteredColumnsHeaders(columnDefinitions);
  const table = [headers, ...xlsxData];
  const csv = table.map(line => line.map(el => (el === undefined ? `""` : `"${el}"`)).join(',')).join('\n');

  const utf8Prefix = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([utf8Prefix, csv], { type: 'text/csv' });
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
  const headers = getFilteredColumnsHeaders(columnDefinitions);
  const workbook = xlsxUtils.book_new();
  const worksheet = xlsxUtils.aoa_to_sheet([headers, ...xlsxData]);
  xlsxUtils.book_append_sheet(workbook, worksheet);
  writeFileXLSX(workbook, `${fileName}.xlsx`);

  return worksheet;
}
