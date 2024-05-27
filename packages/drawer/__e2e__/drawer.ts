import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
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

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    name: 'drawer',
    props: {
      'data-test-id': TEST_IDS.main,
      open: true,
      ...props,
    },
  });
}

function getScrollableElement() {
  // TODO: need to find solution to detect scrollable div not by classname
  return Selector(dataTestIdSelector(TEST_IDS.content)).find('[data-overlayscrollbars-contents]');
}

function getOverlayElement() {
  // TODO: need to find solution to detect mask div not by classname
  return Selector(dataTestIdSelector(TEST_IDS.main)).prevSibling('.rc-drawer-mask');
}

fixture('Drawer').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

test.page(
  getPage({
    open: false,
    title: MOCK_DATA.title,
    subtitle: MOCK_DATA.subtitle,
    content: MOCK_DATA.content,
  }),
)(
  "Opens correctly with proper title, subtitle and content. Position 'right' by default, Shouldn't have scroll",
  async t => {
    await t.click(Selector(dataTestIdSelector(TEST_IDS.buttonControlled)));

    const drawer = Selector(dataTestIdSelector(TEST_IDS.main));
    await t.expect(drawer.exists).ok('Failed to open drawer');

    await t.expect(drawer.getStyleProperty('right')).eql('0px');

    await t.expect(Selector(dataTestIdSelector(TEST_IDS.title)).textContent).eql(MOCK_DATA.title);
    await t.expect(Selector(dataTestIdSelector(TEST_IDS.subtitle)).textContent).eql(MOCK_DATA.subtitle);
    await t.expect(Selector(dataTestIdSelector(TEST_IDS.content)).textContent).eql(MOCK_DATA.content);

    const content = getScrollableElement();

    await t.scroll(content, 'bottom');
    await t.expect(content.scrollTop).eql(0);
  },
);

test.page(
  getPage({
    open: false,
    subtitle: '',
    cancelButton: '!null',
    additionalButton: '!null',
    position: 'left',
  }),
)('Should open with "left" position, with image, without subtitle. And only ApproveButton exists', async t => {
  await t.click(Selector(dataTestIdSelector(TEST_IDS.buttonToOpenWithImage)));

  const drawer = Selector(dataTestIdSelector(TEST_IDS.drawerWithImage));

  await t.expect(drawer.exists).ok();

  await t.expect(drawer.getStyleProperty('left')).eql('0px');

  await t.expect(Selector(dataTestIdSelector(TEST_IDS.subtitle)).exists).notOk();

  await t.expect(Selector(dataTestIdSelector(TEST_IDS.image)).exists).ok();

  await t.expect(Selector(dataTestIdSelector(TEST_IDS.cancelButton)).exists).notOk();
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.additionalButton)).exists).notOk();
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.approveButton)).exists).ok();
});

test.page(getPage({ mode: MODE.Regular }))(
  'Closes by click on overlay/close-button and on Esc press for Regular drawer',
  async t => {
    await t
      .click(getOverlayElement())
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .notOk();

    await t
      .click(Selector(dataTestIdSelector(TEST_IDS.buttonControlled)))
      .click(Selector(dataTestIdSelector(TEST_IDS.closeButton)))
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .notOk();

    await t
      .click(Selector(dataTestIdSelector(TEST_IDS.buttonControlled)))
      .pressKey('esc')
      .expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists)
      .notOk();
  },
);

test.page(getPage({ mode: MODE.Soft }))(
  `Overlay shouldn't exist in "Soft" mode and Esc is not closing modal`,
  async t => {
    const closeBtn = Selector(dataTestIdSelector(TEST_IDS.closeButton));
    await t.expect(closeBtn.exists).ok();

    await t.expect(getOverlayElement().exists).notOk();

    await t
      .pressKey('esc')
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
  'Footer buttons(Approve, Cancel, Additional) exists with proper text and executes callbacks',
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
    await t.expect(additionalButton.innerText).contains(NESTED_DRAWER.openButton);
  },
);

test.page(
  getPage({
    approveButton: '!null',
    cancelButton: '!null',
    additionalButton: '!null',
  }),
)("Footer shouldn't exist", async t => {
  const drawer = Selector(dataTestIdSelector(TEST_IDS.main));
  const footer = drawer.find(dataTestIdSelector(TEST_IDS.footer));

  await t.expect(footer.exists).notOk();
});

test.page(getPage())(
  'Opens nested drawer, content is proper. Closes nested but keeps opened parent drawer',
  async t => {
    const additionalButton = Selector(dataTestIdSelector(TEST_IDS.additionalButton));

    await t.click(additionalButton);

    const nestedDrawer = Selector(dataTestIdSelector(NESTED_DRAWER.id));

    await t.expect(nestedDrawer.exists).ok();

    await t.expect(nestedDrawer.find(dataTestIdSelector(TEST_IDS.title)).innerText).eql(NESTED_DRAWER.id);
    await t.expect(nestedDrawer.find(dataTestIdSelector(TEST_IDS.content)).innerText).eql(NESTED_DRAWER.id);

    await t.click(nestedDrawer.find(dataTestIdSelector(TEST_IDS.closeButton)));

    await t.expect(nestedDrawer.exists).notOk();
    await t.expect(Selector(dataTestIdSelector(TEST_IDS.main)).exists).ok();
  },
);
