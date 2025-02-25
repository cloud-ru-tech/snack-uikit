import { CellContext, Row } from '@tanstack/react-table';
import { MouseEventHandler, ReactNode, useCallback, useEffect, useMemo } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChevronRightSVG, FileSVG, FolderOpenSVG, FolderSVG } from '@snack-uikit/icons';
import { Checkbox, Radio } from '@snack-uikit/toggles';
import { TruncateString } from '@snack-uikit/truncate-string';

import { COLUMN_PIN_POSITION, TEST_IDS } from '../../../constants';
import { useCellResize } from '../../../contexts';
import { ColumnDefinition } from '../../../types';
import { TREE_CELL_ID } from './constants';
import styles from './styles.module.scss';
import { TreeLine } from './TreeLine';

type BaseTreeColumnDef = {
  /** Имя ключа соответствующее полю в data */
  accessorKey: string;
  /** Иконка элемента-родителя в открытом состоянии */
  expandedIcon?: ReactNode;
  /** Иконка элемента-родителя в закрытом состоянии */
  collapsedIcon?: ReactNode;
  /** Иконка дочернего */
  icon?: ReactNode;
  /** Иконка дочернего элемента */
  showToggle?: boolean;
};

type TreeColumnDef = BaseTreeColumnDef & {
  header?: never;
  renderDescription?: never;
};

type TreeColumnDefWithDescription<TData> = BaseTreeColumnDef & {
  /** Заголовок колонки */
  renderDescription?(cellValue: string, row: TData): string;
  /** Рендер функция заголовка колонки */
  header?: ColumnDefinition<TData>['header'];
};

export type TreeColumnDefinitionProps<TData> = TreeColumnDef | TreeColumnDefWithDescription<TData>;

/** Вспомогательная функция для создания ячейки со статусом */
export function getTreeColumnDef<TData>({
  showToggle = false,
  icon = <FileSVG size={24} />,
  expandedIcon = <FolderOpenSVG size={24} />,
  collapsedIcon = <FolderSVG size={24} />,
  header,
  accessorKey,
}: TreeColumnDefinitionProps<TData>): ColumnDefinition<TData> {
  return {
    id: TREE_CELL_ID,
    pinned: COLUMN_PIN_POSITION.Left,
    accessorKey,
    noBodyCellPadding: true,
    noHeaderCellPadding: false,
    enableResizing: true,
    size: 150,
    maxSize: Number.MAX_SAFE_INTEGER,
    meta: {
      skipOnExport: false,
    },
    enableSorting: false,
    header,
    cell: function TreeCell<TData>({ row, cell }: CellContext<TData, unknown>) {
      const isExpanded = row.getIsExpanded();
      const isExpandable = row.getCanExpand();
      const isMultiSelect = row.getCanMultiSelect();
      const parent = row.getParentRow();
      const isRowsSelectionEnabled = row.getCanSelect();
      const isAllSubRowsSelected = row.getIsAllSubRowsSelected();
      const isSomeSubRowSelected = row.getIsSomeSelected();
      const isRowSelected = row.getIsSelected();
      const isLastChildRow = parent?.subRows.at(-1)?.id === row.id;
      const depth = row.depth;
      const { ref } = useCellResize(TREE_CELL_ID, cell);

      const linesVisibilityByIndex = useMemo(() => {
        const parents: (Row<TData> | undefined)[] = [];
        for (let i = depth; i >= 0; i--) {
          parents[i] = i === depth ? row : parents.at(i + 1)?.getParentRow();
        }

        return parents.map((parent, index) => {
          if (!parent || parents.length === index + 1) return true;
          const child = parents[index + 1];

          return child?.id !== parent.subRows.at(-1)?.id || row?.id === child?.id;
        });
      }, [row, depth]);

      const lines = useMemo(
        () =>
          Array.from({ length: depth }, (_, index) => (
            <TreeLine
              key={index}
              visible={linesVisibilityByIndex.at(index)}
              className={index !== 0 ? styles.line : styles.firstLine}
              halfHeight={index === depth - 1 && isLastChildRow}
            />
          )),
        [depth, linesVisibilityByIndex, isLastChildRow],
      );

      useEffect(() => {
        if (!isMultiSelect || !isExpandable || !isRowsSelectionEnabled) {
          return;
        }

        if (isAllSubRowsSelected && !isRowSelected) {
          row.toggleSelected(true, { selectChildren: false });
          return;
        }

        if (isRowSelected && !isAllSubRowsSelected && isSomeSubRowSelected) {
          row.toggleSelected(false, { selectChildren: false });
          return;
        }
      }, [
        isAllSubRowsSelected,
        isSomeSubRowSelected,
        row,
        isRowSelected,
        isMultiSelect,
        isExpandable,
        isRowsSelectionEnabled,
      ]);

      const toggleClickHandler: MouseEventHandler<HTMLElement> = useCallback(
        event => {
          event.stopPropagation();

          if (isMultiSelect) {
            const shouldToggleOn = !isAllSubRowsSelected && !isRowSelected;
            const selectChildren = isAllSubRowsSelected || isSomeSubRowSelected || shouldToggleOn;

            row.toggleSelected(shouldToggleOn, { selectChildren });

            return;
          }

          row.toggleSelected(!isRowSelected, { selectChildren: false });
        },
        [isMultiSelect, row, isAllSubRowsSelected, isSomeSubRowSelected, isRowSelected],
      );

      const chevronClickHandler: MouseEventHandler<HTMLElement> = useCallback(
        event => {
          event.stopPropagation();
          row.toggleExpanded();
        },
        [row],
      );

      const value =
        typeof cell.row.original === 'object' && Object.hasOwn(cell.row.original as object, accessorKey)
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cell.row.original[accessorKey]
          : cell.getValue<string>();

      return (
        <div
          role={'presentation'}
          data-test-id={TEST_IDS.tree.node}
          className={styles.treeCellContainer}
          onClick={toggleClickHandler}
        >
          <div className={styles.treeCell} ref={ref}>
            {lines}
            {Boolean(parent) && <TreeLine horizontal visible />}
            {isExpandable && (
              <ButtonFunction
                size='xs'
                data-test-id={TEST_IDS.tree.chevron}
                icon={<ChevronRightSVG />}
                onClick={chevronClickHandler}
                className={styles.cellExpandButton}
                data-expanded={isExpanded || undefined}
              />
            )}
            <div
              className={styles.treeNodeContent}
              data-disabled={!isRowsSelectionEnabled || undefined}
              data-selected={isRowSelected || undefined}
              data-multiselect={isMultiSelect || undefined}
            >
              {showToggle && (
                <div tabIndex={-1} className={styles.treeCheckboxWrap}>
                  {isMultiSelect ? (
                    <Checkbox
                      size='s'
                      disabled={!isRowsSelectionEnabled}
                      checked={isRowSelected}
                      data-test-id={TEST_IDS.tree.checkbox}
                      indeterminate={isSomeSubRowSelected && !isAllSubRowsSelected}
                    />
                  ) : (
                    <Radio
                      size='s'
                      disabled={!isRowsSelectionEnabled}
                      data-test-id={TEST_IDS.tree.radio}
                      checked={isRowSelected}
                    />
                  )}
                </div>
              )}
              <div role='presentation' onClick={chevronClickHandler} className={styles.cellUserToggleIcon}>
                {isExpandable && isExpanded && expandedIcon}
                {isExpandable && !isExpanded && collapsedIcon}
              </div>
              <div role='presentation' className={styles.userContent}>
                {!isExpandable && icon}
                <TruncateString text={value} />
              </div>
            </div>
          </div>
        </div>
      );
    },
  };
}
