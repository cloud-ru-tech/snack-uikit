import { MouseEvent, MouseEventHandler, ReactNode } from 'react';

import { ItemSingleProps } from '@snack-uikit/droplist';
import { ValueOf, WithSupportProps } from '@snack-uikit/utils';

import { SELECTION_MODE } from './constants';

export type SelectionMode = ValueOf<typeof SELECTION_MODE>;

export type TreeNodeId = string;

export type BaseTreeNode = WithSupportProps<{
  /** Идентификатор элемента */
  id: TreeNodeId;
  /** Имя элемента */
  title: string;
  /** Является ли элемент деактивированным */
  disabled?: boolean;
  /** Обработчик клика по элементу */
  onClick?: MouseEventHandler;
  className?: string;
}>;

export type ChildTreeNode = BaseTreeNode & {
  /** Иконка дочернего элемента */
  icon?: ReactNode;
  nested?: never;
  expandedIcon?: never;
  collapsedIcon?: never;
};

export type ParentTreeNode = BaseTreeNode & {
  icon?: never;
  /** Иконка элемента-родителя в открытом состоянии */
  expandedIcon?: ReactNode;
  /** Иконка элемента-родителя в закрытом состоянии */
  collapsedIcon?: ReactNode;
  /** Вложенные элементы дерева */
  nested: (ChildTreeNode | ParentTreeNode)[];
};

export type TreeNodeProps = ChildTreeNode | ParentTreeNode;

export type ParentNode = Pick<TreeNodeProps, 'id' | 'nested'> & { parentNode?: ParentNode };

export type OnNodeClick = (node: TreeNodeProps, e: MouseEvent) => void;

export type TreeCommonProps = {
  /** Данные для отрисовки */
  data: TreeNodeProps[];
  /**
   * Режим выбора элементов:
   * <br> - `Single` - одиночный выбор
   * <br> - `Multi` - множественный выбор
   */
  selectionMode?: SelectionMode;
  /** Обработчик клика по элементу дерева */
  onNodeClick?: OnNodeClick;
  /** Состояние для раскрытых элементов */
  expandedNodes?: TreeNodeId[];
  /** Колбэк при раскрытии/закрытии элементов */
  onExpand?(expandedKeys: TreeNodeId[], nodeId: TreeNodeId): void;
  /** Состояние для выбранных элементов */
  selected?: TreeNodeId[] | TreeNodeId;
  /** Колбэк для асинхронной загрузки данных при раскрытии дерева */
  onDataLoad?(node: TreeNodeProps): Promise<boolean | unknown>;
  /** Дополнительные действия для элемента-родителя */
  parentActions?(node: TreeNodeProps): ItemSingleProps[];
  /** Дополнительные действия для элемента-потомка */
  nodeActions?(node: TreeNodeProps): ItemSingleProps[];
  /**
   * Флаг отвечающий за отображение иконок у элементов дерева
   * @default true
   */
  showIcons?: boolean;
  /** Флаг отвечающий за отображение линий вложенности */
  showLines?: boolean;
  className?: string;
};

export type TreeSingleSelect = Omit<TreeCommonProps, 'selected'> & {
  selectionMode: 'single';
  /** Состояние для выбраного элемента */
  /** <br> - При <strong>selectionMode</strong>=`Single` - принимает строку */
  selected?: TreeNodeId;
  /** <br> - При <strong>selectionMode</strong>=`Single` - возвращает строку */
  onSelect?(selectedKey: TreeNodeId, node: TreeNodeProps): void;
};

export type TreeMultiSelect = Omit<TreeCommonProps, 'selected'> & {
  selectionMode: 'multi';
  /**
   * Состояние для выбраных элементов:
   * <br> - При <strong>selectionMode</strong>=`Multi` - принимает массив строк
   */
  selected?: TreeNodeId[];
  /**
   * Колбэк при изменении выбраных элементов:
   * <br> - При <strong>selectionMode</strong>=`Multi` - возвращает массив строк
   */
  onSelect?(selectedKeys: TreeNodeId[], node: TreeNodeProps): void;
};

export type TreeBaseProps = TreeMultiSelect | TreeSingleSelect;
