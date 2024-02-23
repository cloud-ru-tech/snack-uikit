import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { NOTIFICATION_PANEL_PROPS_MOCK, STORY_TEST_IDS } from '../stories/constants';
import { SELECTORS } from './helpers';

const PROPS_MOCK = {
  ...NOTIFICATION_PANEL_PROPS_MOCK,
  skeletonsAmount: 4,
};

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    name: 'notification',
    story: 'notification-panel',
    props: {
      'data-test-id': STORY_TEST_IDS.panel,
      ...props,
    },
  });
}

fixture('NotificationPanel').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

function getScrollableElement() {
  // TODO: need to find solution to detect scrollable div not by classname
  return Selector(dataTestIdSelector(STORY_TEST_IDS.panel)).find('.os-viewport');
}

test.page(getPage(PROPS_MOCK))('Renders correctly with proper amount of card, scroll is working', async t => {
  const { panel, panelTitle, footerButton, readAllButton } = SELECTORS.getPanel();
  const { card } = SELECTORS.getCard();

  await t.expect(panel.exists).ok('NotificationPanel not exists');

  await t.expect(panelTitle.exists).ok('NotificationPanel title not exists');
  await t.expect(panelTitle.textContent).eql(PROPS_MOCK.title, 'NotificationPanel title not exists');

  await t.expect(footerButton.exists).ok('footerButton not exists');
  await t.expect(footerButton.textContent).eql(PROPS_MOCK.footerButton.label, 'footerButton not exists');

  await t.expect(readAllButton.exists).ok('readAllButton not exists');
  await t.expect(readAllButton.textContent).eql(PROPS_MOCK.readAllButton.label, 'readAllButton not exists');

  await t.expect(card.count).eql(PROPS_MOCK.amount);

  const content = getScrollableElement();

  await t.expect(content.scrollTop).eql(0, 'Scroll should be in 0 position');

  await t.scroll(content, 'bottom');

  await t.expect(content.scrollTop).notEql(0);
});

test.page(getPage({ ...PROPS_MOCK, amount: 0, loading: true }))(
  'Renders opened with skeletons, disabled chips and readAllButton, but settings button is still working and opens droplist',
  async t => {
    const { panel, skeleton, chips, settings } = SELECTORS.getPanel();
    const { card } = SELECTORS.getCard();

    await t.expect(panel.exists).ok('NotificationPanel not exists');

    await t.expect(card.exists).notOk('Should be without cards');

    await t.expect(skeleton.count).eql(PROPS_MOCK.skeletonsAmount);

    await t.expect(chips.exists).ok('No chips rendered');
    await t.expect(chips.getAttribute('data-disabled')).eql('true', 'Chips is not disabled');

    await t.expect(settings.droplistTrigger.exists).ok('Settings button not exists');

    await t.click(settings.droplistTrigger);

    await t.expect(settings.droplist.exists).ok('Settings droplist not opened');
    await t.expect(settings.droplistAction.exists).ok('No actions found in settings droplist');

    await t.click(settings.droplistAction);

    await t.expect(settings.droplist.exists).notOk('Droplist should close after click on action');
    await t
      .expect(Selector(dataTestIdSelector(STORY_TEST_IDS.toaster)).exists)
      .ok('Toaster is not opened after click on settings action');
  },
);

test.page(
  getPage({
    amount: 0,
    footerButton: '!undefined',
    readAllButton: '!undefined',
    settings: '!undefined',
    chips: '!undefined',
  }),
)('Renders only with title and blank instead of cards', async t => {
  const { panel, chips, settings, footerButton, readAllButton, blank } = SELECTORS.getPanel();
  const { card } = SELECTORS.getCard();

  await t.expect(panel.exists).ok('NotificationPanel is not opened');

  await t.expect(card.exists).notOk('Should be without cards');
  await t.expect(chips.exists).notOk('chips should not exist');
  await t.expect(footerButton.exists).notOk('footerButton should not exits');
  await t.expect(readAllButton.exists).notOk('readAllButton should not exits');
  await t.expect(settings.droplistTrigger.exists).notOk('Settings button not exists');

  await t.expect(blank.exists).ok('Blank not exists');
});
