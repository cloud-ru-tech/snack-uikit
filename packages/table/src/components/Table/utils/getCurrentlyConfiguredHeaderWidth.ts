import { isBrowser } from '@snack-uikit/utils';

export function getCurrentlyConfiguredHeaderWidth(id: string): number {
  if (isBrowser()) {
    const cell = document.querySelector<HTMLDivElement>(`[data-header-id="${id}"]`);
    const resizeHandler = cell?.querySelector<HTMLDivElement>(
      '[data-test-id="table__header-cell-resize-handle-moving-part"]',
    );

    if (cell) {
      const { width } = cell.getBoundingClientRect();

      if (resizeHandler) {
        const offset = parseInt(resizeHandler.style.getPropertyValue('--offset'));
        return width + offset;
      }

      return width;
    }
  }

  return 0;
}
