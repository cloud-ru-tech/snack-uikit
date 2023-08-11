import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Appearance, TEST_IDS as componentsTestIDs } from '../src/constants';

const TEST_IDS = {
  ...componentsTestIDs,
  buttonControlled: `open-modal controlled`,
  main: 'modal-test',
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

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    name: 'modal',
    props: {
      'data-test-id': TEST_IDS.main,
      open: true,
      ...props,
    },
  });
}

function getScrollableElement() {
  // TODO: need to find solution to detect scrollable div not by classname
  return Selector(dataTestIdSelector(TEST_IDS.content)).find('.os-viewport');
}

fixture('Modal').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

test.page(
  getPage({
    open: false,
    title: MOCK_DATA.title,
    subtitle: MOCK_DATA.subtitle,
    content: MOCK_DATA.content,
    disclaimer: MOCK_DATA.disclaimer,
  }),
)("Opens correctly with proper title, subtitle, content and disclaimer. Shouldn't have scroll", async t => {
  await t
    .click(Selector(dataTestIdSelector(TEST_IDS.buttonControlled)))
    .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
    .ok('Failed to open modal');

  await t.expect(Selector(dataTestIdSelector(TEST_IDS.title)).textContent).eql(MOCK_DATA.title);
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.subtitle)).textContent).eql(MOCK_DATA.subtitle);
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.content)).textContent).eql(MOCK_DATA.content);

  await t.expect(Selector(dataTestIdSelector(TEST_IDS.disclaimerText)).exists).ok();
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.disclaimerLink)).exists).ok();

  const content = getScrollableElement();

  await t.scroll(content, 'bottom');
  await t.expect(content.scrollTop).eql(0);
});

test.page(
  getPage({
    open: true,
    subtitle: '',
    content: '',
    disclaimer: '!null',
    cancelButton: '!null',
    additionalButton: '!null',
  }),
)('Should render without subtitle, content and disclaimer. And only ApproveButton exists', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.subtitle)).exists).notOk();
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.content)).exists).notOk();
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.disclaimer)).exists).notOk();

  await t.expect(Selector(dataTestIdSelector(TEST_IDS.cancelButton)).exists).notOk();
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.additionalButton)).exists).notOk();
});

test.page(getPage({ appearance: Appearance.Regular }))(
  'Closes by click on overlay/close-button for Regular modal',
  async t => {
    await t
      .click(Selector(dataTestIdSelector(TEST_IDS.overlay)))
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .notOk();

    await t
      .click(Selector(dataTestIdSelector(TEST_IDS.buttonControlled)))
      .click(Selector(dataTestIdSelector(TEST_IDS.closeButton)))
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .notOk();
  },
);

test.page(getPage({ appearance: Appearance.Aggressive }))(
  `Shouldn't close by click on overlay for Aggressive modal and close button exists`,
  async t => {
    const closeBtn = Selector(dataTestIdSelector(TEST_IDS.closeButton));
    await t.expect(closeBtn.exists).ok();

    await t
      .click(Selector(dataTestIdSelector(TEST_IDS.overlay)))
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .ok();
  },
);

test.page(getPage({ appearance: Appearance.Forced }))(
  `Shouldn't close by click on overlay for Forced modal and close button shouldn't exist`,
  async t => {
    const closeBtn = Selector(dataTestIdSelector(TEST_IDS.closeButton));
    await t.expect(closeBtn.exists).notOk();

    await t
      .click(Selector(dataTestIdSelector(TEST_IDS.overlay)))
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .ok();
  },
);

test.page(getPage())('Should scroll long content', async t => {
  const content = getScrollableElement();

  await t.expect(content.exists).ok();

  await t.scroll(content, 'bottom');
  await t.expect(content.scrollTop).notEql(0);
});

test.page(getPage())(
  'Footer buttons(Approve, Cancel, Additional) exists with proper text and executes callbacks buttons',
  async t => {
    // approve button
    const approveButton = Selector(dataTestIdSelector(TEST_IDS.approveButton));
    await t.expect(approveButton.innerText).contains('Primary');

    await t
      .click(approveButton)
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .notOk();

    // cancel button
    await t.click(Selector(dataTestIdSelector(TEST_IDS.buttonControlled)));

    const cancelButton = Selector(dataTestIdSelector(TEST_IDS.cancelButton));
    await t.expect(cancelButton.innerText).contains('Secondary');

    await t
      .click(cancelButton)
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .notOk();

    // additional button
    await t.click(Selector(dataTestIdSelector(TEST_IDS.buttonControlled)));

    const additionalButton = Selector(dataTestIdSelector(TEST_IDS.additionalButton));
    await t.expect(additionalButton.innerText).contains('Tertiary');

    await t
      .click(additionalButton)
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .notOk();
  },
);
