import type { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { CHIP_CHOICE_ROW_IDS, CHIP_CHOICE_TEST_IDS } from '../src/constants';
import { DEFAULT_VALUES, STORY_TEST_IDS } from '../stories/forTests';

const TEST_ID = 'chip-choice-row';

const getStory = (props: Record<string, unknown> = {}) => ({
  name: 'chipchoicerow',
  story: 'chip-choice-row',
  props: {
    'data-test-id': TEST_ID,
    ...props,
  },
  group: 'chips',
});

function getComponent(getByTestId: (testId: string) => Locator, page: Page) {
  return {
    row: getByTestId(TEST_ID),
    state: getByTestId(STORY_TEST_IDS.State),
    addButton: getByTestId(CHIP_CHOICE_ROW_IDS.addButton),
    addButtonOption: (optionId: string) => getByTestId(`${CHIP_CHOICE_ROW_IDS.addButtonOption}-${optionId}`),
    addButtonTooltip: getByTestId(CHIP_CHOICE_ROW_IDS.addButtonTooltip),
    clearButton: getByTestId(CHIP_CHOICE_ROW_IDS.clearButton),

    pinnedMulti: getByTestId(STORY_TEST_IDS.Multiple2),
    pinnedDate: getByTestId(STORY_TEST_IDS.Date),

    single: getByTestId(STORY_TEST_IDS.Single2),
    dateTime: getByTestId(STORY_TEST_IDS.DateTime),
    dateRange: getByTestId(STORY_TEST_IDS.DateRange),

    listOption: (optionId: string) => getByTestId(`list__base-item_${optionId}`),
    chipList: getByTestId(`chip-choice__droplist`),
    chip: page.locator('[data-test-id^="chip-choice-row__"]'),
  };
}

test.describe('ChipChoiceRow', () => {
  test('Should render ClearAllButton when pinned filter is changed', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ useDefaultValues: false }));
    const { clearButton, pinnedMulti, listOption } = getComponent(getByTestId, page);

    await expect(clearButton).not.toBeVisible();

    await pinnedMulti.click();
    await listOption('vm-2').click();

    await expect(clearButton).toBeVisible();
  });

  test('Should render ClearAllButton when usual filter is added', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ useDefaultValues: false }));
    const { clearButton, addButton, addButtonOption, listOption } = getComponent(getByTestId, page);

    await expect(clearButton).not.toBeVisible();

    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.Single2).click();
    await listOption('true').click();

    await expect(clearButton).toBeVisible();
  });

  test('Should not render ClearAllButton with showClearAllButton=false', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ useDefaultValues: false, showClearButton: false }));
    const { clearButton, pinnedMulti, listOption, addButton, addButtonOption } = getComponent(getByTestId, page);

    await pinnedMulti.click();
    await listOption('vm-2').click();
    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.Single2).click();
    await listOption('true').click();

    await expect(clearButton).not.toBeVisible();
  });

  test('Should show add button when showAddButton = false', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ showAddButton: false }));
    const { addButton } = getComponent(getByTestId, page);

    await expect(addButton).not.toBeVisible();
  });

  test('Add button should allow to add new chips', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ useDefaultValues: false }));
    const { single, dateRange, addButton, addButtonOption, chip, chipList } = getComponent(getByTestId, page);

    await expect(single).not.toBeVisible();
    await expect(dateRange).not.toBeVisible();

    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.DateRange).click();

    await expect(dateRange).toBeVisible();
    await expect(chipList).toBeVisible();

    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.Single2).click();

    await expect(single).toBeVisible();
    await expect(chipList).toBeVisible();

    await expect(await chip.nth(2).getAttribute('data-test-id')).toBe(STORY_TEST_IDS.DateRange);
    await expect(await chip.nth(3).getAttribute('data-test-id')).toBe(STORY_TEST_IDS.Single2);
  });

  test('Should show add button tooltip when no more filter is possible to add', async ({
    gotoStory,
    getByTestId,
    page,
  }) => {
    await gotoStory(getStory({}));
    const { addButton, addButtonOption, addButtonTooltip } = getComponent(getByTestId, page);

    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.Multiple1).click();
    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.Single1).click();
    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.DateTime).click();
    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.DateTimeAndSec).click();
    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.TimeAndSec).click();
    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.Custom).click();
    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.MultipleManyOption).click();
    await addButton.hover();

    await expect(addButtonTooltip).toBeVisible();
  });

  test('Should change state after interaction with chips', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ useDefaultValues: false }));
    const { row, state, pinnedMulti, listOption, addButton, addButtonOption } = getComponent(getByTestId, page);

    await expect(row).toBeVisible();
    await expect(state).toHaveText('{}');

    await pinnedMulti.click();
    await listOption('vm-2').click();
    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.Single2).click();
    await listOption('true').click();

    await expect(state).toHaveText(JSON.stringify({ multiple2: ['vm-2'], single2: 'true' }));
  });

  test('Should clear state after ClearAllButton click', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({}));
    const { state, clearButton } = getComponent(getByTestId, page);

    await expect(state).toHaveText(JSON.stringify(DEFAULT_VALUES));
    await clearButton.click();

    await expect(state).toHaveText(JSON.stringify({ multiple2: DEFAULT_VALUES.multiple2, date: DEFAULT_VALUES.date }));
  });

  test('Should clear state after pinned chip clear button click', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ useDefaultValues: false, showClearButton: false }));
    const { state, single, listOption, addButton, addButtonOption } = getComponent(getByTestId, page);

    await addButton.click();
    await addButtonOption(STORY_TEST_IDS.Single2).click();
    await listOption('true').click();

    await expect(state).toHaveText(JSON.stringify({ single2: 'true' }));

    const clearButton = single.locator(`[data-test-id="${CHIP_CHOICE_TEST_IDS.clearButton}"]`);
    await clearButton.click();

    await expect(state).toHaveText('{}');
  });

  test('Should clear state after usual chip clear button click', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ useDefaultValues: false, showClearButton: false }));
    const { state, listOption, pinnedMulti } = getComponent(getByTestId, page);

    await pinnedMulti.click();
    await listOption('vm-2').click();

    await expect(state).toHaveText(JSON.stringify({ multiple2: ['vm-2'] }));

    const clearButton = pinnedMulti.locator(`[data-test-id="${CHIP_CHOICE_TEST_IDS.clearButton}"]`);
    await clearButton.click();

    await expect(state).toHaveText('{}');
  });
});
