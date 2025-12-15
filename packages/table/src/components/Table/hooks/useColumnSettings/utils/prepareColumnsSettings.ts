import { BaseItemProps, GroupSelectItemProps } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { ColumnDefinition, FilterableColumnDefinition } from '../../../../../types';
import { getColumnIdentifier, sortColumnDefinitions } from '../../../utils';
import { PinnedGroupsState } from '../../../utils/getPinnedGroups';
import { isFilterableColumn } from './isFilterableColumn';

function createColumnsSettingsOption<TData extends object>(
  columnDefinition: FilterableColumnDefinition<TData>,
): BaseItemProps {
  return {
    id: getColumnIdentifier(columnDefinition),
    content: {
      option: columnDefinition.columnSettings?.label as string,
    },
    switch: true,
    showSwitchIcon: true,
  };
}

function createGroupOptions<TData extends object>(group: ColumnDefinition<TData>[], columnOrder: string[]) {
  return group.filter(isFilterableColumn).sort(sortColumnDefinitions(columnOrder)).map(createColumnsSettingsOption);
}

type PrepareColumnsSettingsProps<TData extends object> = {
  pinnedGroups: PinnedGroupsState<TData>;
  columnOrder: string[];
  areAllColumnsEnabled: boolean;
  t: ReturnType<typeof useLocale<'Table'>>['t'];
};

/**
 * Отвечает за создание списка колонок в настройках с учётом порядка и всех групп
 * @function prepareColumnsSettings
 */
export function prepareColumnsSettings<TData extends object>({
  pinnedGroups,
  columnOrder,
  areAllColumnsEnabled,
  t,
}: PrepareColumnsSettingsProps<TData>): [GroupSelectItemProps] {
  return [
    {
      divider: false,
      items: [
        {
          divider: false,
          items: createGroupOptions(pinnedGroups.left, columnOrder),
          type: 'group',
        },
        {
          divider: true,
          items: createGroupOptions(pinnedGroups.unpinned, columnOrder),
          type: 'group',
        },
        {
          divider: true,
          items: createGroupOptions(pinnedGroups.right, columnOrder),
          type: 'group',
        },
      ],
      selectButtonLabel: areAllColumnsEnabled ? t('groupSelectButton.hide') : t('groupSelectButton.show'),
      label: t('settingsHeaderLabel'),
      mode: 'primary',
      type: 'group-select',
    },
  ];
}
