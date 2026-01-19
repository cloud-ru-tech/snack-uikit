import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { NOTIFICATION_PANEL_PROPS_MOCK, STORY_TEST_IDS } from '../stories/constants';
import { SELECTORS } from './helpers';

const PROPS_MOCK = {
  ...NOTIFICATION_PANEL_PROPS_MOCK,
  skeletonsAmount: 4,
};

test.describe('NotificationPanel', () => {
  function getScrollableElement(getByTestId: (testId: string) => Locator) {
    // TODO: need to find solution to detect scrollable div not by classname
    return getByTestId(STORY_TEST_IDS.panel).locator('[data-overlayscrollbars-contents]');
  }

  test('Renders correctly with proper amount of card, scroll is working', async ({
    gotoStory,
    getByTestId,
    scrollBy,
    getScrollTop,
  }) => {
    await gotoStory({
      name: 'notification',
      story: 'notification-panel',
      props: {
        'data-test-id': STORY_TEST_IDS.panel,
        ...PROPS_MOCK,
      },
    });
    const { panel, panelTitle, footerButton, readAllButton } = SELECTORS.getPanel(getByTestId);
    const { card } = SELECTORS.getCard(getByTestId);

    await expect(panel, 'NotificationPanel not exists').toBeVisible();

    await expect(panelTitle, 'NotificationPanel title not exists').toBeVisible();
    await expect(panelTitle).toHaveText(PROPS_MOCK.title);

    await expect(footerButton, 'footerButton not exists').toBeVisible();
    await expect(footerButton).toHaveText(PROPS_MOCK.footerButton.label);

    await expect(readAllButton, 'readAllButton not exists').toBeVisible();
    await expect(readAllButton).toHaveText(PROPS_MOCK.readAllButton.label);

    await expect(card).toHaveCount(PROPS_MOCK.amount);

    const content = getScrollableElement(getByTestId);

    const scrollTop = await getScrollTop(content);
    await expect(scrollTop).toEqual(0);

    await scrollBy(content, { top: 100, behavior: 'auto' });

    await expect(getScrollTop(content)).not.toEqual(0);
  });

  test('Renders opened with skeletons, disabled readAllButton, but settings button is still working and opens droplist', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'notification',
      story: 'notification-panel',
      props: {
        'data-test-id': STORY_TEST_IDS.panel,
        ...PROPS_MOCK,
        amount: 0,
        loading: true,
      },
    });
    const { panel, skeleton, segments, settings } = SELECTORS.getPanel(getByTestId);
    const { card } = SELECTORS.getCard(getByTestId);

    await expect(panel, 'NotificationPanel not exists').toBeVisible();

    await expect(card, 'Should be without cards').not.toBeVisible();

    await expect(skeleton).toHaveCount(PROPS_MOCK.skeletonsAmount);

    await expect(segments, 'No segments rendered').toBeVisible();

    await expect(settings.droplistTrigger, 'Settings button not exists').toBeVisible();

    await settings.droplistTrigger.click();

    await expect(settings.droplist, 'Settings droplist not opened').toBeVisible();
    await expect(settings.droplistAction.first(), 'No actions found in settings droplist').toBeVisible();

    await settings.droplistAction.first().click();

    await expect(settings.droplist, 'Droplist should close after click on action').not.toBeVisible();
    await expect(
      getByTestId(STORY_TEST_IDS.toaster),
      'Toaster is not opened after click on settings action',
    ).toBeVisible();
  });

  test('Renders only with title and blank instead of cards', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'notification',
      story: 'notification-panel',
      props: {
        'data-test-id': STORY_TEST_IDS.panel,
        amount: 0,
        footerButton: '!undefined',
        readAllButton: '!undefined',
        settings: '!undefined',
        segments: '!undefined',
      },
    });
    const { panel, segments, settings, footerButton, readAllButton, blank } = SELECTORS.getPanel(getByTestId);
    const { card } = SELECTORS.getCard(getByTestId);

    await expect(panel, 'NotificationPanel is not opened').toBeVisible();

    await expect(card, 'Should be without cards').not.toBeVisible();
    await expect(segments, 'Segments should not exist').not.toBeVisible();
    await expect(footerButton, 'footerButton should not exits').not.toBeVisible();
    await expect(readAllButton, 'readAllButton should not exits').not.toBeVisible();
    await expect(settings.droplistTrigger, 'Settings button not exists').not.toBeVisible();

    await expect(blank, 'Blank not exists').toBeVisible();
  });
});
