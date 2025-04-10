import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ColumnDefinition, CopyCell, HeaderContext, Table } from '@snack-uikit/table';
import { TagRow, TagRowProps } from '@snack-uikit/tag';
import { toaster } from '@snack-uikit/toaster';

import { STORY_TEST_IDS, StoryStatusColumnViewMode } from './constants';
import { generateRows, numberFormatter } from './helpers';
import { StubData } from './types';

const tags: TagRowProps['items'] = [
  { label: 'tag1xxx', appearance: 'red' },
  { label: 'tag2x', appearance: 'yellow' },
  { label: 'tag3xxxxx', appearance: 'orange' },
  { label: 'tag4xx', appearance: 'green' },
  { label: 'tag5xxx', appearance: 'blue' },
  { label: 'tag6x', appearance: 'pink' },
];

const renderHeader = (ctx: HeaderContext<StubData, unknown>) => `Table column №${ctx.column.id}`;
const renderHeaderConfigLabel = (label: string) => `Column №${label}`;
const accessorFn = (key: keyof StubData) => (row: StubData) =>
  `Cell ${Math.trunc(Number(row[key]) / 5) + 1}.${(Number(row[key]) % 5) + 1}`;

export function useTableColumnDefinitions({
  rowAutoHeight,
  statusSortEnabled,
  showActionsColumn,
  statusColumnViewMode,
}: {
  rowAutoHeight?: boolean;
  statusSortEnabled: boolean;
  showActionsColumn?: boolean;
  statusColumnViewMode?: StoryStatusColumnViewMode;
}): ColumnDefinition<StubData>[] {
  return useMemo(() => {
    let columns: ColumnDefinition<StubData>[] = [
      {
        id: '1',
        accessorKey: 'col1',
        accessorFn: accessorFn('col1'),
        header: renderHeader,
        columnSettings: {
          label: renderHeaderConfigLabel('1'),
          mode: 'hidden',
        },
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
        columnSettings: {
          label: renderHeaderConfigLabel('2'),
          mode: 'defaultFalse',
        },
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
        header: renderHeader,
        columnSettings: {
          label: renderHeaderConfigLabel('3'),
          mode: 'defaultTrue',
        },
        accessorFn: rowAutoHeight ? undefined : accessorFn('col3'),
        cell: ctx => {
          if (ctx.row.index === 1 && rowAutoHeight) {
            return 'super-duper puper super-duper puper super-duper puper super-duper puper super-duper puper super-duper puper super-duper puper super-duper puper super-duper puper super-duper puper';
          }

          return accessorFn('col3')(ctx.row.original);
        },
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
        columnSettings: {
          label: renderHeaderConfigLabel('5'),
        },
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
        columnSettings: {
          label: 'Price',
        },
        size: 150,
        headerAlign: 'right',
        align: 'right',
        enableSorting: true,
        enableResizing: true,
      },
      {
        id: '7',
        accessorKey: 'col7',
        cell: () => <TagRow items={tags} rowLimit={1} />,
        header: renderHeader,
        columnSettings: {
          label: 'Tags',
        },
        size: 230,
      },
      {
        id: '8',
        accessorKey: 'date',
        header: renderHeader,
        columnSettings: {
          label: renderHeaderConfigLabel('8'),
        },
        enableSorting: true,
        enableResizing: true,
        size: 146,
        headerAlign: 'right',
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

      columns = [
        Table.getStatusColumnDef<StubData>({
          accessorKey: 'status',
          mapStatusToAppearance: value => Table.statusAppearances[value],
          enableSorting: statusSortEnabled,
          ...statusColDefProps,
        }),
        ...columns,
      ];
    }

    if (showActionsColumn) {
      const handleRowActionClick = ({ rowId, itemId }: { rowId: string; itemId: string }) => {
        toaster.userAction.success({
          label: `${rowId} ${itemId}`,
          'data-test-id': STORY_TEST_IDS.toaster,
        });
      };

      columns.push(
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

    return columns;
  }, [rowAutoHeight, showActionsColumn, statusColumnViewMode, statusSortEnabled]);
}

export function useInfiniteLoading({
  rowsAmount,
  infiniteLoading,
  filteredData,
  setFilteredData,
  dataError,
}: {
  rowsAmount: number;
  infiniteLoading?: boolean;
  filteredData: StubData[];
  setFilteredData: Dispatch<SetStateAction<StubData[]>>;
  dataError?: boolean;
}) {
  const observer = useRef<IntersectionObserver>();
  const timeout = useRef<NodeJS.Timeout>();

  const scrollRef = useRef<HTMLElement>(null);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const rowsAmountForInfiniteLoading = rowsAmount + 20;

  useEffect(() => {
    if (!infiniteLoading) return;

    if (filteredData.length > rowsAmountForInfiniteLoading) {
      setHasMore(false);
      setLoading(false);
      clearTimeout(timeout.current);
      return;
    }
  }, [rowsAmountForInfiniteLoading, filteredData.length, infiniteLoading]);

  const fetchMore = useCallback(async () => {
    if (dataError || !filteredData.length || filteredData.length > rowsAmountForInfiniteLoading) {
      return;
    }

    setLoading(true);
    timeout.current = setTimeout(() => {
      setFilteredData(items => items.concat(generateRows(10)));

      setLoading(false);
    }, 2000);
  }, [dataError, filteredData.length, rowsAmountForInfiniteLoading, setFilteredData]);

  useEffect(() => {
    if (!infiniteLoading) return;

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];

      if (target.isIntersecting && hasMore && !loading) {
        fetchMore();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

    if (scrollRef.current) {
      observer.current.observe(scrollRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchMore, hasMore, infiniteLoading, loading]);

  return {
    loading,
    scrollRef,
  };
}
