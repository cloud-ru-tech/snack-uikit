import { describe, expect, it } from 'vitest';

import type { TreeNodeProps } from '../../types';
import { updateTreeNode } from '../updateTreeNode';

type TestTreeNode = TreeNodeProps & {
  disabled?: boolean;
  className?: string;
};

const node = (id: string, nested?: TreeNodeProps[]): TestTreeNode => ({
  id,
  title: id,
  ...(nested !== undefined && { nested }),
});

describe('updateTreeNode', () => {
  it('replaces nested for root-level node', () => {
    const tree = [node('a', [{ id: 'a1', title: 'a1' }]), node('b', [{ id: 'b1', title: 'b1' }])];
    const children = [node('new1'), node('new2')];
    const result = updateTreeNode<TestTreeNode>(tree, 'b', { nested: children });

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ id: 'a', title: 'a', nested: [{ id: 'a1', title: 'a1' }] });
    expect(result[1]).toMatchObject({
      id: 'b',
      title: 'b',
      nested: [
        { id: 'new1', title: 'new1' },
        { id: 'new2', title: 'new2' },
      ],
    });
  });

  it('replaces nested for deeply nested node', () => {
    const childWithNested: TreeNodeProps = {
      id: 'child',
      title: 'child',
      nested: [{ id: 'grand', title: 'grand' }],
    };
    const tree = [node('root', [childWithNested])];
    const children = [node('replacement')];
    const result = updateTreeNode<TestTreeNode>(tree, 'child', { nested: children });

    const root = result[0] as TreeNodeProps & { nested: (TreeNodeProps & { nested: TreeNodeProps[] })[] };
    expect(root).toMatchObject({ id: 'root', title: 'root' });
    expect(root.nested).toHaveLength(1);
    expect(root.nested[0]).toMatchObject({
      id: 'child',
      title: 'child',
      nested: [{ id: 'replacement', title: 'replacement' }],
    });
  });

  it('returns cloned tree when node is not found', () => {
    const tree = [node('a'), node('b')];
    const result = updateTreeNode<TestTreeNode>(tree, 'missing', { nested: [node('x')] });

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ id: 'a', title: 'a' });
    expect(result[1]).toMatchObject({ id: 'b', title: 'b' });
    expect(result).not.toBe(tree);
  });

  it('returns empty array for empty tree', () => {
    const result = updateTreeNode<TreeNodeProps>([], 'any', { nested: [node('x')] });
    expect(result).toEqual([]);
  });

  it('sets children for target node that had no nested (leaf)', () => {
    const tree = [node('leaf'), node('other')];
    const children = [node('new1')];
    const result = updateTreeNode<TestTreeNode>(tree, 'leaf', { nested: children });

    expect(result[0]).toMatchObject({ id: 'leaf', title: 'leaf', nested: [{ id: 'new1', title: 'new1' }] });
    expect(result[1]).toMatchObject({ id: 'other', title: 'other' });
  });

  it('preserves order of root nodes when target is second', () => {
    const tree = [node('first'), node('second', [{ id: 's1', title: 's1' }]), node('third')];
    const children = [node('new1'), node('new2')];
    const result = updateTreeNode<TestTreeNode>(tree, 'second', { nested: children });

    expect(result.map(n => n.id)).toEqual(['first', 'second', 'third']);
    expect(result.map(n => n.title)).toEqual(['first', 'second', 'third']);
    expect((result[1] as TreeNodeProps & { nested: TreeNodeProps[] }).nested).toHaveLength(2);
    expect((result[1] as { nested: { id: string }[] }).nested.map(n => n.id)).toEqual(['new1', 'new2']);
    expect((result[1] as { nested: { title: string }[] }).nested.map(n => n.title)).toEqual(['new1', 'new2']);
  });

  it('updates title without changing nested', () => {
    const tree = [node('a', [{ id: 'c1', title: 'c1' }])];
    const result = updateTreeNode<TestTreeNode>(tree, 'a', { title: 'Renamed root' });

    expect(result[0]).toMatchObject({
      id: 'a',
      title: 'Renamed root',
      nested: [{ id: 'c1', title: 'c1' }],
    });
  });

  it('updates disabled and className without nested in data', () => {
    const tree: TestTreeNode[] = [
      { ...node('x'), disabled: false },
      { ...node('y', [{ id: 'y1', title: 'y1' }]), className: 'old' },
    ];
    const result = updateTreeNode<TestTreeNode>(tree, 'x', { disabled: true, className: 'leaf-updated' });

    expect(result[0]).toMatchObject({ id: 'x', disabled: true, className: 'leaf-updated' });
    expect(result[1]).toMatchObject({ id: 'y', title: 'y', className: 'old', nested: [{ id: 'y1', title: 'y1' }] });
  });

  it('applies title and nested together on target node', () => {
    const tree = [node('root', [{ id: 'c1', title: 'c1' }])];
    const newChildren = [node('n1'), node('n2')];
    const result = updateTreeNode<TestTreeNode>(tree, 'root', {
      title: 'New title',
      nested: newChildren,
    });

    expect(result[0]).toMatchObject({
      id: 'root',
      title: 'New title',
      nested: [
        { id: 'n1', title: 'n1' },
        { id: 'n2', title: 'n2' },
      ],
    });
  });
});
