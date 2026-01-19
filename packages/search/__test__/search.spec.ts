import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { PRIVATE_SEARCH_TEST_IDS, TEST_IDS } from '../src/constants';
import { TEST_ID_SUBMIT_TOASTER } from '../stories/constants';
import { generateOptions } from '../stories/helpers';

const TEST_ID = 'search-test';
const VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY = 500;

test.describe('Search', () => {
  function getSelectors(getByTestId: (testId: string) => Locator) {
    return {
      input: getByTestId(PRIVATE_SEARCH_TEST_IDS.input),
      list: getByTestId(TEST_IDS.droplist),
      option: (id: string) => getByTestId(TEST_IDS.option + '__' + id),
      submitToaster: getByTestId(TEST_ID_SUBMIT_TOASTER),
      buttonClear: getByTestId(PRIVATE_SEARCH_TEST_IDS.buttonClearValue),
      iconSun: getByTestId(PRIVATE_SEARCH_TEST_IDS.iconSun),
      iconSearch: getByTestId(PRIVATE_SEARCH_TEST_IDS.iconSearch),
    };
  }

  test(`Should open list when typing & won't reset input when closing list`, async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'search',
      props: {
        'data-test-id': TEST_ID,
        autocomplete: true,
      },
    });
    const { input, list } = getSelectors(getByTestId);

    await expect(input).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(list, "list is present although shouldn't").not.toBeVisible();

    await page.keyboard.press('o');
    await page.waitForTimeout(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await expect(input).toHaveValue('o');
    await expect(list, 'list is not present after input').toBeVisible();

    await page.keyboard.press('ArrowUp');
    await expect(list, 'list is present after esc').not.toBeVisible();
    await expect(input).toHaveValue('o');
  });

  test(`Should call submit action by click on option in list`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'search',
      props: {
        'data-test-id': TEST_ID,
        autocomplete: true,
      },
    });
    const { input, list, option, submitToaster } = getSelectors(getByTestId);

    await expect(input).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(list, "list is present although shouldn't").not.toBeVisible();

    await page.keyboard.press('o');
    await page.waitForTimeout(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await expect(input).toHaveValue('o');
    await expect(list, 'list is not present after input').toBeVisible();

    const optionValue = generateOptions('o')[0].id;

    await option(optionValue).click();

    await expect(input).toHaveValue(optionValue);

    await expect(submitToaster, 'submit toast not present after option click').not.toBeVisible();
  });

  test(`Should clear input by click on ButtonClear`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'search',
      props: {
        'data-test-id': TEST_ID,
        autocomplete: true,
      },
    });
    const { input, list, buttonClear } = getSelectors(getByTestId);

    await expect(input).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(list, "list is present although shouldn't").not.toBeVisible();

    await page.keyboard.press('o');
    await page.waitForTimeout(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await expect(input).toHaveValue('o');
    await expect(list, 'list is not present after input').toBeVisible();

    await expect(buttonClear, 'Should render button clear when input not empty').toBeVisible();
    await buttonClear.click();

    await expect(input).toHaveValue('');
    await expect(list, 'Should hide list when input not empty').not.toBeVisible();
  });

  test(`Should be controlled by keyboard`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'search',
      props: {
        'data-test-id': TEST_ID,
        autocomplete: true,
      },
    });
    const { input, list, option, buttonClear } = getSelectors(getByTestId);

    await expect(input).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(list, "list is present although shouldn't").not.toBeVisible();

    await page.keyboard.press('o');
    await page.waitForTimeout(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await expect(input).toHaveValue('o');

    await page.keyboard.press('ArrowDown');

    const optionValue = generateOptions('o')[0].id;

    await expect(option(optionValue)).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(input).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(buttonClear).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(input).not.toBeFocused();
  });

  test(`Should handle keypress while focus on option`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'search',
      props: {
        'data-test-id': TEST_ID,
        autocomplete: true,
      },
    });
    const { input, list, option } = getSelectors(getByTestId);

    await expect(input).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(list, "list is present although shouldn't").not.toBeVisible();

    await page.keyboard.press('o');
    await page.waitForTimeout(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await expect(input).toHaveValue('o');

    const optionValue = generateOptions('o')[0].id;

    await page.keyboard.press('ArrowDown');
    await expect(option(optionValue)).toBeFocused();

    await page.keyboard.press('o');
    await page.waitForTimeout(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await expect(input).toHaveValue('oo');
  });

  test(`Should be render without list`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'search',
      props: {
        'data-test-id': TEST_ID,
        autocomplete: false,
      },
    });
    const { input, list } = getSelectors(getByTestId);

    await expect(input).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(list, "list is present although shouldn't").not.toBeVisible();

    await page.keyboard.press('o');
    await page.waitForTimeout(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await expect(input).toHaveValue('o');

    await expect(list, "list is present although shouldn't").not.toBeVisible();
  });

  test(`Should be changed icon`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'search',
      props: {
        'data-test-id': TEST_ID,
        autocomplete: false,
      },
    });
    const { input, iconSearch, iconSun } = getSelectors(getByTestId);

    await expect(input).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(iconSearch, 'icon search should be rendered').toBeVisible();

    await page.keyboard.press('o');
    await expect(input).toHaveValue('o');

    await expect(iconSun, 'icon sun should be rendered when loading').toBeVisible();
  });

  test(`Should call submit by Enter click`, async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'search',
      props: {
        'data-test-id': TEST_ID,
        autocomplete: false,
      },
    });
    const { input, submitToaster } = getSelectors(getByTestId);

    await expect(input).toBeVisible();

    await page.keyboard.press('Tab');

    await page.keyboard.press('o');
    await page.waitForTimeout(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await expect(input).toHaveValue('o');

    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('o');

    await expect(submitToaster, 'submit toast not present after enter click').not.toBeVisible();
    // await expect(input).not.toBeFocused();
  });
});
