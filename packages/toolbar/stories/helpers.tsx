import { PlaceholderSVG } from '@snack-ui/icons';
import { toaster } from '@snack-ui/toaster';

import { ToolbarProps } from '../src';
import { TEST_ID_TOASTER } from './testIds';

export function generateOptions(length: number) {
  return Array.from({ length: Number(length) || 3 }).map((_, i) => ({
    option: `Option ${i + 1}`,
    onClick: () =>
      toaster.userAction.neutral({ label: `Option ${i + 1} clicked`, 'data-test-id': TEST_ID_TOASTER.option }),
    icon: <PlaceholderSVG />,
  }));
}

export function extractToolbarArgs<T extends ToolbarProps>({ placeholder, loading }: Partial<T>) {
  return { placeholder, loading };
}
