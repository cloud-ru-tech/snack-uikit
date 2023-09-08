import { PlaceholderSVG } from '@snack-ui/icons';
import { toaster } from '@snack-ui/toaster';

import { STORY_TEST_IDS } from './testIds';

export function generateOptions(length: number) {
  return Array.from({ length: Number(length) || 3 }).map((_, i) => ({
    option: `Option ${i + 1}`,
    onClick: () =>
      toaster.userAction.neutral({ label: `Option ${i + 1} clicked`, 'data-test-id': STORY_TEST_IDS.toaster }),
    icon: <PlaceholderSVG />,
  }));
}
