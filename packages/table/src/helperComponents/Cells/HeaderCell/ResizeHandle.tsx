import { Header } from '@tanstack/react-table';
import cn from 'classnames';
import { RefObject } from 'react';

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

  const offset = isResizing ? getResizeIndicatorOffset({ header, cellRef }) : 0;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={cn(styles.tableHeaderIcon, styles.tableHeaderResizeHandle)}
        data-resizing={isResizing || undefined}
        onMouseDown={resizeHandler}
        onTouchStart={resizeHandler}
      />

      {isResizing && (
        <div
          className={styles.tableHeaderResizeIndicator}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        />
      )}
    </>
  );
}
