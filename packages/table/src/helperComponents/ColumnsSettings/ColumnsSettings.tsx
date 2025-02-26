import { ButtonFunction } from '@snack-uikit/button';
import { FunctionSettingsSVG } from '@snack-uikit/icons';
import { Droplist, GroupSelectItemProps } from '@snack-uikit/list';

import styles from './styles.module.scss';

type ColumnsSettingsProps = {
  enabledColumns: string[];
  setEnabledColumns(enabledColumns: string[]): void;
  columnsSettings: [GroupSelectItemProps];
};

export function ColumnsSettings({ columnsSettings, enabledColumns, setEnabledColumns }: ColumnsSettingsProps) {
  return (
    <Droplist
      className={styles.columnsSettings}
      items={columnsSettings}
      selection={{
        value: enabledColumns,
        onChange: setEnabledColumns,
        mode: 'multiple',
      }}
      placement='bottom-end'
    >
      <ButtonFunction size='m' data-test-id='table__column-settings' icon={<FunctionSettingsSVG />} />
    </Droplist>
  );
}
