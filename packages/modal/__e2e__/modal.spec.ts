import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { MODE, TEST_IDS as componentsTestIDs } from '../src/constants';

const TEST_IDS = {
  ...componentsTestIDs,
  buttonControlled: 'modal-controlled',
  main: 'modal-test',
  customLoaderState: 'modal__custom-loader',
};

const MOCK_DATA = {
  title: 'test title',
  subtitle: 'test subtitle',
  content: 'test content',
  disclaimer: {
    text: 'disclaimerText',
    link: {
      text: 'link',
      href: '#testHref',
    },
  },
};

function getScrollableElement(getByTestId: (testId: string) => Locator) {
  // TODO: need to find solution to detect scrollable div not by classname
  return getByTestId(TEST_IDS.content).locator('[data-overlayscrollbars-contents]');
}

test.describe('Modal', () => {
  test("Opens correctly with proper title, subtitle, content and disclaimer. Shouldn't have scroll", async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      props: {
        'data-test-id': TEST_IDS.main,
        open: false,
        title: MOCK_DATA.title,
        subtitle: MOCK_DATA.subtitle,
        content: MOCK_DATA.content,
        disclaimer: MOCK_DATA.disclaimer,
      },
    });

    await getByTestId(TEST_IDS.buttonControlled).click();
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.subtitle)).toHaveText(MOCK_DATA.subtitle);
    await expect(getByTestId(TEST_IDS.content)).toHaveText(MOCK_DATA.content);

    await expect(getByTestId(TEST_IDS.disclaimerText)).toBeVisible();
    await expect(getByTestId(TEST_IDS.disclaimerLink)).toBeVisible();

    const content = getScrollableElement(getByTestId);

    await page.mouse.wheel(0, 1000);
    const scrollTop = await content.evaluate(el => el.scrollTop);
    await expect(scrollTop).toBe(0);
  });

  test('Should render without subtitle, content and disclaimer. And only ApproveButton exists', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        subtitle: '',
        content: '',
        disclaimer: null,
        cancelButton: null,
        additionalButton: null,
      },
    });
    await expect(getByTestId(TEST_IDS.subtitle)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.content)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.disclaimer)).not.toBeVisible();

    await expect(getByTestId(TEST_IDS.cancelButton)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.additionalButton)).not.toBeVisible();
  });

  test('Closes by click on overlay/close-button for Regular modal', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'modal',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        mode: MODE.Regular,
      },
    });
    await getByTestId(TEST_IDS.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();

    await getByTestId(TEST_IDS.buttonControlled).click();
    await getByTestId(TEST_IDS.closeButton).click();
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();
  });

  test(`Shouldn't close by click on overlay for Aggressive modal and close button exists`, async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        mode: MODE.Aggressive,
      },
    });
    const closeBtn = getByTestId(TEST_IDS.closeButton);
    await expect(closeBtn).toBeVisible();

    await getByTestId(TEST_IDS.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();
  });

  test(`Shouldn't close by click on overlay for Forced modal and close button shouldn't exist`, async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        mode: MODE.Forced,
      },
    });
    const closeBtn = getByTestId(TEST_IDS.closeButton);
    await expect(closeBtn).not.toBeVisible();

    await getByTestId(TEST_IDS.overlay).click({ position: { x: 5, y: 5 } });
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();
  });

  test('Should scroll long content', async ({ gotoStory, getByTestId, scrollBy, getScrollTop }) => {
    await gotoStory({
      name: 'modal',
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

  test('Footer buttons(Approve, Cancel, Additional) exists with proper text and executes callbacks buttons', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'modal',
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
    await expect(additionalButton).toContainText('Tertiary');

    await additionalButton.click();
    await expect(getByTestId(TEST_IDS.main)).not.toBeVisible();
  });

  test('Should display only header and loader spinner in loading state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'modal',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        loading: true,
        title: MOCK_DATA.title,
        subtitle: MOCK_DATA.subtitle,
        content: MOCK_DATA.content,
        disclaimer: MOCK_DATA.disclaimer,
      },
    });
    await expect(getByTestId(TEST_IDS.loadingSpinner)).toBeVisible();

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.subtitle)).toHaveText(MOCK_DATA.subtitle);

    await expect(getByTestId(TEST_IDS.content)).not.toHaveText(MOCK_DATA.content);

    await expect(getByTestId(TEST_IDS.disclaimerText)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.disclaimerLink)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.cancelButton)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.additionalButton)).not.toBeVisible();
  });

  test('Should display only header and custom loader state in loading state', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'modal',
      props: {
        'data-test-id': TEST_IDS.main,
        open: true,
        loading: true,
        customLoadingState: true,
        title: MOCK_DATA.title,
        subtitle: MOCK_DATA.subtitle,
        content: MOCK_DATA.content,
        disclaimer: MOCK_DATA.disclaimer,
      },
    });
    await expect(getByTestId(TEST_IDS.customLoaderState)).toBeVisible();

    await expect(getByTestId(TEST_IDS.title)).toHaveText(MOCK_DATA.title);
    await expect(getByTestId(TEST_IDS.subtitle)).toHaveText(MOCK_DATA.subtitle);

    await expect(getByTestId(TEST_IDS.content)).not.toHaveText(MOCK_DATA.content);

    await expect(getByTestId(TEST_IDS.loadingSpinner)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.disclaimerText)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.disclaimerLink)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.cancelButton)).not.toBeVisible();
    await expect(getByTestId(TEST_IDS.additionalButton)).not.toBeVisible();
  });
});
