import { GRID_SIZE, VIEW_MODE } from '../../constants';
import { BaseGrid, BaseGridItem } from '../../types';

export const buildYearGrid = (date: Date): BaseGrid => {
  const result: BaseGrid = [];
  const year = date.getFullYear();
  let month = 0;
  const { rows, columns } = GRID_SIZE[VIEW_MODE.Year];

  for (let i = 0; i < rows; i++) {
    const row: BaseGridItem[] = [];
    for (let j = 0; j < columns; j++) {
      row.push({ date: new Date(year, month++, 1), address: [i, j] });
    }
    result.push(row);
  }

  return result;
};
