import { Header } from '@tanstack/react-table';
import cn from 'classnames';
import { MouseEventHandler, RefObject } from 'react';

import styles from './styles.module.scss';

type ResizeHandleProps<TData> = {
  header: Header<TData, unknown>;
  cellRef: RefObject<HTMLDivElement>;
};

function getResizeIndicatorOffset<TData>({ header, cellRef }: ResizeHandleProps<TData>) {
  const columnSizingInfo = header.getContext().table.getState().columnSizingInfo;

  const { minSize, maxSize } = header.column.columnDef;
  const { startSize, deltaOffset } = columnSizingInfo;

  let offset = 0;

  if (startSize !== null && deltaOffset !== null) {
    const divElementSize = cellRef.current?.offsetWidth || 0;
    const initSize = Math.max(startSize, divElementSize);

    const limit = deltaOffset < 0 ? minSize : maxSize;
    let deltaLimit = 0;

    if (limit !== undefined && deltaOffset !== 0) {
      deltaLimit = deltaOffset < 0 ? -(initSize - limit) : limit - initSize;

      offset = deltaOffset < 0 ? Math.max(deltaOffset, deltaLimit) : Math.min(Math.abs(deltaOffset), deltaLimit);
    }
  }

  return offset;
}

export function ResizeHandle<TData>({ header, cellRef }: ResizeHandleProps<TData>) {
  const isResizing = header.column.getIsResizing();
  const resizeHandler = header.getResizeHandler();
  const handleMouseDown: MouseEventHandler = event => {
    if (event.detail === 2) {
      header.column.resetSize();
      return;
    }

    resizeHandler(event);
  };

  const offset = isResizing ? getResizeIndicatorOffset({ header, cellRef }) : 0;

  return (
    <>
      <div
        role='button'
        tabIndex={0}
        className={cn(styles.tableHeaderIcon, styles.tableHeaderResizeHandle)}
        data-resizing={isResizing || undefined}
        onMouseDown={handleMouseDown}
        onTouchStart={resizeHandler}
      />

      {isResizing && (
        <div
          data-test-id='table__header-cell-resize-handle-moving-part'
          className={styles.tableHeaderResizeIndicator}
          style={{
            '--offset': `${offset}px`,
          }}
        />
      )}
    </>
  );
}
