import { expect as playwrightExpect, Locator, test as base } from '@playwright/test';

import { dataTestIdSelector, getStorybookUrl, StorybookUrlOptions } from './utils';

type DragOptions = {
  targetPosition?: { x: number; y: number };
  target?: Locator;
  steps?: number;
};

type PlaywrightFixtures = {
  gotoStory(options: StorybookUrlOptions): Promise<void>;
  getByTestId(testId: string): Locator;
  scrollBy(locator: Locator, options?: { top?: number; left?: number; behavior?: ScrollBehavior }): Promise<void>;
  getScrollTop(locator: Locator): Promise<number>;
  waitForNavigation(expectedPath: string, options?: { timeout?: number }): Promise<void>;
  dragTo(locator: Locator, options?: DragOptions): Promise<void>;
};

export const test = base.extend<PlaywrightFixtures>({
  gotoStory: async ({ page }, customUse) => {
    await customUse(async (options: StorybookUrlOptions) => {
      const url = getStorybookUrl(options);
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      await page.waitForLoadState('load');

      const storybookLoaderLocator = page.locator('.sb-preparing-story .sb-loader');
      await playwrightExpect(storybookLoaderLocator).toBeHidden({ timeout: 10000 });

      const errorMessage = page.locator("text=/Couldn't find story|Unable to find story|Story not found/i");
      const errorVisible = await errorMessage.isVisible().catch(() => false);
      if (errorVisible) {
        throw new Error(`Story not found: ${url}`);
      }

      await playwrightExpect(page.locator('#story-root')).toBeAttached({ timeout: 15000 });
    });
  },
  getByTestId: async ({ page }, customUse) => {
    await customUse((testId: string) => page.locator(dataTestIdSelector(testId)));
  },
  // eslint-disable-next-line no-empty-pattern
  scrollBy: async ({}, customUse) => {
    await customUse(async (locator: Locator, options?: { top?: number; left?: number; behavior?: ScrollBehavior }) => {
      const isScrollable = await locator.evaluate(el => el.scrollHeight > el.clientHeight);

      if (!isScrollable) {
        throw new Error('Content is not scrollable - scrollHeight should be greater than clientHeight');
      }

      await locator.evaluate((el, opts) => {
        el.scrollBy({ top: opts?.top ?? 0, left: opts?.left ?? 0, behavior: opts?.behavior ?? 'auto' });
      }, options);
    });
  },
  // eslint-disable-next-line no-empty-pattern
  getScrollTop: async ({}, customUse) => {
    await customUse(async (locator: Locator) => await locator.evaluate(el => el.scrollTop));
  },
  waitForNavigation: async ({ page }, customUse) => {
    await customUse(async (expectedPath: string, options?: { timeout?: number }) => {
      await page
        .waitForFunction(
          (path: string) => {
            const url = window.location.pathname + window.location.search + window.location.hash;
            return url.includes(path);
          },
          expectedPath,
          { timeout: options?.timeout ?? 5000 },
        )
        .catch(() => {});
    });
  },
  dragTo: async ({ page }, customUse) => {
    await customUse(async (locator: Locator, options?: DragOptions) => {
      const elementBox = await locator.boundingBox();
      if (!elementBox) {
        throw new Error('Element is not visible or has no bounding box');
      }

      const startX = elementBox.x + elementBox.width / 2;
      const startY = elementBox.y + elementBox.height / 2;

      let endX: number;
      let endY: number;

      if (options?.target) {
        const targetBox = await options.target.boundingBox();
        if (!targetBox) {
          throw new Error('Target element is not visible or has no bounding box');
        }
        endX = targetBox.x + targetBox.width / 2;
        endY = targetBox.y + targetBox.height / 2;
      } else if (options?.targetPosition) {
        endX = startX + options.targetPosition.x;
        endY = startY + options.targetPosition.y;
      } else {
        throw new Error('Either target or targetPosition must be provided');
      }

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, endY, { steps: options?.steps ?? 10 });
      await page.mouse.up();
    });
  },
});

export { expect, type Locator, type Page } from '@playwright/test';
