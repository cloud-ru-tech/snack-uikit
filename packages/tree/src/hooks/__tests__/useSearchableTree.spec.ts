import { act, renderHook, waitFor } from '@testing-library/react';
import { type DependencyList, useEffect, useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { SearchableTreeDataLoadResult, TreeNodeProps } from '../../types';
import { SearchResult, useSearchableTree } from '../useSearchableTree';

vi.mock('@siberiacancode/reactuse', () => ({
  useDebounceValue: (value: string) => value,
  useDidUpdate: (effect: () => void, deps: DependencyList) => {
    const isFirstRenderRef = useRef(true);

    useEffect(() => {
      if (isFirstRenderRef.current) {
        isFirstRenderRef.current = false;
        return;
      }

      effect();
    }, [deps, effect]);
  },
  useRefState: <TValue>(initialValue: TValue) => useRef<TValue>(initialValue),
}));

type TreeRecord = {
  label: string;
};

const createLeaf = (id: string): TreeNodeProps => ({
  id,
  title: id,
});

const createParent = (id: string, nested: TreeNodeProps[]): TreeNodeProps => ({
  id,
  title: id,
  nested,
});

const mapNodeToRecordItem = (node: TreeNodeProps): TreeRecord => ({
  label: String(node.title),
});

describe('useSearchableTree', () => {
  it('should initialize tree and treeItemsRecord from initTree', () => {
    const initTree = [createLeaf('node-1'), createParent('node-2', [createLeaf('node-2-1')])];

    const { result } = renderHook(() =>
      useSearchableTree<TreeRecord, TreeNodeProps>({
        initTree,
        onPreloadNode: vi.fn(),
        onPreloadNodes: vi.fn(),
        onSearch: vi.fn(),
        mapNodeToRecordItem,
      }),
    );

    expect(result.current.tree.current).toEqual(initTree);
    expect(result.current.treeItemsRecord.current).toEqual({
      'node-1': { label: 'node-1' },
      'node-2': { label: 'node-2' },
      'node-2-1': { label: 'node-2-1' },
    });
  });

  it('should update expandedNodes on onExpand call', () => {
    const { result } = renderHook(() =>
      useSearchableTree<TreeRecord, TreeNodeProps>({
        initTree: [createLeaf('root')],
        onPreloadNode: vi.fn(),
        onPreloadNodes: vi.fn(),
        onSearch: vi.fn(),
        mapNodeToRecordItem,
      }),
    );

    act(() => {
      result.current.onExpand(['root', 'child']);
    });

    expect(result.current.expandedNodes.current).toEqual(['root', 'child']);
  });

  it('should preload node children and update tree and record on onDataLoad', async () => {
    const initTree = [createParent('root', [])];
    const preloadedChildren = [createLeaf('child-1'), createLeaf('child-2')];
    const onPreloadNode = vi.fn().mockResolvedValue(preloadedChildren);

    const { result } = renderHook(() =>
      useSearchableTree<TreeRecord, TreeNodeProps>({
        initTree,
        onPreloadNode,
        onPreloadNodes: vi.fn(),
        onSearch: vi.fn(),
        mapNodeToRecordItem,
      }),
    );

    let loadResult: SearchableTreeDataLoadResult<TreeNodeProps, TreeRecord> | undefined;

    await act(async () => {
      loadResult = await result.current.onDataLoad(createParent('root', []));
    });

    expect(onPreloadNode).toHaveBeenCalledWith(createParent('root', []));
    expect(loadResult).toEqual({
      preloadedChildren,
      updatedTree: [createParent('root', preloadedChildren)],
      newTreeItemsRecord: {
        root: { label: 'root' },
        'child-1': { label: 'child-1' },
        'child-2': { label: 'child-2' },
      },
    });
    expect(result.current.tree.current).toEqual([createParent('root', preloadedChildren)]);
    expect(result.current.treeItemsRecord.current).toEqual({
      root: { label: 'root' },
      'child-1': { label: 'child-1' },
      'child-2': { label: 'child-2' },
    });
  });

  it('should run search and preload required nodes', async () => {
    const searchedTree = [createParent('expandable-root', []), createLeaf('leaf')];
    const onSearch = vi.fn(
      async (): Promise<SearchResult<TreeNodeProps>> => ({
        tree: searchedTree,
        needPreloadNodes: ['expandable-root', 'external-root'],
      }),
    );
    const onPreloadNodes = vi.fn(async (nodeIds: string[]) => ({
      'expandable-root': [createLeaf('expandable-child')],
      'external-root': [createLeaf('external-child')],
      ...Object.fromEntries(
        nodeIds.filter(id => id !== 'expandable-root' && id !== 'external-root').map(id => [id, []]),
      ),
    }));

    const { result } = renderHook(() =>
      useSearchableTree<TreeRecord, TreeNodeProps>({
        initTree: [createParent('init-root', [])],
        onPreloadNode: vi.fn(),
        onPreloadNodes,
        onSearch,
        mapNodeToRecordItem,
      }),
    );

    act(() => {
      result.current.onExpand(['expandable-root']);
      result.current.search.onChange('query');
    });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith(
        { search: 'query', expandedNodes: ['expandable-root'] },
        expect.any(AbortSignal),
      );
      expect(onPreloadNodes).toHaveBeenCalledWith(['expandable-root', 'external-root'], expect.any(AbortSignal));
    });
    expect(result.current.tree.current).toEqual([
      createParent('expandable-root', [createLeaf('expandable-child')]),
      createLeaf('leaf'),
    ]);
    expect(result.current.treeItemsRecord.current).toEqual({
      'expandable-root': { label: 'expandable-root' },
      'expandable-child': { label: 'expandable-child' },
      leaf: { label: 'leaf' },
    });
  });

  it('should update tree and record from search result without preloading', async () => {
    const onSearch = vi.fn(async () => ({
      tree: [createParent('root-node', [createLeaf('child-node')])],
      needPreloadNodes: [],
    }));

    const { result } = renderHook(() =>
      useSearchableTree<TreeRecord, TreeNodeProps>({
        initTree: [createLeaf('initial')],
        onPreloadNode: vi.fn(),
        onPreloadNodes: vi.fn(),
        onSearch,
        mapNodeToRecordItem,
      }),
    );

    act(() => {
      result.current.search.onChange('query');
    });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith({ search: 'query', expandedNodes: [] }, expect.any(AbortSignal));
      expect(result.current.tree.current).toEqual([createParent('root-node', [createLeaf('child-node')])]);
    });

    expect(result.current.expandedNodes.current).toEqual([]);
    expect(result.current.treeItemsRecord.current).toEqual({
      'root-node': { label: 'root-node' },
      'child-node': { label: 'child-node' },
    });
  });
});
