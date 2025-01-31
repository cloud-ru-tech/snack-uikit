import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { TrashSVG } from '@snack-uikit/icons';
import { TagRow, TagRowProps } from '@snack-uikit/tag';
import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  ColumnDefinition,
  CopyCell,
  exportToCSV,
  exportToXLSX,
  HeaderContext,
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
  expandRowsCount: number;
  expandRowsLevel: number;
  disableSomeRows: boolean;
  pinSomeRows: boolean;
  showExport: boolean;
  statusColumnViewMode?: StoryStatusColumnViewMode;
  showTableTree: boolean;
  showActionsColumn?: boolean;
  rowSelectionMode?: 'single' | 'multi';
  enableOnRowClick: boolean;
  statusSortEnabled: boolean;
};

const PINNED_TOP_ROWS = ['0', '2'];

const renderHeader = (ctx: HeaderContext<StubData, unknown>) => `Table column №${ctx.column.id}`;
const accessorFn = (key: keyof StubData) => (row: StubData) =>
  `Cell ${Math.trunc(Number(row[key]) / 5) + 1}.${(Number(row[key]) % 5) + 1}`;

const tags: TagRowProps['items'] = [
  { label: 'tag1xxx', appearance: 'red' },
  { label: 'tag2x', appearance: 'yellow' },
  { label: 'tag3xxxxx', appearance: 'orange' },
  { label: 'tag4xx', appearance: 'green' },
  { label: 'tag5xxx', appearance: 'blue' },
  { label: 'tag6x', appearance: 'pink' },
];

const columnDefinitions: ColumnDefinition<StubData>[] = [
  {
    id: '1',
    accessorKey: 'col1',
    accessorFn: accessorFn('col1'),
    header: renderHeader,
    size: 140,
    enableSorting: true,
    enableResizing: true,
    sortDescFirst: true,
    pinned: 'left',
  },
  {
    id: '2',
    accessorKey: 'col2',
    accessorFn: accessorFn('col2'),
    header: renderHeader,
    size: 200,
    minSize: 150,
    maxSize: 300,
    pinned: 'left',
    enableSorting: true,
    enableResizing: true,
  },
  {
    id: '3',
    accessorKey: 'col3',
    accessorFn: accessorFn('col3'),
    header: renderHeader,
    minSize: 110,
    sortDescFirst: true,
    enableResizing: true,
  },
  {
    id: '4',
    accessorKey: 'col4',
    accessorFn: accessorFn('col4'),
    header: renderHeader,
    enableSorting: true,
    enableResizing: true,
  },
  {
    id: '5',
    accessorKey: 'col5',
    header: renderHeader,
    accessorFn: accessorFn('col5'),
    cell: ctx => <CopyCell value={ctx.getValue<string>()} />,
    enableSorting: true,
    enableResizing: true,
  },
  {
    id: '6',
    accessorKey: 'col6',
    cell: cell => numberFormatter.format(cell.getValue<number>()),
    header: renderHeader,
    size: 150,
    headerAlign: 'right',
    align: 'right',
    enableSorting: true,
    enableResizing: false,
  },
  {
    id: '7',
    accessorKey: 'col7',
    cell: () => <TagRow items={tags} rowLimit={1} />,
    header: renderHeader,
    size: 230,
  },
  {
    id: '8',
    accessorKey: 'date',
    header: renderHeader,
    enableSorting: true,
    enableResizing: true,
    size: 146,
    align: 'right',
    pinned: 'right',
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
  expandRowsLevel,
  expandRowsCount,
  disableSomeRows,
  pinSomeRows,
  statusColumnViewMode,
  showTableTree,
  showActionsColumn,
  rowSelectionMode,
  enableOnRowClick,
  showExport,
  ...args
}: StoryProps) => {
  const data = useMemo(
    () => generateRows(rowsAmount, { count: expandRowsCount, level: expandRowsLevel }),
    [rowsAmount, expandRowsLevel, expandRowsCount],
  );
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
              size: 110,
              renderDescription: (value: string, stub: StubData) => (stub.status === 'Not' ? 'Custom status' : value),
              enableResizing: true,
            }
          : {};

      colDefs = [
        Table.getStatusColumnDef<StubData>({
          accessorKey: 'status',
          mapStatusToAppearance: value => Table.statusAppearances[value],
          enableSorting: args.statusSortEnabled,
          ...statusColDefProps,
        }),
        ...colDefs,
      ];
    }

    if (showActionsColumn) {
      const handleRowActionClick = ({ rowId, itemId }: { rowId: string; itemId: string }) => {
        toaster.userAction.success({
          label: `${rowId} ${itemId}`,
          'data-test-id': STORY_TEST_IDS.toaster,
        });
      };

      colDefs.push(
        Table.getRowActionsColumnDef({
          pinned: true,
          actionsGenerator: cell => [
            {
              id: 'action-1',
              content: { option: 'action 1' },
              onClick: () => handleRowActionClick({ rowId: cell.row.id, itemId: 'action-1' }),
              'data-test-id': 'test-custom',
            },
            {
              id: 'action-2',
              content: { option: 'action 2' },
              onClick: () => handleRowActionClick({ rowId: cell.row.id, itemId: 'action-2' }),
            },
            {
              id: 'action-3',
              content: { option: 'action 3' },
              onClick: () => handleRowActionClick({ rowId: cell.row.id, itemId: 'action-3' }),
            },
            {
              id: 'group-1',
              type: 'group',
              items: [
                {
                  id: 'action-4',
                  content: { option: 'action 4' },
                  onClick: () => handleRowActionClick({ rowId: cell.row.id, itemId: 'action-4' }),
                },
              ],
              divider: true,
            },
          ],
        }),
      );
    }

    return colDefs;
  }, [args.statusSortEnabled, columnDefinitions, showActionsColumn, statusColumnViewMode]);

  const handleRowClick: RowClickHandler<StubData> = (_, row) => {
    toaster.userAction.success({
      label: `clicked row ${row.id}`,
    });
  };

  const onRefresh = () => {
    setFilteredData(data);
  };

  const modifyPaginationLabel = pinSomeRows && args.keepPinnedRows;
  const getNotPinnedRows = (totalRows: string | number) =>
    Number(totalRows) - (modifyPaginationLabel && !args.copyPinnedRows ? PINNED_TOP_ROWS.length : 0);
  const paginationOptionsRender = (value: string | number) =>
    `${getNotPinnedRows(value)}${modifyPaginationLabel ? ` + ${PINNED_TOP_ROWS.length}` : ''}`;

  return (
    <div className={styles.wrapper}>
      <Table
        {...args}
        columnDefinitions={columns}
        data={filteredData}
        bulkActions={[
          {
            label: 'Удалить',
            icon: TrashSVG,
            onClick: onDelete,
          },
        ]}
        className={styles.className}
        expanding={
          showTableTree
            ? {
                getSubRows: (element: StubData) => element.subRows,
                expandingColumnDefinition: {
                  showToggle: Boolean(rowSelectionMode),
                  accessorKey: 'tree',
                  header: 'Tree column',
                },
              }
            : undefined
        }
        pagination={{
          options: [5, 10],
          optionsRender: paginationOptionsRender,
        }}
        rowSelection={{
          multiRow: rowSelectionMode === 'multi',
          enable: disableSomeRows
            ? row => !['Not', 'Loading'].includes(row.original.status)
            : Boolean(rowSelectionMode) || undefined,
        }}
        onRefresh={onRefresh}
        onRowClick={enableOnRowClick ? handleRowClick : undefined}
        rowPinning={pinSomeRows ? { top: PINNED_TOP_ROWS } : undefined}
        exportSettings={showExport ? { fileName: 'test-export', exportToCSV, exportToXLSX } : undefined}
      />
    </div>
  );
};
export const table: StoryObj<StoryProps> = {
  render: Template,

  args: {
    suppressPagination: false,
    suppressToolbar: false,
    rowsAmount: 35,
    expandRowsCount: 3,
    expandRowsLevel: 3,
    loading: false,
    statusColumnViewMode: StoryStatusColumnViewMode.Full,
    statusSortEnabled: true,
    showActionsColumn: true,
    showTableTree: false,
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
    enableFuzzySearch: false,
    'data-test-id': STORY_TEST_IDS.table,
    showExport: false,
    pinSomeRows: false,
    savedState: {
      id: 'snack-ui-table-storybook',
      resize: true,
    },
  },

  argTypes: {
    expandRowsCount: {
      name: '[Stories]: Amount of  subRows ',
      control: {
        type: 'range',
        min: 0,
        max: 10,
        step: 1,
      },
    },
    expandRowsLevel: {
      name: '[Stories]: Level of  subRows ',
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 1,
      },
    },

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
    showTableTree: {
      name: '[Stories]: Show tree column',
      control: {
        type: 'boolean',
      },
    },

    statusSortEnabled: {
      name: '[Stories]: enable sort by status column',
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
        disable: true,
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
        disable: true,
      },
    },
    pinSomeRows: {
      name: '[Stories]: Pin 1st and 3rd row',
      controls: {
        type: 'boolean',
      },
    },
    showExport: {
      name: '[Stories]: Show export example',
      controls: {
        type: 'boolean',
      },
    },
    savedState: {
      name: '[Stories]: Save resize state in local storage',
      controls: {
        type: 'object',
      },
    },
  },

  parameters: {
    controls: { expanded: true },
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A225842&mode=design',
    },
  },
};
