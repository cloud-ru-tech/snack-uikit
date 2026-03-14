import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { ParentTreeNode, TreeNodeProps } from '../../types';
import { useTreeMultiSelection } from '../useTreeMultiSelection';

const createLeaf = (id: string): TreeNodeProps => ({
  id,
  title: id,
});

const createParent = (id: string, nested: TreeNodeProps[]): ParentTreeNode => ({
  id,
  title: id,
  nested,
});

describe('useTreeMultiSelection', () => {
  it('should keep selected state uncontrolled by default', async () => {
    const { result } = renderHook(() =>
      useTreeMultiSelection<TreeNodeProps>({
        onDataLoad: vi.fn(async () => ({ preloadedChildren: [], updatedTree: [] })),
        onSelect: () => ({ added: ['a'], removed: [] }),
      }),
    );

    expect(result.current.selected).toEqual([]);

    await act(async () => {
      await result.current.onSelect(['a'], createLeaf('a'));
    });

    expect(result.current.selected).toEqual(['a']);
  });

  it('should call onChangeSelected when selection updates', async () => {
    const onChangeSelected = vi.fn();

    const { result } = renderHook(() =>
      useTreeMultiSelection<TreeNodeProps>({
        onDataLoad: vi.fn(async () => ({ preloadedChildren: [], updatedTree: [] })),
        onSelect: () => ({ added: ['a'], removed: [] }),
        onChangeSelected,
      }),
    );

    await act(async () => {
      await result.current.onSelect(['a'], createLeaf('a'));
    });

    expect(onChangeSelected).toHaveBeenCalledWith(['a']);
  });

  it('should treat selected prop as controlled', async () => {
    const onChangeSelected = vi.fn();

    const { result, rerender } = renderHook(
      ({ selected }: { selected: string[] }) =>
        useTreeMultiSelection<TreeNodeProps>({
          onDataLoad: vi.fn(async () => ({ preloadedChildren: [], updatedTree: [] })),
          onSelect: () => ({ added: ['b'], removed: [] }),
          selected,
          onChangeSelected,
        }),
      { initialProps: { selected: ['a'] } },
    );

    expect(result.current.selected).toEqual(['a']);

    await act(async () => {
      await result.current.onSelect(['a', 'b'], createLeaf('b'));
    });

    // controlled value does not change until parent updates it
    expect(result.current.selected).toEqual(['a']);
    expect(onChangeSelected).toHaveBeenCalledWith(['a', 'b']);

    rerender({ selected: ['a', 'b'] });
    expect(result.current.selected).toEqual(['a', 'b']);
  });

  it('should preload children when selecting empty parent node and pass cloned node to onSelect', async () => {
    const node = createParent('parent', []);
    const preloadedChildren = [createLeaf('child-1'), createLeaf('child-2')];

    const onDataLoad = vi.fn(async () => ({
      preloadedChildren,
      updatedTree: [createParent('parent', preloadedChildren)],
    }));
    const onSelect = vi.fn(() => ({ added: ['parent', 'child-1', 'child-2'], removed: [] }));

    const { result } = renderHook(() =>
      useTreeMultiSelection<TreeNodeProps>({
        onDataLoad,
        onSelect,
      }),
    );

    await act(async () => {
      await result.current.onSelect(['parent'], node);
    });

    expect(onDataLoad).toHaveBeenCalledWith(node);
    expect(onSelect).toHaveBeenCalledWith({
      selectedKeys: ['parent'],
      node: createParent('parent', preloadedChildren),
      isSelected: true,
    });
    expect([...result.current.selected].sort()).toEqual(['child-1', 'child-2', 'parent']);
  });

  it('should not preload when parent node already has children', async () => {
    const node = createParent('parent', [createLeaf('child')]);
    const onDataLoad = vi.fn(async () => ({
      preloadedChildren: [],
      updatedTree: [],
    }));
    const onSelect = vi.fn(() => ({ added: ['parent'], removed: [] }));

    const { result } = renderHook(() =>
      useTreeMultiSelection<TreeNodeProps>({
        onDataLoad,
        onSelect,
      }),
    );

    await act(async () => {
      await result.current.onSelect(['parent'], node);
    });

    expect(onDataLoad).not.toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith({
      selectedKeys: ['parent'],
      node,
      isSelected: true,
    });
    expect(result.current.selected).toEqual(['parent']);
  });

  it('should deduplicate ids when merging added into selection', async () => {
    const { result } = renderHook(() =>
      useTreeMultiSelection<TreeNodeProps>({
        onDataLoad: vi.fn(async () => ({ preloadedChildren: [], updatedTree: [] })),
        onSelect: () => ({ added: ['a', 'a', 'b'], removed: [] }),
      }),
    );

    await act(async () => {
      await result.current.onSelect(['a'], createLeaf('a'));
    });

    expect([...result.current.selected].sort()).toEqual(['a', 'b']);
  });

  it('should apply removed ids from selection', async () => {
    const onChangeSelected = vi.fn();

    const { result, rerender } = renderHook(
      ({ selected }: { selected: string[] }) =>
        useTreeMultiSelection<TreeNodeProps>({
          onDataLoad: vi.fn(async () => ({ preloadedChildren: [], updatedTree: [] })),
          onSelect: () => ({ added: [], removed: ['a'] }),
          selected,
          onChangeSelected,
        }),
      { initialProps: { selected: ['a', 'b'] } },
    );

    await act(async () => {
      await result.current.onSelect(['b'], createLeaf('a'));
    });

    expect(onChangeSelected).toHaveBeenCalledWith(['b']);
    expect(result.current.selected).toEqual(['a', 'b']);

    rerender({ selected: ['b'] });
    expect(result.current.selected).toEqual(['b']);
  });
});
