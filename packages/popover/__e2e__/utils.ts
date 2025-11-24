import { expect, type Locator, type Page } from '@playwright/test';

import { dataTestIdSelector } from '../../../playwright/utils';

export const ACTIVITY_REMOVAL_ITEM = dataTestIdSelector('activity-removal');

const clickWithoutFocus = async (page: Page, selector: string) => {
  await page.evaluate((sel: string) => {
    document.querySelector<HTMLElement>(sel)?.click();
  }, selector);
};

export const scrollWindow = async (page: Page, x: number, y: number) => {
  await page.evaluate(
    ({ xPos, yPos }: { xPos: number; yPos: number }) => {
      window.scroll(xPos, yPos);
    },
    { xPos: x, yPos: y },
  );
};

export const verifyClickTrigger = async ({
  page,
  getByTestId,
  targetId,
  popoverId,
  enabled,
}: {
  page: Page;
  getByTestId: (testId: string) => Locator;
  targetId: string;
  popoverId: string;
  enabled?: boolean;
}) => {
  const targetSelector = dataTestIdSelector(targetId);
  const getPopover = () => getByTestId(popoverId);

  if (enabled) {
    await clickWithoutFocus(page, targetSelector);
    await expect(getPopover()).toBeVisible();
    await clickWithoutFocus(page, targetSelector);
    await expect(getPopover()).not.toBeVisible();
  } else {
    await clickWithoutFocus(page, targetSelector);
    await expect(getPopover()).not.toBeVisible();
  }
};

export const verifyClickWithFocusTrigger = async ({
  page,
  getByTestId,
  targetId,
  popoverId,
}: {
  page: Page;
  getByTestId: (testId: string) => Locator;
  targetId: string;
  popoverId: string;
}) => {
  const target = getByTestId(targetId);
  const getPopover = () => getByTestId(popoverId);

  await target.click();
  await expect(getPopover()).toBeVisible();
  await page.locator(ACTIVITY_REMOVAL_ITEM).click();
  await expect(getPopover()).not.toBeVisible();
};

export const verifyHoverTrigger = async ({
  page,
  getByTestId,
  targetId,
  popoverId,
  enabled,
}: {
  page: Page;
  getByTestId: (testId: string) => Locator;
  targetId: string;
  popoverId: string;
  enabled?: boolean;
}) => {
  const target = getByTestId(targetId);
  const popover = getByTestId(popoverId);

  if (enabled) {
    await target.hover();
    await expect(popover).toBeVisible();
    await page.locator(ACTIVITY_REMOVAL_ITEM).click();
    await expect(popover).not.toBeVisible();
  } else {
    await target.hover();
    await expect(popover).not.toBeVisible();
  }
};

export const verifyFocusTrigger = async ({
  page,
  getByTestId,
  popoverId,
  enabled,
}: {
  page: Page;
  getByTestId: (testId: string) => Locator;
  popoverId: string;
  enabled?: boolean;
}) => {
  const getPopover = () => getByTestId(popoverId);

  if (enabled) {
    await page.locator(ACTIVITY_REMOVAL_ITEM).click();
    await page.keyboard.press('Tab');
    await expect(getPopover()).toBeVisible();
    await page.locator(ACTIVITY_REMOVAL_ITEM).click();
    await expect(getPopover()).not.toBeVisible();
  } else {
    await page.locator(ACTIVITY_REMOVAL_ITEM).click();
    await page.keyboard.press('Tab');
    await expect(getPopover()).not.toBeVisible();
  }
};
