export function getCurrentlyConfiguredHeaderWidth(id: string) {
  const cell = document.querySelector<HTMLDivElement>(`[data-header-id="${id}"]`);
  const resizeHandler = cell?.querySelector<HTMLDivElement>(
    '[data-test-id="table__header-cell-resize-handle-moving-part"]',
  );

  if (cell && resizeHandler) {
    const { width } = cell.getBoundingClientRect();
    const offset = parseInt(resizeHandler.style.getPropertyValue('--offset'));
    return width + offset;
  }

  return 0;
}

export function getColumnStyleVars(id: string) {
  return {
    sizeKey: `--table-column-${id}-size`,
    flexKey: `--table-column-${id}-flex`,
  };
}
