import { ReactNode, useState } from 'react';

import styles from '../styles.module.scss';

type ChipChoiceStoryWrapProps<T> = {
  chipControlled(props: {
    increaseCounter(): void;
    value?: T;
    onChange(value?: T): void;
    onClearButtonClick?(): void;
  }): ReactNode;
  showClickCounter?: boolean;
  showClearButton?: boolean;
  defaultValue?: T;
};

export function ChipChoiceStoryWrap<T>({
  chipControlled,
  showClickCounter,
  defaultValue,
  showClearButton,
}: ChipChoiceStoryWrapProps<T>) {
  const [clickCounter, setClickCounter] = useState(0);
  const increaseCounter = () => setClickCounter(prev => prev + 1);

  const [value, setValue] = useState(defaultValue);
  const onClearButtonClick = showClearButton && value ? () => setValue(undefined) : undefined;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        {chipControlled({ increaseCounter, value, onChange: setValue, onClearButtonClick })}
      </div>

      {showClickCounter && (
        <div>
          click count:
          <span data-test-id='click__counter'>{clickCounter}</span>
        </div>
      )}
    </div>
  );
}
