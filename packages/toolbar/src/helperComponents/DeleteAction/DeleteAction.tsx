import { KeyboardEvent, useCallback } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { TrashSVG } from '@snack-uikit/icons';
import { Checkbox } from '@snack-uikit/toggles';

import { TEST_IDS } from '../../constants';
import { SelectionMode } from './constants';
import styles from './styles.module.scss';

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
  selectionMode = SelectionMode.Multiple,
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
      {selectionMode === SelectionMode.Multiple && (
        <div
          className={styles.checkboxWrapper}
          onClick={onCheck}
          tabIndex={0}
          role='checkbox'
          aria-checked={checked}
          onKeyDown={handleKeyDown}
          data-test-id={TEST_IDS.checkbox}
        >
          <Checkbox size={Checkbox.sizes.S} checked={checked} indeterminate={indeterminate} tabIndex={-1} />
        </div>
      )}

      {onDelete && (
        <ButtonFunction
          data-test-id={TEST_IDS.deleteButton}
          icon={<TrashSVG />}
          size={ButtonFunction.sizes.M}
          onClick={onDelete}
          disabled={!checked && !indeterminate}
        />
      )}
    </>
  );
}
