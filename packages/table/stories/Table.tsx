import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { PlaceholderSVG } from '@snack-ui/icons';
import { toaster } from '@snack-ui/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  CellContext,
  ColumnDefinition,
  HeaderContext,
  RowActionInfo,
  RowClickHandler,
  Table,
  TableProps,
} from '../src';
import { STORY_TEST_IDS, StoryStatusColumnViewMode } from './constants';
import { generateRows } from './helpers';
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
const renderCell = (ctx: CellContext<StubData, unknown>) => `Cell ${ctx.column.id}.${ctx.row.index + 1}`;

const columnDefinitions: ColumnDefinition<StubData>[] = [
  {
    id: '1',
    accessorKey: 'col1',
    header: renderHeader,
    cell: renderCell,
    size: 140,
    enableSorting: true,
    sortDescFirst: true,
    pinned: Table.columnPinPositions.Left,
  },
  {
    id: '2',
    accessorKey: 'col2',
    header: renderHeader,
    cell: renderCell,
    size: 140,
    pinned: Table.columnPinPositions.Left,
    enableSorting: true,
  },
  {
    id: '3',
    accessorKey: 'col3',
    header: renderHeader,
    cell: renderCell,
    minSize: 110,
  },
  {
    id: '4',
    accessorKey: 'col4',
    header: renderHeader,
    cell: renderCell,
    enableSorting: true,
  },
  {
    id: '5',
    accessorKey: 'col5',
    header: renderHeader,
    cell: renderCell,
    enableSorting: true,
  },
  {
    id: '6',
    accessorKey: 'col6',
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
    cell: info =>
      new Date(info.getValue<number>()).toLocaleDateString('ru-RU', {
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
          mapStatusToAppearance: Table.statusAppearances,
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
          actions: [
            {
              id: 'action-1',
              option: 'action 1',
              icon: <PlaceholderSVG />,
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

  return (
    <div className={styles.wrapper}>
      <Table
        {...args}
        columnDefinitions={columns}
        data={data}
        rowSelection={{
          multiRow: rowSelectionMode === 'multi',
          enable: disableSomeRows
            ? row => !['Not', 'Loading'].includes(row.original.status)
            : Boolean(rowSelectionMode) || undefined,
          onChange: () => {},
        }}
        onRowClick={enableOnRowClick ? handleRowClick : undefined}
      />
    </div>
  );
};

export const table: StoryObj<StoryProps> = Template.bind({});

table.args = {
  rowsAmount: 35,
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
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/Cg8s2BplhgexFNGbqV6EBF/Tables?type=design&node-id=0%3A1&mode=design&t=Cy738AeGJ7UCSSIR-1',
  },
};
