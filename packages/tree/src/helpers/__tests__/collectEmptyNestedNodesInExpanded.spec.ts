import { describe, expect, it } from 'vitest';

import type { TreeNodeProps } from '../../types';
import { collectEmptyNestedNodesInExpanded } from '../collectEmptyNestedNodesInExpanded';

const node = (id: string, nested?: TreeNodeProps[]) => ({
  id,
  title: id,
  ...(nested !== undefined && { nested }),
});

describe('collectEmptyNestedNodesInExpanded', () => {
  it('returns nodes with empty nested array that are in expandedIds', () => {
    const tree = [node('a', []), node('b', [node('b1')])];
    const expandedIds = new Set(['a']);
    const result = collectEmptyNestedNodesInExpanded(tree, expandedIds);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'a', nested: [] });
  });

  it('does not return nodes with empty nested if not in expandedIds', () => {
    const tree = [node('a', []), node('b', [])];
    const expandedIds = new Set(['b']);
    const result = collectEmptyNestedNodesInExpanded(tree, expandedIds);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('b');
  });

  it('does not return nodes that have non-empty nested', () => {
    const tree = [node('a', [node('a1')]), node('b', [])];
    const expandedIds = new Set(['a', 'b']);
    const result = collectEmptyNestedNodesInExpanded(tree, expandedIds);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('b');
  });

  it('does not return nodes without nested property (leaf)', () => {
    const tree = [node('leaf'), node('empty', [])];
    const expandedIds = new Set(['leaf', 'empty']);
    const result = collectEmptyNestedNodesInExpanded(tree, expandedIds);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('empty');
  });

  it('returns empty array for empty tree', () => {
    const result = collectEmptyNestedNodesInExpanded([], new Set(['any']));
    expect(result).toEqual([]);
  });

  it('returns empty array when expandedIds is empty', () => {
    const tree = [node('a', []), node('b', [])];
    const result = collectEmptyNestedNodesInExpanded(tree, new Set());

    expect(result).toEqual([]);
  });

  it('collects from deeply nested nodes', () => {
    const child = node('child', []);
    const tree = [node('root', [node('mid', [child])])];
    const expandedIds = new Set(['root', 'mid', 'child']);
    const result = collectEmptyNestedNodesInExpanded(tree, expandedIds);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 'child', nested: [] });
  });

  it('returns all matching nodes from different levels', () => {
    const tree = [node('a', []), node('b', [node('b1', []), node('b2', [])])];
    const expandedIds = new Set(['a', 'b', 'b1', 'b2']);
    const result = collectEmptyNestedNodesInExpanded(tree, expandedIds);

    expect(result).toHaveLength(3);
    expect(result.map(n => n.id).sort()).toEqual(['a', 'b1', 'b2']);
  });

  it('only includes node if both empty nested and expanded', () => {
    const tree = [node('expanded', []), node('collapsed', [])];
    const expandedIds = new Set(['expanded']);
    const result = collectEmptyNestedNodesInExpanded(tree, expandedIds);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('expanded');
  });
});
