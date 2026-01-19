import type { Locator } from '@playwright/test';

import { expect, test } from '../../../../playwright/fixtures';

export type StoryCallback = (props?: Record<string, unknown>) => {
  name: string;
  story: string;
  group?: string;
  props?: Record<string, unknown>;
};

type GetComponent = (getByTestId: (testId: string) => Locator) => {
  chip: Locator;
  label: Locator;
  value?: Locator;
  icon: Locator;
  spinner: Locator;
};

const LABEL_TEXT = 'Test text';
const ICON_NAME = 'PlaceholderSVG';
const CLICK_COUNTER_TEST_ID = 'click__counter';

export const validateNoIconForSizeXs = (getStory: StoryCallback, getComponent: GetComponent, checkValue = false) => {
  test('should have no icon when prop size === "xs"', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ label: LABEL_TEXT, size: 'xs', icon: ICON_NAME }));
    const { label, value, icon } = getComponent(getByTestId);

    if (checkValue && value) {
      await expect(value).toBeVisible();
    } else {
      await expect(label).toBeVisible();
    }
    await expect(icon).not.toBeVisible();
  });
};

export const runCommonTests = (getStory: StoryCallback, getComponent: GetComponent) => {
  test('should render with icon', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ label: LABEL_TEXT, icon: ICON_NAME }));
    const { label, icon } = getComponent(getByTestId);

    await expect(label).toBeVisible();
    await expect(icon).toBeVisible();
  });

  test('icon should change to spinner when loading', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ label: LABEL_TEXT, loading: true, icon: ICON_NAME }));
    const { label, icon, spinner } = getComponent(getByTestId);

    await expect(label).toBeVisible();
    await expect(spinner).toBeVisible();
    await expect(icon).not.toBeVisible();
  });

  test('label should hide when loading', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ label: LABEL_TEXT, loading: true }));
    const { label, spinner } = getComponent(getByTestId);

    await expect(label).toHaveCSS('opacity', '0');
    await expect(spinner).toBeVisible();
  });

  validateNoIconForSizeXs(getStory, getComponent);
};

export const validateClicks = (getStory: StoryCallback, getComponent: GetComponent) => {
  test('click is working', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory());
    const { chip } = getComponent(getByTestId);
    const count = getByTestId(CLICK_COUNTER_TEST_ID);

    await chip.click();
    await expect(count).toHaveText('1');
  });

  test('should be disabled and click is ignored', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ disabled: true }));
    const { chip } = getComponent(getByTestId);
    const count = getByTestId(CLICK_COUNTER_TEST_ID);

    const hasDisabledAttribute =
      (await chip.getAttribute('disabled')) !== null || (await chip.getAttribute('data-disabled')) !== null;
    expect(hasDisabledAttribute).toBe(true);
    await expect(chip).toHaveCSS('cursor', 'not-allowed');

    await chip.click({ force: true });
    await expect(count).toHaveText('0');
  });
};
