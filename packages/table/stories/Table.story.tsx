import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { TrashSVG } from '@snack-uikit/icons';
import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { exportToCSV, exportToXLSX, RowClickHandler, RowSelectionState, Table, TableProps } from '../src';
import { STORY_TEST_IDS, StoryStatusColumnViewMode } from './constants';
import { generateRows } from './helpers';
import { useInfiniteLoading, useTableColumnDefinitions } from './hooks';
import styles from './styles.module.scss';
import { Filters, StubData } from './types';

const meta: Meta = {
  title: 'Components/Table',
  component: Table,
};
export default meta;

type StoryProps = Omit<TableProps<StubData, Filters>, 'rowSelection' | 'sort' | 'columnDefinitions'> & {
  rowSelection?: { enable: boolean; multiRow: boolean };
  rowsAmount: number;
  expandRowsCount: number;
  expandRowsLevel: number;
  disableSomeRows: boolean;
  pinSomeRows: boolean;
  showExport: boolean;
  showFilters: boolean;
  statusColumnViewMode?: StoryStatusColumnViewMode;
  showTableTree: boolean;
  showActionsColumn?: boolean;
  rowSelectionMode?: 'single' | 'multi';
  enableOnRowClick: boolean;
  statusSortEnabled: boolean;
  enableColumnsOrderSortByDrag: boolean;
  showColumnsSettings: boolean;
  initialColumnFiltersOpen: boolean;
};

const PINNED_TOP_ROWS = ['0', '2'];

const columnFilters: TableProps<StubData, Filters>['columnFilters'] = {
  defaultValue: {
    single: 'op1',
    multiple: ['op1'],
  },
  filters: [
    {
      id: 'single',
      type: 'single',
      label: 'Single',
      pinned: true,
      options: [
        { value: 'op1', label: 'Option 1' },
        { value: 'op2', label: 'Option 2' },
        { value: 'op3', label: 'Option 3 ' },
      ],
    },
    {
      id: 'multiple',
      type: 'multiple',
      label: 'Multiple',
      pinned: true,
      options: [
        { value: 'op1', label: 'Option 1' },
        { value: 'op2', label: 'Option 2' },
        { value: 'op3', label: 'Option 3 ' },
      ],
    },
    {
      id: 'date',
      type: 'date',
      label: 'Date',
    },
    {
      id: 'dateRange',
      type: 'date-range',
      label: 'Date Range',
    },
  ],
};

const Template: StoryFn<StoryProps> = ({
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
  showFilters,
  infiniteLoading,
  rowAutoHeight,
  enableColumnsOrderSortByDrag,
  showColumnsSettings,
  columnFilters: columnFiltersProp,
  initialColumnFiltersOpen,
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

  const { loading, scrollRef } = useInfiniteLoading({
    rowsAmount,
    infiniteLoading,
    filteredData,
    setFilteredData,
    dataError: args.dataError,
  });

  const onDelete = useCallback(
    (rowSelectionState: RowSelectionState, resetRowSelection: (defaultState?: boolean) => void) => {
      setFilteredData(data => data.filter((_, index) => !rowSelectionState?.[index]));
      resetRowSelection();
    },
    [],
  );

  const columns = useTableColumnDefinitions({
    rowAutoHeight,
    statusColumnViewMode,
    showActionsColumn,
    statusSortEnabled: args.statusSortEnabled,
  });

  const handleRowClick: RowClickHandler<StubData> = (_, row) => {
    toaster.userAction.success({
      label: `clicked row ${row.id}`,
    });
  };

  const onRefresh = () => {
    setFilteredData(data);
  };

  const modifyPaginationLabel = pinSomeRows && args.keepPinnedRows;
  const paginationOptionsRender = useMemo(() => {
    const getNotPinnedRows = (totalRows: string | number) =>
      Number(totalRows) - (modifyPaginationLabel && !args.copyPinnedRows ? PINNED_TOP_ROWS.length : 0);

    return (value: string | number) =>
      `${getNotPinnedRows(value)}${modifyPaginationLabel ? ` + ${PINNED_TOP_ROWS.length}` : ''}`;
  }, [args.copyPinnedRows, modifyPaginationLabel]);

  const props = useMemo(() => {
    const columnsSettings: TableProps<typeof data>['columnsSettings'] = {};

    if (enableColumnsOrderSortByDrag) {
      columnsSettings.enableDrag = true;
    }
    if (showColumnsSettings) {
      columnsSettings.enableSettingsMenu = true;
    }

    if (infiniteLoading) {
      return {
        ...args,
        columnsSettings,
        infiniteLoading,
        pagination: undefined,
        manualPagination: undefined,
        suppressPagination: undefined,
        pageCount: undefined,
        autoResetPageIndex: undefined,
      };
    }

    return {
      ...args,
      columnsSettings,
      pagination: {
        options: [5, 10, 100],
        optionsRender: paginationOptionsRender,
      },
    };
  }, [args, enableColumnsOrderSortByDrag, infiniteLoading, paginationOptionsRender, showColumnsSettings]);

  const columnFilters = useMemo(() => {
    if (!showFilters || !columnFiltersProp) {
      return undefined;
    }

    return {
      ...columnFiltersProp,
      initialOpen: initialColumnFiltersOpen,
    };
  }, [columnFiltersProp, initialColumnFiltersOpen, showFilters]);

  return (
    <div className={styles.wrapper}>
      <Table
        {...props}
        loading={args.loading || loading}
        rowAutoHeight={rowAutoHeight}
        columnDefinitions={columns}
        data={filteredData}
        bulkActions={[
          {
            label: 'Delete',
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
        columnFilters={columnFilters}
        scrollRef={scrollRef}
      />
    </div>
  );
};
export const table: StoryObj<StoryProps> = {
  render: Template,

  args: {
    suppressPagination: false,
    suppressToolbar: false,
    suppressSearch: false,
    showFilters: true,
    columnFilters,
    initialColumnFiltersOpen: true,
    rowsAmount: 35,
    expandRowsCount: 3,
    expandRowsLevel: 3,
    loading: false,
    statusColumnViewMode: StoryStatusColumnViewMode.Full,
    statusSortEnabled: true,
    showActionsColumn: true,
    showTableTree: false,
    data: [],
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
      filterQueryKey: 'filterKey',
    },
    enableColumnsOrderSortByDrag: true,
    showColumnsSettings: true,
  },

  argTypes: {
    expandRowsCount: {
      name: '[Stories]: Amount of subRows ',
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
    showFilters: {
      name: '[Stories]: Show filters example',
      controls: {
        type: 'boolean',
      },
    },
    columnFilters: {
      if: {
        arg: 'showFilters',
        eq: true,
      },
    },
    initialColumnFiltersOpen: {
      name: '[Stories]: Initial show column filters state value',
      controls: { type: 'boolean' },
      if: {
        arg: 'showFilters',
        eq: true,
      },
    },
    pagination: {
      control: {
        disable: true,
      },
      if: {
        arg: 'infiniteLoading',
        neq: true,
      },
    },
    manualPagination: {
      if: {
        arg: 'infiniteLoading',
        neq: true,
      },
    },
    suppressPagination: {
      if: {
        arg: 'infiniteLoading',
        neq: true,
      },
    },
    pageCount: {
      if: {
        arg: 'infiniteLoading',
        neq: true,
      },
    },
    autoResetPageIndex: {
      if: {
        arg: 'infiniteLoading',
        neq: true,
      },
    },
    savedState: {
      name: '[Stories]: Save resize state in local storage',
      controls: {
        type: 'object',
      },
    },
    enableColumnsOrderSortByDrag: {
      name: '[Stories]: Enable columns order sort by drag',
      controls: { type: 'boolean' },
    },
    showColumnsSettings: {
      name: '[Stories]: Show columns settings',
      controls: { type: 'boolean' },
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
