import { useDebounceValue, useDidUpdate, useRefState } from '@siberiacancode/reactuse';
import { cancelable, CancelablePromise } from 'cancelable-promise';
import { useCallback, useEffect, useRef, useState } from 'react';

import { collectEmptyNestedNodesInExpanded, traverse, updateTreeNode } from '../helpers';
import type { SearchableTreeDataLoadResult, TreeNodeProps } from '../types';

export type SearchResult<TTreeNode extends TreeNodeProps> = {
  tree: TTreeNode[];
  needPreloadNodes: string[];
};

export type SearchParams = {
  search: string;
  expandedNodes: string[];
};

/**
 * Параметры {@link useSearchableTree}.
 *
 * @typeParam TRecordValue — тип записи в `treeItemsRecord` (по одному элементу на узел).
 * @typeParam TTreeNode — тип узла дерева.
 */
type UseSearchableTreeParams<TRecordValue, TTreeNode extends TreeNodeProps> = {
  /** Начальное дерево узлов. */
  initTree: TTreeNode[];
  /** Подгрузка дочерних узлов для одного узла. */
  onPreloadNode: (node: TreeNodeProps) => Promise<TTreeNode[]>;
  /** Пакетная подгрузка детей по id родителей. */
  onPreloadNodes: (nodes: string[], signal?: AbortSignal) => Promise<Record<string, TTreeNode[]>>;
  /** Поиск по дереву. */
  onSearch: (params: SearchParams, signal?: AbortSignal) => Promise<SearchResult<TTreeNode>>;
  /** Сопоставление узла с элементом записи `treeItemsRecord` (по `node.id`). */
  mapNodeToRecordItem: (node: TTreeNode) => TRecordValue;
};

/**
 * Хук для работы с деревом, поддерживающим поиск и асинхронную подгрузку узлов.
 *
 * Возможности:
 * - хранение актуального дерева и записи элементов (`treeItemsRecord`);
 * - управление раскрытыми узлами;
 * - дебаунс-поиск с отменой предыдущего запроса;
 * - дозагрузка дочерних узлов после поиска или раскрытия.
 *
 * @param params Параметры и обработчики для работы с деревом.
 * @returns Ссылки на состояние дерева, контролы поиска и колбэки для `expand`/`dataLoad`.
 */
export function useSearchableTree<TRecordValue, TTreeNode extends TreeNodeProps>({
  initTree,
  onPreloadNode,
  onPreloadNodes,
  onSearch,
  mapNodeToRecordItem,
}: UseSearchableTreeParams<TRecordValue, TTreeNode>) {
  const tree = useRefState<TTreeNode[]>(initTree);
  const treeItemsRecord = useRefState<Record<string, TRecordValue>>({});

  const expandedNodes = useRefState<string[]>([]);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounceValue(search, 500);

  const [loading, setLoading] = useState(false);
  const searchPromiseRef = useRef<CancelablePromise<SearchResult<TTreeNode>> | null>(null);
  const searchAbortControllerRef = useRef<AbortController | null>(null);

  const buildTreeItemsRecord = useCallback(
    (nodes: TTreeNode[]): Record<string, TRecordValue> => {
      const record: Record<string, TRecordValue> = {};

      traverse<TTreeNode>(nodes, node => {
        record[node.id] = mapNodeToRecordItem(node);
      });

      return record;
    },
    [mapNodeToRecordItem],
  );

  const onExpand = useCallback(
    (nodes: string[]) => {
      expandedNodes.current = nodes;
    },
    [expandedNodes],
  );

  const onDataLoad = useCallback(
    async (node: TreeNodeProps): Promise<SearchableTreeDataLoadResult<TTreeNode, TRecordValue>> => {
      const preloadedChildren = await onPreloadNode(node);
      const updatedTree = updateTreeNode(tree.current, node.id, { nested: preloadedChildren });
      tree.current = updatedTree;

      const newTreeItemsRecord: Record<string, TRecordValue> = { ...treeItemsRecord.current };
      traverse<TTreeNode>(preloadedChildren, child => {
        newTreeItemsRecord[child.id] = mapNodeToRecordItem(child);
      });
      treeItemsRecord.current = newTreeItemsRecord;

      return { preloadedChildren, updatedTree, newTreeItemsRecord };
    },
    [mapNodeToRecordItem, onPreloadNode, tree, treeItemsRecord],
  );

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      searchPromiseRef.current?.cancel();
      searchAbortControllerRef.current?.abort();

      setLoading(true);
      const abortController = new AbortController();
      searchAbortControllerRef.current = abortController;

      const searchPromise = cancelable(
        onSearch({ search: searchQuery, expandedNodes: expandedNodes.current }, abortController.signal),
      );
      searchPromiseRef.current = searchPromise;

      try {
        const { tree: searchedTree, needPreloadNodes } = await searchPromise;
        if (!searchPromise.isCanceled()) {
          tree.current = searchedTree;
          treeItemsRecord.current = buildTreeItemsRecord(searchedTree);

          const expandedSet = new Set(expandedNodes.current);
          const toPreloadExpandableNodes = collectEmptyNestedNodesInExpanded(searchedTree, expandedSet);
          const collectedNodesForPreload = Array.from(
            new Set([...toPreloadExpandableNodes.map(node => node.id), ...needPreloadNodes]),
          );

          if (!collectedNodesForPreload.length) {
            return;
          }

          const preloadedNodes = await onPreloadNodes(collectedNodesForPreload, abortController.signal);

          if (searchPromiseRef.current !== searchPromise) {
            return;
          }

          let tmpTree = [...searchedTree];
          for (const [nodeId, children] of Object.entries(preloadedNodes)) {
            tmpTree = updateTreeNode(tmpTree, nodeId, { nested: children });
          }

          tree.current = tmpTree;
          treeItemsRecord.current = buildTreeItemsRecord(tmpTree);
        }
      } finally {
        if (searchPromiseRef.current === searchPromise) {
          setLoading(false);
          searchPromiseRef.current = null;
          searchAbortControllerRef.current = null;
        }
      }
    },
    [buildTreeItemsRecord, expandedNodes, onPreloadNodes, onSearch, tree, treeItemsRecord],
  );

  useDidUpdate(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  useEffect(() => {
    tree.current = initTree;
    treeItemsRecord.current = buildTreeItemsRecord(initTree);
  }, [buildTreeItemsRecord, initTree, tree, treeItemsRecord]);

  useEffect(
    () => () => {
      searchPromiseRef.current?.cancel();
      searchAbortControllerRef.current?.abort();
    },
    [],
  );

  return {
    tree,
    expandedNodes,
    loading,
    treeItemsRecord,
    search: {
      value: search,
      onChange: setSearch,
    },
    onExpand,
    onDataLoad,
  };
}
