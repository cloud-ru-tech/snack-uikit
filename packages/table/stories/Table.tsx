import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { toaster } from '@snack-ui/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  ColumnDefinition,
  HeaderContext,
  RowActionInfo,
  RowClickHandler,
  RowSelectionState,
  Table,
  TableProps,
} from '../src';
import { STORY_TEST_IDS, StoryStatusColumnViewMode } from './constants';
import { generateRows, numberFormatter } from './helpers';
import styles from './styles.module.scss';
import { StubData } from './types';

const meta: Meta = {
  title: 'Components/Table',
  component: Table,
};
export default meta;

type Props = TableProps<StubData>;

type StoryProps = Omit<Props, 'rowSelection' | 'sort'> & {
  rowSelection?: { enable: boolean; multiRow: boolean };
  rowsAmount: number;
  disableSomeRows: boolean;
  statusColumnViewMode?: StoryStatusColumnViewMode;
  showActionsColumn?: boolean;
  rowSelectionMode?: 'single' | 'multi';
  enableOnRowClick: boolean;
};

const renderHeader = (ctx: HeaderContext<StubData, unknown>) => `Table column №${ctx.column.id}`;
const accessorFn = (key: keyof StubData) => (row: StubData) =>
  `Cell ${Math.trunc(Number(row[key]) / 5) + 1}.${(Number(row[key]) % 5) + 1}`;

const columnDefinitions: ColumnDefinition<StubData>[] = [
  {
    id: '1',
    accessorKey: 'col1',
    accessorFn: accessorFn('col1'),
    header: renderHeader,
    size: 140,
    enableSorting: true,
    sortDescFirst: true,
    pinned: Table.columnPinPositions.Left,
  },
  {
    id: '2',
    accessorKey: 'col2',
    accessorFn: accessorFn('col2'),
    header: renderHeader,
    size: 200,
    pinned: Table.columnPinPositions.Left,
    enableSorting: true,
  },
  {
    id: '3',
    accessorKey: 'col3',
    accessorFn: accessorFn('col3'),
    header: renderHeader,
    minSize: 110,
    sortDescFirst: true,
  },
  {
    id: '4',
    accessorKey: 'col4',
    accessorFn: accessorFn('col4'),
    header: renderHeader,
    enableSorting: true,
  },
  {
    id: '5',
    accessorKey: 'col5',
    header: renderHeader,
    accessorFn: accessorFn('col5'),
    enableSorting: true,
  },
  {
    id: '6',
    accessorKey: 'col6',
    cell: cell => numberFormatter.format(cell.getValue<number>()),
    header: renderHeader,
    size: 150,
    align: Table.columnAligns.Right,
    enableSorting: true,
  },
  {
    id: '7',
    accessorKey: 'date',
    header: renderHeader,
    enableSorting: true,
    size: 146,
    align: Table.columnAligns.Right,
    pinned: Table.columnPinPositions.Right,
    sortingFn: (a, b) => a.original.date - b.original.date,
    accessorFn: row =>
      new Date(row.date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
  },
];

const Template: StoryFn<StoryProps> = ({
  columnDefinitions,
  rowsAmount,
  disableSomeRows,
  statusColumnViewMode,
  showActionsColumn,
  rowSelectionMode,
  enableOnRowClick,
  ...args
}: StoryProps) => {
  const data = useMemo(() => generateRows(rowsAmount), [rowsAmount]);

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const onDelete = useCallback(
    (rowSelectionState: RowSelectionState, resetRowSelection: (defaultState?: boolean) => void) => {
      setFilteredData(data => data.filter((_, index) => !rowSelectionState?.[index]));
      resetRowSelection();
    },
    [],
  );

  const columns = useMemo(() => {
    let colDefs = [...columnDefinitions];

    if (statusColumnViewMode) {
      const statusColDefProps =
        statusColumnViewMode === StoryStatusColumnViewMode.Full
          ? {
              header: 'Status',
              size: 100,
              renderDescription: (value: string) => value,
            }
          : {};

      colDefs = [
        Table.getStatusColumnDef<StubData>({
          accessorKey: 'status',
          mapStatusToAppearance: value => Table.statusAppearances[value],
          ...statusColDefProps,
        }),
        ...colDefs,
      ];
    }

    if (showActionsColumn) {
      const handleRowActionClick = (row: RowActionInfo<StubData>) => {
        toaster.userAction.success({
          label: `${row.rowId} ${row.itemId}`,
          'data-test-id': STORY_TEST_IDS.toaster,
        });
      };

      colDefs.push(
        Table.getRowActionsColumnDef({
          pinned: true,
          actionsGenerator: () => [
            {
              id: 'action-1',
              option: 'action 1',
              onClick: handleRowActionClick,
            },
            {
              id: 'action-2',
              option: 'action 2',
              onClick: handleRowActionClick,
            },
            {
              id: 'action-3',
              option: 'action 3',
              onClick: handleRowActionClick,
            },
          ],
        }),
      );
    }

    return colDefs;
  }, [columnDefinitions, showActionsColumn, statusColumnViewMode]);

  const handleRowClick: RowClickHandler<StubData> = (_, row) => {
    toaster.userAction.success({
      label: `clicked row ${row.id}`,
    });
  };

  const onRefresh = () => {
    setFilteredData(data);
  };

  return (
    <div className={styles.wrapper}>
      <Table
        {...args}
        columnDefinitions={columns}
        data={filteredData}
        onDelete={onDelete}
        className={styles.className}
        pagination={{
          options: [5, 10],
        }}
        rowSelection={{
          multiRow: rowSelectionMode === 'multi',
          enable: disableSomeRows
            ? row => !['Not', 'Loading'].includes(row.original.status)
            : Boolean(rowSelectionMode) || undefined,
        }}
        onRefresh={onRefresh}
        onRowClick={enableOnRowClick ? handleRowClick : undefined}
      />
    </div>
  );
};

export const table: StoryObj<StoryProps> = Template.bind({});

table.args = {
  suppressPagination: false,
  suppressToolbar: false,
  rowsAmount: 35,
  loading: false,
  statusColumnViewMode: StoryStatusColumnViewMode.Full,
  showActionsColumn: true,
  data: [],
  columnDefinitions,
  rowSelection: {
    enable: true,
    multiRow: true,
  },
  rowSelectionMode: 'multi',
  disableSomeRows: false,
  onRowClick: () => {},
  enableOnRowClick: false,
  'data-test-id': STORY_TEST_IDS.table,
};

table.argTypes = {
  rowsAmount: {
    name: '[Stories]: Amount of rows within the table',
    description: 'demonstration purposes only, this parameter does not exist in component',
    control: {
      type: 'range',
      min: 0,
      max: 100,
      step: 1,
    },
  },
  disableSomeRows: {
    name: '[Stories]: Make some rows disabled',
    control: {
      type: 'boolean',
    },
    if: { arg: 'rowSelectionMode', truthy: true },
  },
  statusColumnViewMode: {
    name: '[Stories]: Show Status',
    options: [undefined, ...Object.values(StoryStatusColumnViewMode)],
    control: {
      type: 'select',
    },
  },
  showActionsColumn: {
    name: '[Stories]: Show RowActions',
    control: {
      type: 'boolean',
    },
  },
  rowSelection: {
    name: 'rowSelection',
    description: 'Disabled for storybook and tests purpose',
    control: {
      type: 'disabled',
    },
  },
  rowSelectionMode: {
    name: '[Stories]: Choose row selection mode',
    options: [undefined, 'multi', 'single'],
    control: {
      type: 'select',
    },
  },
  enableOnRowClick: {
    name: '[Stories]: Enable row click',
    control: {
      type: 'boolean',
    },
  },
  onRowClick: {
    control: {
      type: 'disabled',
    },
  },
};

table.parameters = {
  controls: { expanded: true },
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/Cg8s2BplhgexFNGbqV6EBF/Tables?type=design&node-id=0%3A1&mode=design&t=Cy738AeGJ7UCSSIR-1',
  },
};
