import { useCallback } from 'react';

import { useValueControl } from '@snack-uikit/utils';

import { PreloadNodeHandler, SelectHandler, TreeNodeProps } from '../types';

/**
 * Параметры {@link useTreeMultiSelection}.
 *
 * @typeParam TTreeNode — тип узла дерева.
 */
type UseTreeMultiSelectionParams<TTreeNode extends TreeNodeProps> = {
  /**
   * Подгрузка дочерних узлов, если у узла есть `nested`, но массив пуст (ленивая загрузка перед выбором).
   */
  onDataLoad: PreloadNodeHandler<TTreeNode>;
  /** Логика мультивыбора: по клику возвращает, какие id добавить и снять. */
  onSelect: SelectHandler;
  /** Controlled: текущие выбранные id; без пропа — внутреннее состояние хука. */
  selected?: string[];
  /** Вызывается при изменении набора выбранных id (controlled-сценарий). */
  onChangeSelected?: (newSelected: string[]) => void;
};

const getNewSelectedIds = (selectedIds: string[], added: string[], removed: string[]): string[] => {
  const result = new Set(selectedIds);

  added.forEach(id => {
    result.add(id);
  });

  removed.forEach(id => {
    result.delete(id);
  });

  return Array.from(result);
};

/**
 * Хук мультивыбора для дерева.
 *
 * Выполняет пересчет выбранных id после клика по узлу, поддерживает
 * controlled/uncontrolled режим (`selected` + `onChangeSelected`) и при необходимости
 * подгружает детей узла перед вычислением итогового выбора.
 *
 * @param params Параметры управления выбором и подгрузкой данных.
 * @returns Текущий список выбранных id и обработчик выбора узла.
 */
export function useTreeMultiSelection<TTreeNode extends TreeNodeProps>({
  onDataLoad,
  onSelect: onSelectProp,
  selected,
  onChangeSelected,
}: UseTreeMultiSelectionParams<TTreeNode>) {
  const [selectedIds = [], setSelectedIds] = useValueControl<string[]>({
    value: selected,
    defaultValue: [],
    onChange: onChangeSelected,
  });

  const onSelect = useCallback(
    async (selectedKeys: string[], node: TreeNodeProps) => {
      const isSelected = selectedKeys.includes(node.id);
      const clonedNode = { ...node };

      if (node.nested && !node.nested.length) {
        const { preloadedChildren } = await onDataLoad(node as TTreeNode);
        clonedNode.nested = preloadedChildren;
      }

      const { added, removed } = onSelectProp({ selectedKeys, node: clonedNode, isSelected });
      const updatedSelectedIds = getNewSelectedIds(selectedIds, added, removed);
      setSelectedIds(updatedSelectedIds);
    },
    [onDataLoad, onSelectProp, selectedIds, setSelectedIds],
  );

  return {
    selected: selectedIds,
    onSelect,
  };
}
