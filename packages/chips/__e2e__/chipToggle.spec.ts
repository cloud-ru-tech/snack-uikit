import type { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { CHIP_TOGGLE_TEST_IDS } from '../src/constants';
import { runCommonTests } from './utils/commonTests';

const BASE_TEST_ID = 'toggleChip';

const LABEL_TEXT = 'Test text';

const getStory = (props: Record<string, unknown> & { icon?: string } = {}) => ({
  name: 'chiptoggle',
  story: 'chip-toggle',
  group: 'chips',
  props: {
    'data-test-id': BASE_TEST_ID,
    ...props,
  },
});

function getComponent(getByTestId: (testId: string) => Locator) {
  const chip = getByTestId(BASE_TEST_ID);

  return {
    chip,
    input: chip.getByTestId(CHIP_TOGGLE_TEST_IDS.input),
    label: chip.getByTestId(CHIP_TOGGLE_TEST_IDS.label).locator(`[data-test-id="full-text"]`),
    icon: chip.getByTestId(CHIP_TOGGLE_TEST_IDS.icon).locator('svg'),
    spinner: chip.getByTestId(CHIP_TOGGLE_TEST_IDS.spinner).locator('svg'),
  };
}

test.describe('ChipToggle', () => {
  test(`should render with label "${LABEL_TEXT}" and click is working`, async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ label: LABEL_TEXT }));
    const { chip, input, label } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(label).toHaveText(LABEL_TEXT);

    await chip.click();

    await expect(input).toBeChecked();
    await expect(chip).toHaveAttribute('data-checked');
  });

  test('should be disabled and click is ignored', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ disabled: true }));
    const { chip, input } = getComponent(getByTestId);

    await expect(input).toHaveAttribute('disabled');

    await expect(chip).toHaveAttribute('data-disabled');

    await chip.click({ force: true });

    await expect(input).not.toBeChecked();
    await expect(chip).not.toHaveAttribute('data-checked');
  });

  test('should be checked and click should deselect', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ checked: true }));
    const { chip, input } = getComponent(getByTestId);

    await expect(chip).toHaveAttribute('data-checked');
    await expect(input).toBeChecked();

    await chip.click();

    await expect(input).not.toBeChecked();
    await expect(chip).not.toHaveAttribute('data-checked');
  });

  runCommonTests(getStory, getComponent);
});
