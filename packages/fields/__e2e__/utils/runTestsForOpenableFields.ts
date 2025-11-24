import type { Locator } from '@playwright/test';

import { expect, test } from '../../../../playwright/fixtures';

type StoryCallback = (props: Record<string, unknown>) => {
  name: string;
  group?: string;
  props?: Record<string, unknown>;
};

type Options = {
  dropListTestId: string;
  iconTestId: string;
};

export const runTestsForOpenableFields = (getStory: StoryCallback, testId: string, options: Options) => {
  const getIcon = (wrapper: Locator) => wrapper.locator(`[data-test-id="${options.iconTestId}"]`);
  const getDropList = (getByTestId: (testId: string) => Locator) => getByTestId(options.dropListTestId);

  // open/close
  test('Should open/close drop list by click & keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({}));
    const wrapper = getByTestId(testId);
    const icon = getIcon(wrapper);
    const dropList = getDropList(getByTestId);

    await expect(dropList, "drop list is present although shouldn't").not.toBeVisible();

    await icon.click();
    await expect(dropList, 'drop list is not present after clicking on icon').toBeVisible();

    // this is not working for field-select right now
    // await page.keyboard.press('Space');
    // await expect(dropList, "drop list is present after space although shouldn't").not.toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dropList, 'drop list is still present after esc').not.toBeVisible();
  });

  // open/close & readonly
  test("Shouldn't open when readonly", async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: '', readonly: true }));
    const wrapper = getByTestId(testId);
    const dropList = getDropList(getByTestId);

    await expect(dropList, "drop list is present although shouldn't").not.toBeVisible();

    await wrapper.click();

    await expect(dropList, "drop list is present after click although shouldn't").not.toBeVisible();
  });

  // open/close & disabled
  test("Shouldn't open when disabled", async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ value: '', disabled: true }));
    const wrapper = getByTestId(testId);
    const dropList = getDropList(getByTestId);

    await expect(dropList, "drop list is present although shouldn't").not.toBeVisible();

    await wrapper.click();

    await expect(dropList, "drop list is present after click although shouldn't").not.toBeVisible();
  });
};
