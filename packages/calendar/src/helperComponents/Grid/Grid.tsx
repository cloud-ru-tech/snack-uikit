import { Cell } from '../../types';
import { Item } from '../Item';
import styles from './styles.module.scss';

export type GridProps = {
  grid: Cell[][];
};

export function Grid({ grid }: GridProps) {
  return (
    <table className={styles.grid} border={0}>
      <tbody>
        {grid.map((row, index) => (
          <tr key={index}>
            {row.map((cell, index) => (
              <td key={`${cell.label}_${index}`}>
                <Item data={cell} className={styles.item} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
