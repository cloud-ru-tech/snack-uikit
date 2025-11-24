import type { Locator } from '@playwright/test';

import { expect, test } from '../../../../playwright/fixtures';
import { CHIP_CHOICE_TEST_IDS } from '../../src/constants';
import { validateClicks, validateNoIconForSizeXs } from './commonTests';

type ChipType = 'single' | 'multi' | 'date' | 'date-range' | 'time';

const BASE_TEST_ID = 'chip-choice';

export const LABEL_TEXT = 'Label Text:';

export const VALUES_LABELS = [
  { value: 'value1', label: 'Option 1' },
  { value: 'value2', label: 'Option 2' },
  { value: 'value3', label: 'Option 3' },
];

export const ICON_NAME = 'PlaceholderSVG';

export const createChipGetStory =
  (chip: ChipType) =>
  (props: Record<string, unknown> & { icon?: string } = {}) => ({
    name: 'chipchoice',
    story: `chip-choice-${chip}`,
    group: 'chips',
    props: {
      'data-test-id': BASE_TEST_ID,
      ...props,
      useBaseOptions: true,
      showClickCounter: true,
      searchable: false,
    },
  });

export function getComponent(getByTestId: (testId: string) => Locator) {
  const chip = getByTestId(BASE_TEST_ID);
  const droplist = getByTestId(CHIP_CHOICE_TEST_IDS.droplist);
  const getOption = (value: string | number) => getByTestId(`list__base-item_${value}`);

  const getOptionCheckbox = (value: string | number) =>
    getOption(value).locator(`[data-test-id="list__base-item-checkbox"]`);

  return {
    chip,
    label: getByTestId(CHIP_CHOICE_TEST_IDS.label),
    value: getByTestId(CHIP_CHOICE_TEST_IDS.value).locator(`[data-test-id="full-text"]`),
    iconWrap: getByTestId(CHIP_CHOICE_TEST_IDS.icon),
    icon: getByTestId(CHIP_CHOICE_TEST_IDS.icon).locator('svg'),
    spinner: getByTestId(CHIP_CHOICE_TEST_IDS.spinner).locator('svg'),
    clearButton: getByTestId(CHIP_CHOICE_TEST_IDS.clearButton),
    footer: getByTestId(CHIP_CHOICE_TEST_IDS.footer),
    cancelButton: getByTestId(CHIP_CHOICE_TEST_IDS.cancelButton),
    approveButton: getByTestId(CHIP_CHOICE_TEST_IDS.approveButton),
    droplist,
    getOption,
    getOptionCheckbox,
  };
}

export function chipChoiceCommonTests(getStory: ReturnType<typeof createChipGetStory>, chipType: ChipType) {
  test('should render with defaultValue, but without clear button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ showClearButton: false, useDefaultValue: true }));
    const { value, clearButton } = getComponent(getByTestId);

    await expect(value).toBeVisible();
    await expect(await value.textContent()).not.toEqual('All');
    await expect(clearButton).not.toBeVisible();
  });

  if (chipType !== 'multi') {
    test('should render without "defaultValue"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(getStory({ useDefaultValue: false }));
      const { chip, value, label } = getComponent(getByTestId);

      await expect(chip).toBeVisible();
      await expect(label).toBeVisible();
      await expect(value).toBeVisible();

      await expect(value).toHaveText('All');
    });
  }

  test('should not render footer', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ autoApply: true }));
    const { footer } = getComponent(getByTestId);

    await expect(footer).not.toBeVisible();
  });

  test('should render with icon', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ icon: ICON_NAME }));
    const { value, icon } = getComponent(getByTestId);

    await expect(value).toBeVisible();
    await expect(icon).toBeVisible();
  });

  test('value should change to spinner when loading', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ loading: true, icon: ICON_NAME }));
    const { value, icon, spinner } = getComponent(getByTestId);

    await expect(value).not.toBeVisible();
    await expect(spinner).toBeVisible();
    await expect(icon).toBeVisible();
  });

  test(`should render with label "${LABEL_TEXT} and change value to spinner"`, async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ label: LABEL_TEXT, loading: true }));
    const { chip, label, value, spinner } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(label).toHaveText(LABEL_TEXT);
    await expect(spinner).toBeVisible();
    await expect(value).not.toBeVisible();
  });

  test('Keyboard handling is working properly', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(getStory({ useDefaultValue: true }));
    const browserName = page.context().browser()?.browserType().name();
    if (browserName === 'firefox') {
      console.info('Keyboard test has a lot of bugs in Firefox, so it is skipped');
      return;
    }

    const { chip, droplist, clearButton } = getComponent(getByTestId);
    await expect(chip).toBeVisible();

    await page.keyboard.press('Tab');
    const isChipFocused1 = await chip.evaluate(el => document.activeElement === el);
    expect(isChipFocused1).toBe(true);

    await page.keyboard.press('ArrowDown');
    await expect(droplist).toBeVisible();

    if (chipType === 'time') {
      for (let i = 0; i < 21; i++) {
        await page.keyboard.press('ArrowUp');
      }
      const isChipFocused2 = await chip.evaluate(el => document.activeElement === el);
      expect(isChipFocused2).toBe(true);
      await expect(droplist).not.toBeVisible();
    } else {
      await page.keyboard.press('ArrowUp');
      const isChipFocused3 = await chip.evaluate(el => document.activeElement === el);
      expect(isChipFocused3).toBe(true);
      await page.keyboard.press('ArrowUp');
      await expect(droplist).not.toBeVisible();
    }

    await page.keyboard.press('ArrowRight');
    const isChipFocused4 = await chip.evaluate(el => document.activeElement === el);
    expect(isChipFocused4).toBe(false);
    const isClearButtonFocused1 = await clearButton.evaluate(el => document.activeElement === el);
    expect(isClearButtonFocused1).toBe(true);

    await page.keyboard.press('ArrowLeft');
    const isChipFocused5 = await chip.evaluate(el => document.activeElement === el);
    expect(isChipFocused5).toBe(true);
    const isClearButtonFocused2 = await clearButton.evaluate(el => document.activeElement === el);
    expect(isClearButtonFocused2).toBe(false);

    await page.keyboard.press('Tab');
    const isChipFocused6 = await chip.evaluate(el => document.activeElement === el);
    expect(isChipFocused6).toBe(false);
  });

  validateNoIconForSizeXs(getStory, getComponent, true);

  validateClicks(getStory, getComponent);
}
