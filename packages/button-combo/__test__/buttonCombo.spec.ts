import type { Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { DROPLIST_OPTIONS } from './constants';

const DEFAULT_LABEL = 'create';

const BUTTON_COMBO_ID = 'button-combo';
const BUTTON_OPTION_ID = 'button-combo__option';
const BUTTON_DROPDOWN_ID = 'button-combo__dropdown-button';
const DROPDOWN_ID = 'button-combo__dropdown';

const getDropdownBaseItem = (page: Page, id: string) => page.locator(`[data-test-id="list__base-item_${id}"]`);

test.describe('Button Combo', () => {
  test('Should render', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: BUTTON_COMBO_ID,
      props: {
        'data-test-id': BUTTON_COMBO_ID,
        defaultLabel: DEFAULT_LABEL,
      },
    });
    const button = getByTestId(BUTTON_COMBO_ID);
    const optionButton = getByTestId(BUTTON_OPTION_ID);
    const dropdownButton = getByTestId(BUTTON_DROPDOWN_ID);

    await expect(button).toBeVisible();

    await expect(optionButton).toBeVisible();
    const optionButtonLabel = optionButton.locator(`[data-test-id="label"]`);
    await expect(optionButtonLabel).toBeVisible();

    await expect(dropdownButton).toBeVisible();
    const dropdownButtonIcon = dropdownButton.locator(`[data-test-id="icon"]`);
    await expect(dropdownButtonIcon).toBeVisible();
  });

  test('Should be disabled with loading prop', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: BUTTON_COMBO_ID,
      props: {
        'data-test-id': BUTTON_COMBO_ID,
        defaultLabel: DEFAULT_LABEL,
        loading: true,
        defaultValue: '1',
      },
    });
    const optionButton = getByTestId(BUTTON_OPTION_ID);
    const dropdownButton = getByTestId(BUTTON_DROPDOWN_ID);

    await expect(optionButton).toHaveAttribute('data-loading');
    await expect(dropdownButton).toHaveAttribute('data-loading');

    const label = optionButton.locator(`[data-test-id="label"]`);
    await expect(label).toHaveCSS('opacity', '0');

    const optionLoadingIcon = optionButton.locator(`[data-test-id="loading-icon"]`);
    await expect(optionLoadingIcon).toBeVisible();

    const dropdownLoadingIcon = dropdownButton.locator(`[data-test-id="loading-icon"]`);
    await expect(dropdownLoadingIcon).toBeVisible();

    await expect(optionButton).toHaveCSS('cursor', 'not-allowed');

    const dialogPromise = page.waitForEvent('dialog', { timeout: 100 }).catch(() => null);
    await optionButton.click({ force: true });
    const dialog = await dialogPromise;
    expect(dialog).toBeNull();

    await dropdownButton.click({ force: true });

    const dropdown = getByTestId(DROPDOWN_ID);
    await expect(dropdown).not.toBeVisible();
  });

  test('Should be disabled with disabled prop', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: BUTTON_COMBO_ID,
      props: {
        'data-test-id': BUTTON_COMBO_ID,
        defaultLabel: DEFAULT_LABEL,
        disabled: true,
        defaultValue: '1',
      },
    });
    const optionButton = getByTestId(BUTTON_OPTION_ID);
    const dropdownButton = getByTestId(BUTTON_DROPDOWN_ID);

    await expect(optionButton).toHaveAttribute('data-disabled');
    await expect(dropdownButton).toHaveAttribute('data-disabled');

    await expect(optionButton).toHaveCSS('cursor', 'not-allowed');

    const dialogPromise = page.waitForEvent('dialog', { timeout: 100 }).catch(() => null);
    await optionButton.click({ force: true });
    const dialog = await dialogPromise;
    expect(dialog).toBeNull();

    await dropdownButton.click({ force: true });

    const dropdown = getByTestId(DROPDOWN_ID);
    await expect(dropdown).not.toBeVisible();
  });

  test('Should change label and action', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: BUTTON_COMBO_ID,
      props: {
        'data-test-id': BUTTON_COMBO_ID,
        defaultLabel: DEFAULT_LABEL,
        defaultValue: '1',
      },
    });
    const optionButton = getByTestId(BUTTON_OPTION_ID);
    const dropdownButton = getByTestId(BUTTON_DROPDOWN_ID);

    await expect(optionButton).toHaveText(DROPLIST_OPTIONS[0].label);

    const dialogHistory: string[] = [];
    page.on('dialog', dialog => {
      dialogHistory.push(dialog.message());
      dialog.accept();
    });

    await optionButton.click();
    await page.waitForTimeout(100);

    await dropdownButton.click();

    const dropdown = getByTestId(DROPDOWN_ID);
    await expect(dropdown).toBeVisible();

    await getDropdownBaseItem(page, String(DROPLIST_OPTIONS[1].id)).click();
    await page.waitForTimeout(100);

    await optionButton.click();
    await page.waitForTimeout(100);

    await expect(optionButton).toHaveText(DROPLIST_OPTIONS[1].label);

    expect(dialogHistory.length).toEqual(2);
    expect(dialogHistory[0]).toEqual('Action 1 completed');
    expect(dialogHistory[1]).toEqual('Action 2 completed');
  });
});
