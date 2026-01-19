import { expect, type Locator, type Page } from '../../../playwright/fixtures';

const focus = async (getByTestId: (testId: string) => Locator, testId: string) => {
  const element = getByTestId(testId);
  await element.focus();
};

const clickWithoutFocus = async (page: Page, getByTestId: (testId: string) => Locator, testId: string) => {
  const element = getByTestId(testId);
  await page.evaluate(
    element => {
      (element as HTMLElement).click();
    },
    await element.elementHandle(),
  );
};

export const scrollWindow = async (page: Page, x: number, y: number) => {
  await page.evaluate(
    ({ xPos, yPos }: { xPos: number; yPos: number }) => {
      window.scrollTo(xPos, yPos);
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
  const popover = getByTestId(popoverId);

  if (enabled) {
    await clickWithoutFocus(page, getByTestId, targetId);
    await expect(popover, `Element "${popoverId}" should be open by click`).toBeVisible();
    await clickWithoutFocus(page, getByTestId, targetId);
    await expect(popover, `Element "${popoverId}" is not closed by click`).not.toBeVisible();
  } else {
    await clickWithoutFocus(page, getByTestId, targetId);
    await expect(popover, `Element "${popoverId}" shouldn't be open by click`).not.toBeVisible();
  }
};

export const verifyClickWithFocusTrigger = async ({
  getByTestId,
  targetId,
  popoverId,
}: {
  getByTestId: (testId: string) => Locator;
  targetId: string;
  popoverId: string;
}) => {
  const target = getByTestId(targetId);
  const popover = getByTestId(popoverId);
  const activityRemovalItem = getByTestId('activity-removal');

  await target.click();
  await expect(popover, `Element "${popoverId}" should be open by click with focus`).toBeVisible();
  await activityRemovalItem.click();
  await expect(popover, `Element "${popoverId}" is not closed by click with focus`).not.toBeVisible();
};

export const verifyHoverTrigger = async ({
  getByTestId,
  targetId,
  popoverId,
  enabled,
}: {
  getByTestId: (testId: string) => Locator;
  targetId: string;
  popoverId: string;
  enabled?: boolean;
}) => {
  const target = getByTestId(targetId);
  const popover = getByTestId(popoverId);
  const activityRemovalItem = getByTestId('activity-removal');

  if (enabled) {
    await target.hover();
    await expect(popover, `Element "${popoverId}" should be open by hover`).toBeVisible();
    await activityRemovalItem.click();
    await expect(popover, `Element "${popoverId}" is not closed by removing hover`).not.toBeVisible();
  } else {
    await target.hover();
    await expect(popover, `Element "${popoverId}" shouldn't be open by hover`).not.toBeVisible();
  }
};

export const verifyFocusTrigger = async ({
  getByTestId,
  targetId,
  popoverId,
  enabled,
}: {
  getByTestId: (testId: string) => Locator;
  targetId: string;
  popoverId: string;
  enabled?: boolean;
}) => {
  const popover = getByTestId(popoverId);
  const activityRemovalItem = getByTestId('activity-removal');

  if (enabled) {
    await focus(getByTestId, targetId);
    await expect(popover, `Element "${popoverId}" should be open by focus`).toBeVisible();
    await activityRemovalItem.click();
    await expect(popover, `Element "${popoverId}" is not closed by removing focus`).not.toBeVisible();
  } else {
    await focus(getByTestId, targetId);
    await expect(popover, `Element "${popoverId}" shouldn't be open by focus`).not.toBeVisible();
  }
};
