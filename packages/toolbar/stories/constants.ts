import { CheckSVG, CrossSVG, PlaceholderSVG, TrashSVG } from '@snack-uikit/icons';
import { toaster } from '@snack-uikit/toaster';

import { TEST_IDS } from '../src/constants';
import { generateOptions } from './helpers';
import { TEST_ID_TOASTER } from './testIds';

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
