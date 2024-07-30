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

const RESIZED_KEY = 'RESIZED_COLUMN_KEY';

type GetSavedStateFromLocalStorageProps = {
  id: string;
  columnId: string;
};

type SavedState = {
  resizeState?: Record<string, string>;
};

export function getInitColumnSizeFromLocalStorage({ id, columnId }: GetSavedStateFromLocalStorageProps) {
  const savedStateFromStorage: SavedState | null = JSON.parse(localStorage.getItem(id || '') || 'null');

  if (savedStateFromStorage) {
    const currentSize = savedStateFromStorage.resizeState?.[`${RESIZED_KEY}-${columnId}`] as string | undefined;
    return currentSize;
  }
}

type SaveStateToLocalStorageProps = {
  id: string;
  columnId: string;
  size: string;
};

export function saveStateToLocalStorage({ id, columnId, size }: SaveStateToLocalStorageProps) {
  const savedStateFromStorage: SavedState | null = JSON.parse(localStorage.getItem(id) || 'null');

  const newResizeState: Record<string, string> = savedStateFromStorage?.resizeState || {};
  newResizeState[`${RESIZED_KEY}-${columnId}`] = size;

  localStorage.setItem(id, JSON.stringify({ ...(savedStateFromStorage || {}), resizeState: newResizeState }));
}
