import type { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'tabs';

async function isInViewport(page: Page, selector: Locator) {
  const elementHandle = await selector.elementHandle();
  if (!elementHandle) {
    return false;
  }
  return await page.evaluate((element: Element) => {
    const clientRect = element.getBoundingClientRect();

    return (
      clientRect.top >= 0 &&
      clientRect.left >= 0 &&
      clientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      clientRect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, elementHandle);
}

function getActive(page: Page) {
  return page.locator(':focus');
}

test.describe('Tabs', () => {
  test('renders correctly', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tabs',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    await expect(getByTestId(TEST_ID)).toBeVisible();
    await expect(getByTestId('tabs__tab-tab1')).toBeVisible();
    await expect(getByTestId('tabs__tab-content-tab1')).toBeVisible();
    await expect(getByTestId('tabs__tab-counter-tab1')).toBeVisible();
    await expect(getByTestId('tabs__scroll-button-right')).toBeVisible();
    await expect(getByTestId('tabs__scroll-button-left')).not.toBeVisible();
    await expect(getByTestId('tabs__bar__after')).not.toBeVisible();
  });

  test('syncs selected tab with content', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tabs',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const tabButton = getByTestId('tabs__tab-tab2');
    const content = getByTestId('tabs__tab-content-tab2');

    await expect(page.locator('[data-test-id="tabs__tab-tab2"][data-selected="true"]')).not.toBeVisible();
    await expect(content).not.toBeVisible();
    await tabButton.click();
    await expect(page.locator('[data-test-id="tabs__tab-tab2"][data-selected="true"]')).toBeVisible();
    await expect(content).toBeVisible();
  });

  test('prevents disabled tab selection', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tabs',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const content = getByTestId('tabs__tab-content-tab1');
    const disabledTabButton = getByTestId('tabs__tab-tab3');
    const disabledContent = getByTestId('tabs__tab-content-tab3');

    await expect(page.locator('[data-test-id="tabs__tab-tab1"][data-selected="true"]')).toBeVisible();
    await expect(content).toBeVisible();
    await expect(page.locator('[data-test-id="tabs__tab-tab3"][data-selected="true"]')).not.toBeVisible();
    await expect(disabledContent).not.toBeVisible();
    await expect(page.locator('[data-test-id="tabs__tab-tab3"][data-disabled="true"]')).toBeVisible();
    await disabledTabButton.click({ force: true });
    await expect(page.locator('[data-test-id="tabs__tab-tab1"][data-selected="true"]')).toBeVisible();
    await expect(content).toBeVisible();
    await expect(page.locator('[data-test-id="tabs__tab-tab3"][data-selected="true"]')).not.toBeVisible();
    await expect(disabledContent).not.toBeVisible();
  });

  for (const key of ['Enter', 'Space']) {
    test(`selects focused tab via "${key}" keydown`, async ({ page, gotoStory, getByTestId }) => {
      await gotoStory({
        name: 'tabs',
        props: {
          'data-test-id': TEST_ID,
        },
      });

      const content1 = getByTestId('tabs__tab-content-tab1');
      const content2 = getByTestId('tabs__tab-content-tab2');

      await expect(page.locator('[data-test-id="tabs__tab-tab1"][data-selected="true"]')).toBeVisible();
      await expect(content1).toBeVisible();
      await expect(page.locator('[data-test-id="tabs__tab-tab2"][data-selected="true"]')).not.toBeVisible();
      await expect(content2).not.toBeVisible();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await getActive(page).press(key);
      await expect(page.locator('[data-test-id="tabs__tab-tab1"][data-selected="true"]')).not.toBeVisible();
      await expect(content1).not.toBeVisible();
      await expect(page.locator('[data-test-id="tabs__tab-tab2"][data-selected="true"]')).toBeVisible();
      await expect(content2).toBeVisible();
    });
  }

  test('does not select focused tab via letters keydown', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tabs',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const content1 = getByTestId('tabs__tab-content-tab1');
    const content2 = getByTestId('tabs__tab-content-tab2');

    await expect(page.locator('[data-test-id="tabs__tab-tab1"][data-selected="true"]')).toBeVisible();
    await expect(content1).toBeVisible();
    await expect(page.locator('[data-test-id="tabs__tab-tab2"][data-selected="true"]')).not.toBeVisible();
    await expect(content2).not.toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (const letter of letters) {
      await page.keyboard.press(letter);
    }
    await expect(page.locator('[data-test-id="tabs__tab-tab1"][data-selected="true"]')).toBeVisible();
    await expect(content1).toBeVisible();
    await expect(page.locator('[data-test-id="tabs__tab-tab2"][data-selected="true"]')).not.toBeVisible();
    await expect(content2).not.toBeVisible();
  });

  test('move tabs on mouse scroll', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tabs',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    await expect(getByTestId(TEST_ID)).toBeVisible();

    const tabButton1 = getByTestId('tabs__tab-tab1');
    const tabButton8 = getByTestId('tabs__tab-tab8');
    const tabButton15 = getByTestId('tabs__tab-tab15');

    expect(await isInViewport(page, tabButton1)).toBe(true);
    expect(await isInViewport(page, tabButton15)).toBe(false);

    await tabButton8.hover();
    await getByTestId('tabs__bar-wrap')
      .locator('div')
      .first()
      .evaluate(el => {
        el.scrollBy(700, 0);
      });

    expect(await isInViewport(page, tabButton1)).toBe(false);
    expect(await isInViewport(page, tabButton15)).toBe(true);
  });

  test('move tabs on drag', async ({ page, gotoStory, getByTestId, dragTo }) => {
    await gotoStory({
      name: 'tabs',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    await expect(getByTestId(TEST_ID)).toBeVisible();

    const tabButton1 = getByTestId('tabs__tab-tab1');
    const tabButton15 = getByTestId('tabs__tab-tab15');

    expect(await isInViewport(page, tabButton1)).toBe(true);
    expect(await isInViewport(page, tabButton15)).toBe(false);

    const scrollContainer = getByTestId('tabs__bar-wrap');
    await dragTo(scrollContainer, {
      targetPosition: { x: -700, y: 0 },
    });
    await page.waitForTimeout(300);

    expect(await isInViewport(page, tabButton1)).toBe(false);
    expect(await isInViewport(page, tabButton15)).toBe(true);
  });

  test('move tabs by arrows', async ({ page, browserName, gotoStory, getByTestId }) => {
    if (browserName === 'chromium') {
      console.info('Temporary skip unstable test for Chrome');
      return;
    }

    await gotoStory({
      name: 'tabs',
      props: {
        'data-test-id': TEST_ID,
      },
    });

    const tabButton1 = getByTestId('tabs__tab-tab1');
    const tabButton8 = getByTestId('tabs__tab-tab8');
    const tabButton16 = getByTestId('tabs__tab-tab16');

    await tabButton8.hover();
    await getByTestId('tabs__bar-wrap')
      .locator('div')
      .first()
      .evaluate(el => {
        el.scrollBy(200, 0);
      });
    await page.waitForTimeout(300);

    expect(await isInViewport(page, tabButton1)).toBe(false);
    expect(await isInViewport(page, tabButton16)).toBe(false);

    await getByTestId('tabs__scroll-button-right').click();
    await page.waitForTimeout(300);

    expect(await isInViewport(page, tabButton1)).toBe(false);
    expect(await isInViewport(page, tabButton16)).toBe(true);

    await getByTestId('tabs__scroll-button-left').click();
    await page.waitForTimeout(300);
    await getByTestId('tabs__scroll-button-left').click();
    await page.waitForTimeout(300);

    expect(await isInViewport(page, tabButton1)).toBe(true);
    expect(await isInViewport(page, tabButton16)).toBe(false);
  });

  test('Should render custom content in "after"', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tabs',
      props: {
        'data-test-id': TEST_ID,
        showAfter: true,
      },
    });

    await expect(getByTestId('tabs__bar__after')).toBeVisible();
  });
});
