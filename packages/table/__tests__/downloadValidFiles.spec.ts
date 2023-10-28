import * as fs from 'fs';

import { utils as xlsxUtils } from 'xlsx';

import { ColumnDefinition } from '../src';
import { exportToXLSX } from '../src/exportTable';

type StubData = {
  status: string;
  col1: number;
  col2: number;
  col3: number;
  col4: number;
  date: number;
};

describe('downloadValidFiles', () => {
  const columnDefinitions: ColumnDefinition<StubData>[] = [
    { id: '1', accessorKey: 'col1', size: 140, enableSorting: true, sortDescFirst: true },
    { id: '2', accessorKey: 'col2', size: 140, enableSorting: true },
    { id: '3', accessorKey: 'col3', minSize: 110 },
    { id: '4', accessorKey: 'col4', enableSorting: true },
    { id: '5', accessorKey: 'date', enableSorting: true, size: 146 },
  ];

  const mockData = [
    { status: 'Loading', col2: 0, col4: 0, col1: 0, col3: 0, date: 1337919743656 },
    { status: 'Green', col3: 1, col1: 1, col4: 1, col2: 1, date: 1285032902056 },
  ];
  const fileName = 'TestTable';

  it('download XLSX files with elements in the correct order', () => {
    const expectedResult = [
      {
        col1: 0,
        col2: 0,
        col3: 0,
        col4: 0,
        date: 1337919743656,
      },
      {
        col1: 1,
        col2: 1,
        col3: 1,
        col4: 1,
        date: 1285032902056,
      },
    ];

    const result = xlsxUtils.sheet_to_json(exportToXLSX({ columnDefinitions, data: mockData, fileName }));

    expect(result).toEqual(expectedResult);

    // delete created file
    fs.unlinkSync(`${process.cwd()}/${fileName}.xlsx`);
  });
});
