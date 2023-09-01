import { GRID_SIZE, ViewMode } from '../../constants';
import { BaseGrid, BaseGridItem } from '../../types';

export const buildDecadeGrid = (date: Date): BaseGrid => {
  const result: BaseGrid = [];
  const year = date.getFullYear();
  let shift = -1;
  const { rows, columns } = GRID_SIZE[ViewMode.Decade];

  for (let i = 0; i < rows; i++) {
    const row: BaseGridItem[] = [];
    for (let j = 0; j < columns; j++) {
      row.push({ date: new Date(year + shift++, 1, 1), address: [i, j] });
    }
    result.push(row);
  }

  return result;
};
