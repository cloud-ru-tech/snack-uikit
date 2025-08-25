import { CheckSVG, CrossSVG, PlaceholderSVG, TrashSVG } from '@snack-uikit/icons';
import { toaster } from '@snack-uikit/toaster';

import { FilterRow } from '../src/components/Toolbar/types';
import { TEST_IDS } from '../src/constants';
import { generateOptions } from './helpers';
import { STORY_TEST_IDS, TEST_ID_TOASTER } from './testIds';

export const OPTIONS_LENGTH = 3;

export const OPTIONS = generateOptions(OPTIONS_LENGTH);

export const BULK_ACTIONS = [
  {
    label: 'Confirm',
    icon: CheckSVG,
    onClick: () => toaster.userAction.warning({ label: 'Confirm', 'data-test-id': TEST_ID_TOASTER.confirm }),
    'data-test-id': TEST_IDS.confirmAction,
  },
  {
    label: 'Remove confirmation',
    icon: CrossSVG,
    onClick: () => toaster.userAction.warning({ label: 'Reject', 'data-test-id': TEST_ID_TOASTER.reject }),
    'data-test-id': TEST_IDS.rejectAction,
  },
  {
    label: 'Delete',
    icon: TrashSVG,
    onClick: () => toaster.userAction.warning({ label: 'Delete', 'data-test-id': TEST_ID_TOASTER.delete }),
    disabled: true,
    tooltip: 'One of the selected objects cannot be deleted in bulk',
    'data-test-id': TEST_IDS.deleteAction,
  },
  {
    label: 'Deactivate',
    icon: PlaceholderSVG,
    onClick: () => toaster.userAction.warning({ label: 'Deactivate', 'data-test-id': TEST_ID_TOASTER.deactivate }),
    'data-test-id': TEST_IDS.deactivateAction,
  },
  {
    label: 'Disabled Action',
    icon: PlaceholderSVG,
    onClick: () => toaster.userAction.warning({ label: 'Disabled', 'data-test-id': TEST_ID_TOASTER.disabled }),
    disabled: true,
    tooltip: 'Example of disabled action in the list',
    'data-test-id': TEST_IDS.disabledAction,
  },
];

export const FILTER_ROW: FilterRow<Record<string, string>> = {
  showAddButton: true,
  showClearButton: true,
  filters: [
    {
      id: 'multi1',
      label: 'Multi',
      type: 'multiple',
      pinned: true,
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
      'data-test-id': STORY_TEST_IDS.pinnedMultiFilter,
    },
    {
      id: 'multi2',
      label: 'Multi with apply button',
      type: 'multiple',
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
      autoApply: false,
    },
    {
      id: 'single3',
      label: 'Single',
      type: 'single',
      pinned: true,
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
      'data-test-id': STORY_TEST_IDS.pinnedSingleFilter,
    },
    {
      id: 'single4',
      label: 'Single with apply button',
      type: 'single',
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
      autoApply: false,
      'data-test-id': STORY_TEST_IDS.singleFilter,
    },
    {
      id: 'date5',
      label: 'Date',
      type: 'date',
      'data-test-id': STORY_TEST_IDS.dateFilter,
    },
    {
      id: 'time6',
      label: 'Time',
      type: 'time',
    },
  ],
};
