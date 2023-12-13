import cn from 'classnames';
import { Fragment, ReactNode, useState } from 'react';

import { SIZE, VARIANT } from '../../src/constants';
import { Size } from '../../src/types';
import styles from '../styles.module.scss';

const STATE_TABLE_HEADERS = ['Default', 'Loading', 'Disabled', 'Selected'];

const VARIANTS_TABLE_HEADERS = Array(STATE_TABLE_HEADERS.length)
  .fill(Object.values(VARIANT))
  .flatMap(v => v);

type ChipChoiceStoryWrapProps = {
  chipControlled(props: { increaseCounter(): void }): ReactNode;
  children(props: { size: Size }): ReactNode;
  showClickCounter?: boolean;
};

export function ChipChoiceStoryWrap({ chipControlled, showClickCounter, children }: ChipChoiceStoryWrapProps) {
  const [clickCounter, setClickCounter] = useState(0);
  const increaseCounter = () => setClickCounter(prev => prev + 1);

  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        {chipControlled({ increaseCounter })}
      </div>

      {showClickCounter && (
        <div>
          click count:
          <span data-test-id='click__counter'>{clickCounter}</span>
        </div>
      )}

      <div className={styles.table}>
        <div className={headerCellClassnames} style={{ gridRow: '1 / 3' }} />
        {STATE_TABLE_HEADERS.map((head, index) => (
          <div
            key={head}
            className={headerCellClassnames}
            style={{ gridColumnStart: index * 2 + 2, gridColumnEnd: index * 2 + 4 }}
          >
            {head}
          </div>
        ))}

        {VARIANTS_TABLE_HEADERS.map((variant, i) => (
          <div key={variant + i} className={headerCellClassnames}>
            {variant}
          </div>
        ))}

        {Object.values(SIZE).map(size => (
          <Fragment key={size}>
            <div className={headerCellClassnames}>{size}</div>

            {children({ size })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
