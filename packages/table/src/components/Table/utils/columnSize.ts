const RESIZED_KEY = 'RESIZED_COLUMN_KEY';

type SavedState = {
  resizeState?: Record<string, string>;
};

type GetSavedStateFromLocalStorageProps = {
  id: string;
  columnId: string;
};

export function getInitColumnSizeFromLocalStorage({
  id,
  columnId,
}: GetSavedStateFromLocalStorageProps): string | undefined {
  const savedStateFromStorage: SavedState | null = JSON.parse(localStorage.getItem(id || '') || 'null');

  if (!savedStateFromStorage) {
    return;
  }

  return savedStateFromStorage.resizeState?.[`${RESIZED_KEY}-${columnId}`];
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
