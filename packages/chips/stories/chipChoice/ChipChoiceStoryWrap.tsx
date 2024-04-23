import { ReactNode, useState } from 'react';

import styles from '../styles.module.scss';

type ChipChoiceStoryWrapProps = {
  chipControlled(props: { increaseCounter(): void }): ReactNode;
  showClickCounter?: boolean;
};

export function ChipChoiceStoryWrap({ chipControlled, showClickCounter }: ChipChoiceStoryWrapProps) {
  const [clickCounter, setClickCounter] = useState(0);
  const increaseCounter = () => setClickCounter(prev => prev + 1);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>{chipControlled({ increaseCounter })}</div>

      {showClickCounter && (
        <div>
          click count:
          <span data-test-id='click__counter'>{clickCounter}</span>
        </div>
      )}
    </div>
  );
}
