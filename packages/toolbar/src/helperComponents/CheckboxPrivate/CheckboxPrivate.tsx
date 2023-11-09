import { KeyboardEvent, useCallback } from 'react';

import { ButtonFunction } from '@snack-ui/button';
import { TrashSVG } from '@snack-ui/icons';
import { Checkbox } from '@snack-ui/toggles';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type CheckboxPrivateProps = {
  /** Колбек смены значения чекбокса*/
  onCheck?(): void;
  /** Колбек удаления */
  onDelete?(): void;
  /** Значения чекбокса*/
  checked?: boolean;
  /** Состояние частичного выбора */
  indeterminate?: boolean;
};

export function CheckboxPrivate({ checked, onCheck, onDelete, indeterminate }: CheckboxPrivateProps) {
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
