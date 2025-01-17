import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { NOTIFICATION_CARD_MOCK, STORY_TEST_IDS } from '../stories/constants';
import { SELECTORS } from './helpers';

function getErrorMessages(prop: string) {
  return {
    exists: `${prop} not exists`,
    notExists: `${prop} should not exists`,
    eql: `${prop} not matched passed value`,
  };
}

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    name: 'notification',
    story: 'notification-card',
    props: {
      'data-test-id': STORY_TEST_IDS.card,
      ...props,
    },
  });
}

fixture('NotificationCard');

test.page(getPage(NOTIFICATION_CARD_MOCK))('Renders correctly with passed props and full functionality', async t => {
  const { card, title, label, content, date, link, actions, primaryButton, secondaryButton } = SELECTORS.getCard();

  await t.expect(card.exists).ok('NotificationCard is not rendered');

  const titleErrors = getErrorMessages('title');
  await t.expect(title.exists).ok(titleErrors.exists);
  await t.expect(title.textContent).eql(NOTIFICATION_CARD_MOCK.title, titleErrors.eql);

  const labelErrors = getErrorMessages('label');
  await t.expect(label.exists).ok(labelErrors.exists);
  await t.expect(label.textContent).eql(NOTIFICATION_CARD_MOCK.label, labelErrors.eql);

  const contentErrors = getErrorMessages('content');
  await t.expect(content.exists).ok(contentErrors.exists);
  await t.expect(content.textContent).eql(NOTIFICATION_CARD_MOCK.content, contentErrors.eql);

  const dateErrors = getErrorMessages('date');
  await t.expect(date.exists).ok(dateErrors.exists);
  await t.expect(date.textContent).eql(NOTIFICATION_CARD_MOCK.date, dateErrors.eql);

  const linkErrors = getErrorMessages('link');
  await t.expect(link.exists).ok(linkErrors.exists);
  await t.expect(link.textContent).eql(NOTIFICATION_CARD_MOCK.link.text, linkErrors.eql);
  await t.expect(link.getAttribute('href')).eql(NOTIFICATION_CARD_MOCK.link.href, getErrorMessages('link href').eql);

  // actions checks
  // workaround to place focus in the beginning, because of some issues in Testcafe
  await t.click(Selector('body'), { offsetX: 0, offsetY: 0 });
  await t.expect(actions.droplistTrigger.exists).ok(getErrorMessages('actions droplist trigger').exists);

  const cardActionsWrapperOpacityBeforeHover = (await actions.wrapper.style).opacity;
  await t.expect(cardActionsWrapperOpacityBeforeHover).eql('0', 'actions droplist trigger should not be visible');

  await t.hover(card);

  const cardActionsWrapperOpacityAfterHover = (await actions.wrapper.style).opacity;
  await t.expect(cardActionsWrapperOpacityAfterHover).eql('1', 'actions droplist trigger should be visible');

  await t.click(actions.droplistTrigger);

  await t.expect(actions.droplist.exists).ok(getErrorMessages('actions droplist').exists);
  await t.expect(actions.droplistAction.exists).ok(getErrorMessages('actions droplist item').exists);

  await t.click(actions.droplistAction);

  await t.expect(actions.droplist.exists).notOk('Droplist should close after click on action');
  await t
    .expect(Selector(dataTestIdSelector(STORY_TEST_IDS.toaster)).exists)
    .ok('Toaster is not opened after click on action');

  await t.expect(primaryButton.exists).ok('Primary button should exist');
  await t.expect(secondaryButton.exists).ok('Secondary button should exist');
});

test.page(
  getPage({
    title: NOTIFICATION_CARD_MOCK.title,
    label: '!undefined',
    link: '!undefined',
    actions: '!undefined',
    showButtons: false,
  }),
)('Renders only with Title, Content and Date', async t => {
  const { title, label, link, actions, primaryButton, secondaryButton } = SELECTORS.getCard();

  const titleErrors = getErrorMessages('title');
  await t.expect(title.exists).ok(titleErrors.exists);
  await t.expect(title.textContent).eql(NOTIFICATION_CARD_MOCK.title, titleErrors.eql);

  await t.expect(label.exists).notOk(getErrorMessages('label').notExists);

  await t.expect(link.exists).notOk(getErrorMessages('link').notExists);

  await t.expect(actions.wrapper.exists).notOk(getErrorMessages('card function').notExists);

  await t.expect(primaryButton.exists).notOk(getErrorMessages('Primary button').notExists);
  await t.expect(secondaryButton.exists).notOk(getErrorMessages('Secondary button').notExists);
});
