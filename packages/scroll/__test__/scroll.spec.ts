import { Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  main: 'scroll-test',
  verticalScrollbar: '.os-scrollbar-vertical',
  horizontalScrollbar: '.os-scrollbar-horizontal',
  unusableScrollbar: '.os-scrollbar-unusable',
};

function getSelectors(page: Page) {
  return {
    verticalScrollbar: page.locator(TEST_IDS.verticalScrollbar),
    horizontalScrollbar: page.locator(TEST_IDS.horizontalScrollbar),
    unusableScrollbar: page.locator(TEST_IDS.unusableScrollbar),
    host: page.locator(`*[data-overlayscrollbars="host"]`),
    viewport: page.locator(`*[data-overlayscrollbars-contents]`),
  };
}

test.describe('Scroll', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'scroll',
      props: {
        'data-test-id': TEST_IDS.main,
      },
    });
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();
  });

  test('Has vertical and horizontal scrollbars', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'scroll',
      props: {
        'data-test-id': TEST_IDS.main,
      },
    });
    const { verticalScrollbar, horizontalScrollbar, unusableScrollbar } = getSelectors(page);
    await expect(verticalScrollbar).toBeAttached();
    await expect(horizontalScrollbar).toBeAttached();
    await expect(unusableScrollbar).not.toBeAttached();
  });

  test('Should hide horizontal scrollbar', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'scroll',
      props: {
        'data-test-id': TEST_IDS.main,
        storyCards: 1,
      },
    });
    const { verticalScrollbar, horizontalScrollbar } = getSelectors(page);

    await expect(verticalScrollbar).toBeAttached();
    await expect(horizontalScrollbar).toBeAttached();
    await expect(page.locator(TEST_IDS.verticalScrollbar + TEST_IDS.unusableScrollbar)).toBeAttached();
    await expect(page.locator(TEST_IDS.horizontalScrollbar + TEST_IDS.unusableScrollbar)).not.toBeAttached();
  });

  test('Should be scrolled to top on init', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'scroll',
      props: {
        'data-test-id': TEST_IDS.main,
      },
    });
    const { viewport } = getSelectors(page);

    const scrollTop = await viewport.evaluate(el => (el as HTMLElement).scrollTop);
    await expect(scrollTop).toBe(0);
  });

  test('Should be scrolled to bottom on init', async ({ page, gotoStory }) => {
    await gotoStory({
      name: 'scroll',
      props: {
        'data-test-id': TEST_IDS.main,
        autoscrollTo: 'bottom',
      },
    });
    const { viewport, host } = getSelectors(page);

    await expect(viewport).toBeVisible();

    const hostHeight = await host.evaluate(el => (el as HTMLElement).offsetHeight);
    const scrollHeight = await viewport.evaluate(el => (el as HTMLElement).scrollHeight);

    const scrollTop = await viewport.evaluate(el => (el as HTMLElement).scrollTop);
    const delta = scrollHeight - hostHeight;

    await expect(scrollTop).toBeGreaterThanOrEqual(delta - 2);
    await expect(scrollTop).toBeLessThanOrEqual(delta + 2);
  });
});
