import { MouseEvent } from 'react';

import { Checkbox, Radio } from '@snack-uikit/toggles';

import { COLUMN_PIN_POSITION, TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import styles from './styles.module.scss';

type SelectionCellProps = {
  checked: boolean;
  onChange(checked: boolean): void;
  isMulti?: boolean;
};

function SelectionCell({ isMulti, onChange, ...props }: SelectionCellProps) {
  const handleCellClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    onChange(props.checked);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={handleCellClick} className={styles.selectionCell} data-test-id={TEST_IDS.rowSelect}>
      {isMulti ? <Checkbox {...props} size='s' /> : <Radio {...props} size='s' />}
    </div>
  );
}

export function getSelectionCellColumnDef<TData>(): ColumnDefinition<TData> {
  return {
    id: 'selectionCell',
    pinned: COLUMN_PIN_POSITION.Left,
    noBodyCellPadding: true,
    size: 40,
    headerClassName: styles.selectionCellHeader,
    cell: ({ row, table }) => {
      const disabled = !row.getCanSelect();

      if (disabled) return null;

      const { enableMultiRowSelection } = table.options;

      const isMulti = typeof enableMultiRowSelection === 'boolean' ? enableMultiRowSelection : true;

      return (
        <SelectionCell isMulti={isMulti} checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
      );
    },
    meta: {
      skipOnExport: true,
    },
  };
}
