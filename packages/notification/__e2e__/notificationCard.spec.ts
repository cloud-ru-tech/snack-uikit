import { expect, test } from '../../../playwright/fixtures';
import { NOTIFICATION_CARD_MOCK, STORY_TEST_IDS } from '../stories/constants';
import { SELECTORS } from './helpers';

function getErrorMessages(prop: string) {
  return {
    exists: `${prop} not exists`,
    notExists: `${prop} should not exists`,
    eql: `${prop} not matched passed value`,
  };
}

test.describe('NotificationCard', () => {
  test('Renders correctly with passed props and full functionality', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'notification',
      story: 'notification-card',
      props: {
        'data-test-id': STORY_TEST_IDS.card,
        ...NOTIFICATION_CARD_MOCK,
      },
    });
    const { card, title, label, content, date, link, actions, primaryButton, secondaryButton } =
      SELECTORS.getCard(getByTestId);

    await expect(card, 'NotificationCard is not rendered').toBeVisible();

    const titleErrors = getErrorMessages('title');
    await expect(title, titleErrors.exists).toBeVisible();
    await expect(title).toHaveText(NOTIFICATION_CARD_MOCK.title);

    const labelErrors = getErrorMessages('label');
    await expect(label, labelErrors.exists).toBeVisible();
    await expect(label).toHaveText(NOTIFICATION_CARD_MOCK.label);

    const contentErrors = getErrorMessages('content');
    await expect(content, contentErrors.exists).toBeVisible();
    await expect(content).toHaveText(NOTIFICATION_CARD_MOCK.content);

    const dateErrors = getErrorMessages('date');
    await expect(date, dateErrors.exists).toBeVisible();
    await expect(date).toHaveText(NOTIFICATION_CARD_MOCK.date);

    const linkErrors = getErrorMessages('link');
    await expect(link, linkErrors.exists).toBeVisible();
    await expect(link).toHaveText(NOTIFICATION_CARD_MOCK.link.text);
    await expect(link).toHaveAttribute('href', NOTIFICATION_CARD_MOCK.link.href);

    // actions checks
    // workaround to place focus in the beginning, because of some issues in Testcafe
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(actions.droplistTrigger, getErrorMessages('actions droplist trigger').exists).toBeVisible();

    const cardActionsWrapperOpacityBeforeHover = await actions.wrapper.evaluate(el => getComputedStyle(el).opacity);
    await expect(cardActionsWrapperOpacityBeforeHover, 'actions droplist trigger should not be visible').toEqual('0');

    await card.hover();

    const cardActionsWrapperOpacityAfterHover = await actions.wrapper.evaluate(el => getComputedStyle(el).opacity);
    await expect(cardActionsWrapperOpacityAfterHover, 'actions droplist trigger should be visible').toEqual('1');

    await actions.droplistTrigger.click();

    await expect(actions.droplist, getErrorMessages('actions droplist').exists).toBeVisible();
    await expect(actions.droplistAction.first(), getErrorMessages('actions droplist item').exists).toBeVisible();

    await actions.droplistAction.first().click();

    await expect(actions.droplist, 'Droplist should close after click on action').not.toBeVisible();
    await expect(getByTestId(STORY_TEST_IDS.toaster), 'Toaster is not opened after click on action').toBeVisible();

    await expect(primaryButton, 'Primary button should exist').toBeVisible();
    await expect(secondaryButton, 'Secondary button should exist').toBeVisible();
  });

  test('Renders only with Title, Content and Date', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'notification',
      story: 'notification-card',
      props: {
        'data-test-id': STORY_TEST_IDS.card,
        title: NOTIFICATION_CARD_MOCK.title,
        label: '!undefined',
        link: '!undefined',
        actions: '!undefined',
        showButtons: false,
      },
    });
    const { title, label, link, actions, primaryButton, secondaryButton } = SELECTORS.getCard(getByTestId);

    const titleErrors = getErrorMessages('title');
    await expect(title, titleErrors.exists).toBeVisible();
    await expect(title).toHaveText(NOTIFICATION_CARD_MOCK.title);

    await expect(label, getErrorMessages('label').notExists).not.toBeVisible();

    await expect(link, getErrorMessages('link').notExists).not.toBeVisible();

    await expect(actions.wrapper, getErrorMessages('card function').notExists).not.toBeVisible();

    await expect(primaryButton, getErrorMessages('Primary button').notExists).not.toBeVisible();
    await expect(secondaryButton, getErrorMessages('Secondary button').notExists).not.toBeVisible();
  });
});
