export type CellSize = number;

export type ColumnId = string;

export type CellId = string;

export type CellMap = Record<CellId, CellSize>;

export type CollMap = Record<ColumnId, CellMap>;

export type UpdateCellMapOptions = {
  columnId: ColumnId;
  size: CellSize;
  cellId: CellId;
};

export type CellAutoResizeValue = {
  updateCellMap: (opts: UpdateCellMapOptions) => void;
};
