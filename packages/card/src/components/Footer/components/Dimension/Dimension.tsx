import { Typography } from '@snack-uikit/typography';

import { Size } from '../../../../constants';
import { useCardContext } from '../../../../context';
import { TYPOGRAPHY_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

export type DimensionProps = {
  /** Единица измерения */
  dimension?: string;
  /** Текущее значение */
  currentValue: string;
  /** Старое значение */
  oldValue?: string;
  /** Размер */
  size?: Size;
};

export function Dimension({ dimension, currentValue, oldValue, size: sizeProp }: DimensionProps) {
  const { size: sizeContext } = useCardContext();

  const size = TYPOGRAPHY_SIZE_MAP[sizeProp || sizeContext];

  return (
    <div className={styles.wrapper}>
      {dimension && (
        <Typography
          role={Typography.roles.Title}
          family={Typography.families.Sans}
          size={size}
          className={styles.dimension}
        >
          {dimension}
        </Typography>
      )}
      <div className={styles.valueContainer}>
        <Typography
          role={Typography.roles.Title}
          family={Typography.families.Sans}
          size={size}
          className={styles.currentValue}
        >
          {currentValue}
        </Typography>

        {oldValue && <Typography.CrossedOutBodyS className={styles.oldValue}>{oldValue}</Typography.CrossedOutBodyS>}
      </div>
    </div>
  );
}
