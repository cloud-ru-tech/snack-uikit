import type { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { CHIP_ASSIST_TEST_IDS } from '../src/constants';
import { runCommonTests, validateClicks } from './utils/commonTests';

const BASE_TEST_ID = 'chipAssist';

const LABEL_TEXT = 'Test text';

const getStory = (props: Record<string, unknown> & { icon?: string } = {}) => ({
  name: 'chipassist',
  story: 'chip-assist',
  group: 'chips',
  props: {
    'data-test-id': BASE_TEST_ID,
    ...props,
    showClickCounter: true,
  },
});

function getComponent(getByTestId: (testId: string) => Locator) {
  const chip = getByTestId(BASE_TEST_ID);

  return {
    chip,
    label: chip.locator(`[data-test-id="${CHIP_ASSIST_TEST_IDS.label}"]`).locator(`[data-test-id="full-text"]`),
    icon: chip.locator(`[data-test-id="${CHIP_ASSIST_TEST_IDS.icon}"]`).locator('svg'),
    spinner: chip.locator(`[data-test-id="${CHIP_ASSIST_TEST_IDS.spinner}"]`).locator('svg'),
  };
}

test.describe('ChipAssist', () => {
  test(`should render with label "${LABEL_TEXT}"`, async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ label: LABEL_TEXT }));
    const { chip, label } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(label).toHaveText(LABEL_TEXT);
  });

  validateClicks(getStory, getComponent);
  runCommonTests(getStory, getComponent);
});
