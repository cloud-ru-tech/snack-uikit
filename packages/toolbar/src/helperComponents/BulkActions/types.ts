import { JSXElementConstructor } from 'react';

import { TooltipProps } from '@snack-uikit/tooltip';
import { ValueOf, WithSupportProps } from '@snack-uikit/utils';

import { SELECTION_MODE } from './constants';

export type SelectionMode = ValueOf<typeof SELECTION_MODE>;

export type BulkAction = WithSupportProps<{
  label: string;
  icon: JSXElementConstructor<{ className?: string }>;
  disabled?: boolean;
  tooltip?: TooltipProps['tip'];
  onClick?(): void;
}>;

export type BulkActionsProps = {
  /** Список массовых действий */
  actions: BulkAction[];
  /** Колбек смены значения чекбокса */
  onCheck?(): void;
  /** Значение чекбокса */
  checked?: boolean;
  /** Состояние частичного выбора */
  indeterminate?: boolean;
  /** Режим выбора @default 'multiple'*/
  selectionMode?: SelectionMode;
};
