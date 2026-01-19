import { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { MODE, TEST_IDS as componentsTestIDs } from '../src/constants';

const TEST_IDS = {
  ...componentsTestIDs,
  buttonControlled: 'drawer-controlled',
  main: 'drawer-test',
  buttonToOpenWithImage: 'open-drawer-image',
  drawerWithImage: 'drawer-image',
};

const MOCK_DATA = {
  title: 'test title',
  subtitle: 'test subtitle',
  content: 'test content',
};

const NESTED_DRAWER = {
  id: 'nested drawer',
  openButton: 'open nested',
  approveButtonLabel: 'close nested',
};

function getScrollableElement(getByTestId: (testId: string) => Locator) {
  // TODO: need to find solution to detect scrollable div not by classname
  return getByTestId(TEST_IDS.content).locator('[data-overlayscrollbars-contents]');
}

function getOverlayElement(page: Page) {
  // TODO: need to find solution to detect mask div not by classname
  return page.locator('.rc-drawer-mask');
}

test.describe('Drawer', () => {
  test("Opens correctly with proper title, subtitle and content. Position 'right' by default, Shouldn't have scroll", async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'drawer',
      props: {
        'data-test-id': TEST_IDS.main,
        open: false,
        title: MOCK_DATA.title,
        subtitle: MOCK_DATA.subtitle,
        content: MOCK_DATA.content,
      },
    });

    await getByTestId(TEST_IDS.buttonControlled).click();

    const drawer = getByTestId(TEST_IDS.main);
    await expect(drawer).toBeVisible();

    const rightValue = await drawer.evaluate(el => getComputedStyle(el).right);
    await expect(rightValue).toEqual('0px');

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.subtitle)).toHaveText(MOCK_DATA.subtitle);
    await expect(getByTestId(TEST_IDS.content)).toHaveText(MOCK_DATA.content);

    const content = getScrollableElement(getByTestId);

    await page.mouse.wheel(0, 1000);
    const scrollTop = await content.evaluate(el => el.scrollTop);
    await expect(scrollTop).toEqual(0);
  });

  test('Should open with "left" position, with image, without subtitle. And only ApproveButton exists', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'drawer',
      props: {
        'data-test-id': TEST_IDS.main,
        open: false,
        subtitle: '',
        cancelButton: '!null',
        additionalButton: '!null',
        position: 'left',
      },
    });

    await getByTestId(TEST_IDS.buttonToOpenWithImage).click();

    const drawer = getByTestId(TEST_IDS.drawerWithImage);

    await expect(drawer).toBeVisible();

    const leftValue = await drawer.evaluate(el => getComputedStyle(el).left);
    await expect(leftValue).toEqual('0px');

    await expect(getByTestId(TEST_IDS.subtitle)).not.toBeVisible();

    await expect(getByTestId(TEST_IDS.image)).toBeVisible();

    await expect(getByTestId(TEST_IDS.cancelButton)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.additionalButton)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.approveButton)).toBeVisible();
  });

  test('Closes by click on overlay/close-button and on Esc press for Regular drawer', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'drawer',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        mode: MODE.Regular,
      },
    });

    const overlay = getOverlayElement(page);
    await overlay.click();
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();

    await getByTestId(TEST_IDS.buttonControlled).click();
    await getByTestId(TEST_IDS.closeButton).click();
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();

    await getByTestId(TEST_IDS.buttonControlled).click();
    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();
  });

  test(`Overlay shouldn't exist in "Soft" mode and Esc closes modal`, async ({
    page,
    gotoStory,
    getByTestId,
  }, testInfo) => {
    await gotoStory({
      name: 'drawer',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        mode: MODE.Soft,
      },
    });

    const closeBtn = getByTestId(TEST_IDS.closeButton);
    const browserName = testInfo.project.name || '';

    if (browserName === 'firefox') {
      // Close watcher is not working in Firefox
      await expect(closeBtn).toBeVisible();
    } else {
      await expect(closeBtn).toBeVisible();
      const overlay = getOverlayElement(page);
      await expect(overlay).not.toBeAttached();
      await page.keyboard.press('Escape');
      await expect(getByTestId(TEST_IDS.main)).not.toBeVisible({ timeout: 1000 });
    }
  });

  test('Should scroll long content', async ({ gotoStory, getByTestId, scrollBy, getScrollTop }) => {
    await gotoStory({
      name: 'drawer',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
      },
    });
    const content = getScrollableElement(getByTestId);

    await expect(content).toBeVisible();

    await scrollBy(content, { top: 100, behavior: 'auto' });

    await expect(getScrollTop(content)).not.toEqual(0);
  });

  test('Footer buttons(Approve, Cancel, Additional) exists with proper text and executes callbacks', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'drawer',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
      },
    });
    // approve button
    const approveButton = getByTestId(TEST_IDS.approveButton);
    await expect(approveButton).toContainText('Primary');

    await approveButton.click();
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();

    // cancel button
    await getByTestId(TEST_IDS.buttonControlled).click();

    const cancelButton = getByTestId(TEST_IDS.cancelButton);
    await expect(cancelButton).toContainText('Secondary');

    await cancelButton.click();
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();

    // additional button
    await getByTestId(TEST_IDS.buttonControlled).click();

    const additionalButton = getByTestId(TEST_IDS.additionalButton);
    await expect(additionalButton).toContainText(NESTED_DRAWER.openButton);
  });

  test("Footer shouldn't exist", async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'drawer',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        approveButton: '!null',
        cancelButton: '!null',
        additionalButton: '!null',
      },
    });

    const drawer = getByTestId(TEST_IDS.main);
    const footer = drawer.locator(`[data-test-id="${TEST_IDS.footer}"]`);

    await expect(footer).not.toBeVisible();
  });

  test('Opens nested drawer, content is proper. Closes nested but keeps opened parent drawer', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'drawer',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
      },
    });
    const additionalButton = getByTestId(TEST_IDS.additionalButton);

    await additionalButton.click();

    const nestedDrawer = getByTestId(NESTED_DRAWER.id);

    await expect(nestedDrawer).toBeVisible();

    await expect(nestedDrawer.locator(`[data-test-id="${TEST_IDS.title}"]`)).toHaveText(NESTED_DRAWER.id);
    await expect(nestedDrawer.locator(`[data-test-id="${TEST_IDS.content}"]`)).toHaveText(NESTED_DRAWER.id);

    await nestedDrawer.locator(`[data-test-id="${TEST_IDS.closeButton}"]`).click();

    await expect(nestedDrawer).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();
  });
});
