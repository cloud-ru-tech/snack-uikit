import { KeyboardEvent, useCallback } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { TrashSVG } from '@snack-uikit/icons';
import { Checkbox } from '@snack-uikit/toggles';

import { TEST_IDS } from '../../constants';
import { SELECTION_MODE } from './constants';
import styles from './styles.module.scss';
import { SelectionMode } from './types';

export type DeleteActionProps = {
  /** Колбек смены значения чекбокса*/
  onCheck?(): void;
  /** Колбек удаления */
  onDelete?(): void;
  /** Значения чекбокса*/
  checked?: boolean;
  /** Состояние частичного выбора */
  indeterminate?: boolean;
  /** Режим выбора @default SelectionMode.Multiple*/
  selectionMode?: SelectionMode;
};

export function DeleteAction({
  checked,
  onCheck,
  onDelete,
  indeterminate,
  selectionMode = SELECTION_MODE.Multiple,
}: DeleteActionProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        onCheck?.();
      }
    },
    [onCheck],
  );

  return (
    <>
      {selectionMode === SELECTION_MODE.Multiple && (
        <div
          className={styles.checkboxWrapper}
          onClick={onCheck}
          tabIndex={0}
          role='checkbox'
          aria-checked={checked}
          onKeyDown={handleKeyDown}
          data-test-id={TEST_IDS.checkbox}
        >
          <Checkbox size='s' checked={checked} indeterminate={indeterminate} tabIndex={-1} />
        </div>
      )}

      {onDelete && (
        <ButtonFunction
          data-test-id={TEST_IDS.deleteButton}
          icon={<TrashSVG />}
          size='m'
          onClick={onDelete}
          disabled={!checked && !indeterminate}
        />
      )}
    </>
  );
}
