import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'new-list';
const PIN_TOP_GROUP_ITEM_TEST_ID = 'list__pin-top-group-item';
const PIN_BOTTOM_GROUP_ITEM_TEST_ID = 'list__pin-bottom-group-item';
const SEARCH_ITEM_TEST_ID = 'list__search-item';
const FOOTER_TEST_ID = 'list__custom-footer';
const BASE_ITEM_SWITCH_TEST_ID = 'list__base-item-switch';
const BASE_ITEM_MARKER_TEST_ID = 'list__base-item-marker';
const LOADER_TEST_ID = 'list__loader';
const NO_DATA_TEST_ID = 'list__no-data';
const NO_RESULTS_TEST_ID = 'list__no-results';

const DEFAULT_EMPTY_SETTINGS = {
  showPinTopItems: false,
  showPinBottomItems: false,
  showSearch: false,
  showFooter: false,
  showGroups: false,
};

const mainElementSelector = Selector(dataTestIdSelector(TEST_ID));

const getAccordionItem = (id: string | number) => Selector(dataTestIdSelector(`list__accordion-item-${id}`));
const getBaseItem = (id: string | number) => Selector(dataTestIdSelector(`list__base-item_${id}`));
const getBaseItemCheckbox = (id: string | number) =>
  getBaseItem(id).find(dataTestIdSelector('list__base-item-checkbox'));

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    group: 'list',
    name: 'list',
    story: 'list',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('List');

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS }))('Should render', async t => {
  await t.expect(mainElementSelector.exists).ok('list is missing');
});

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showPinTopItems: true }))('Should show pinned top items', async t => {
  await t.expect(Selector(dataTestIdSelector(PIN_TOP_GROUP_ITEM_TEST_ID)).exists).ok('pinned top items are missing');
});

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showPinBottomItems: true }))(
  'Should show pinned bottom items',
  async t => {
    await t
      .expect(Selector(dataTestIdSelector(PIN_BOTTOM_GROUP_ITEM_TEST_ID)).exists)
      .ok('pinned bottom items are missing');
  },
);

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showSearch: true }))('Should show search', async t => {
  await t.expect(Selector(dataTestIdSelector(SEARCH_ITEM_TEST_ID)).exists).ok('search is missing');
});

test.page(
  getPage({
    ...DEFAULT_EMPTY_SETTINGS,
    showSearch: true,
    showEmptyList: true,
    dataFiltered: true,
  }),
)('Should show no result', async t => {
  await t.expect(Selector(dataTestIdSelector(NO_RESULTS_TEST_ID)).exists).ok();
});

test.page(
  getPage({
    ...DEFAULT_EMPTY_SETTINGS,
    showSearch: true,
    showEmptyList: true,
    dataFiltered: false,
  }),
)('Should show no data', async t => {
  await t.expect(Selector(dataTestIdSelector(NO_DATA_TEST_ID)).exists).ok();
});

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showFooter: true }))('Should show footer', async t => {
  await t.expect(Selector(dataTestIdSelector(FOOTER_TEST_ID)).exists).ok('footer is missing');
});

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showSwitch: true }))('Should show switch', async t => {
  await t.expect(Selector(dataTestIdSelector(BASE_ITEM_SWITCH_TEST_ID)).exists).ok('switches are missing');
});

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, loading: true }))('Should show loader', async t => {
  await t.expect(Selector(dataTestIdSelector(LOADER_TEST_ID)).exists).ok('loader is missing');
});

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, marker: true }))('Should show marker', async t => {
  await t.expect(Selector(dataTestIdSelector(BASE_ITEM_MARKER_TEST_ID)).exists).ok('markers are missing');
});

test.page(
  getPage({ ...DEFAULT_EMPTY_SETTINGS, selectionMode: 'single', showPinTopItems: true, showPinBottomItems: true }),
)('Should select in single mode', async t => {
  async function verifyItemSelected(id: number) {
    await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item"${id}" is not checked`);
  }

  async function verifyItemNotSelected(id: number) {
    await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item"${id}" shouldn't be checked`);
  }

  await t.click(getBaseItem(1));

  await verifyItemSelected(1);

  await t.click(getBaseItem(3));

  await verifyItemNotSelected(1);
  await verifyItemSelected(3);

  await t.click(getBaseItem(5));

  await verifyItemNotSelected(3);
  await verifyItemSelected(5);

  await t.click(getBaseItem(5));

  await verifyItemNotSelected(5);
});

test.page(
  getPage({ ...DEFAULT_EMPTY_SETTINGS, selectionMode: 'multiple', showPinTopItems: true, showPinBottomItems: true }),
)('Should select in multiple mode', async t => {
  async function verifyItemSelected(id: number) {
    await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item"${id}" is not checked`);
    await t
      .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
      .eql('true', `checkbox for item"${id}" is not checked`);
  }

  async function verifyItemNotSelected(id: number) {
    await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item"${id}" shouldn't be checked`);
    await t
      .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
      .eql('false', `checkbox for item"${id}" shouldn't be checked`);
  }

  await t.click(getBaseItem(1));

  await verifyItemSelected(1);

  await t.click(getBaseItem(3));

  await verifyItemSelected(1);
  await verifyItemSelected(3);

  await t.click(getBaseItem(5));

  await verifyItemSelected(1);
  await verifyItemSelected(3);
  await verifyItemSelected(5);

  await t.click(getBaseItem(3));

  await verifyItemSelected(1);
  await verifyItemNotSelected(3);
  await verifyItemSelected(5);
});

// TODO: add later
test.skip.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showCollapsedList: true, collapse: 'single' }))(
  'Should work in collapsed single mode',
  async t => {
    async function verifyItemExpanded(id: number | string) {
      await t
        .expect(getAccordionItem(id).getAttribute('aria-expanded'))
        .eql('true', `accordion item "${id}" is not expanded`);
    }

    async function verifyItemNotExpanded(id: number | string) {
      await t
        .expect(getAccordionItem(id).getAttribute('aria-expanded'))
        .eql('false', `accordion item "${id}" is expanded`);
    }

    await verifyItemNotExpanded(0);
    await verifyItemNotExpanded(1);

    await t.click(getAccordionItem(0));

    await verifyItemExpanded(0);
    await verifyItemNotExpanded(1);

    await t.click(getAccordionItem(1));

    await verifyItemNotExpanded(0);
    await verifyItemExpanded(1);
    await verifyItemNotExpanded('1-0');
    await verifyItemNotExpanded('1-1');

    await t.click(getAccordionItem('1-0'));

    await verifyItemExpanded('1-0');
    await verifyItemNotExpanded('1-1');

    await t.click(getAccordionItem('1-1'));

    await verifyItemNotExpanded('1-0');
    await verifyItemExpanded('1-1');
  },
);

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showCollapsedList: true, collapse: 'multiple' }))(
  'Should work in collapsed multiple mode',
  async t => {
    async function verifyItemExpanded(id: number | string) {
      await t
        .expect(getAccordionItem(id).getAttribute('aria-expanded'))
        .eql('true', `accordion item "${id}" is not expanded`);
    }

    async function verifyItemNotExpanded(id: number | string) {
      await t
        .expect(getAccordionItem(id).getAttribute('aria-expanded'))
        .eql('false', `accordion item "${id}" is expanded`);
    }

    await verifyItemNotExpanded(0);
    await verifyItemNotExpanded(1);

    await t.click(getAccordionItem(0));

    await verifyItemExpanded(0);
    await verifyItemNotExpanded(1);

    await t.click(getAccordionItem(1));

    await verifyItemExpanded(0);
    await verifyItemExpanded(1);
    await verifyItemNotExpanded('1-0');
    await verifyItemNotExpanded('1-1');

    await t.click(getAccordionItem('1-0'));

    await verifyItemExpanded('1-0');
    await verifyItemNotExpanded('1-1');

    await t.click(getAccordionItem('1-1'));

    await verifyItemExpanded('1-0');
    await verifyItemExpanded('1-1');
  },
);

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showAsyncList: true }))('Should work in async mode', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).find('[role="menuitem"]').count).eql(10);

  await t.scrollIntoView(getBaseItem(9));

  await t.expect(Selector(dataTestIdSelector(LOADER_TEST_ID)).exists).ok();
  await t.expect(Selector(dataTestIdSelector(LOADER_TEST_ID)).exists).notOk();
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).find('[role="menuitem"]').count).eql(20);
});

// keyboard navigation
// TODO: space not working in Firefox
test.page(
  getPage({ ...DEFAULT_EMPTY_SETTINGS, selectionMode: 'single', showPinTopItems: true, showPinBottomItems: true }),
)('Should select in single mode from keyboard', async t => {
  async function verifyItemSelected(id: number) {
    await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
  }

  async function verifyItemNotSelected(id: number) {
    await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item "${id}" shouldn't be checked`);
  }

  await t.expect(mainElementSelector.visible).ok();

  // select item 1
  await t.pressKey('tab').pressKey('down').pressKey('down').pressKey('enter');

  await verifyItemSelected(1);

  // select item 3
  await t.pressKey('down').pressKey('down').pressKey('enter');

  await verifyItemNotSelected(1);
  await verifyItemSelected(3);

  // select item 5
  await t.pressKey('down').pressKey('down').pressKey('enter');

  await verifyItemNotSelected(3);
  await verifyItemSelected(5);

  // deselect item 5
  await t.pressKey('enter');

  await verifyItemNotSelected(5);
});

// TODO: space not working in Firefox
test.page(
  getPage({ ...DEFAULT_EMPTY_SETTINGS, selectionMode: 'multiple', showPinTopItems: true, showPinBottomItems: true }),
)('Should select in multiple mode from keyboard', async t => {
  async function verifyItemSelected(id: number) {
    await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
    await t
      .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
      .eql('true', `checkbox for item "${id}" is not checked`);
  }

  async function verifyItemNotSelected(id: number) {
    await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item "${id}" shouldn't be checked`);
    await t
      .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
      .eql('false', `checkbox for item "${id}" shouldn't be checked`);
  }

  await t.expect(mainElementSelector.visible).ok();

  // select item 1
  await t.pressKey('tab').pressKey('down').pressKey('down').pressKey('enter');

  await verifyItemSelected(1);

  // select item 3
  await t.pressKey('down').pressKey('down').pressKey('enter');

  await verifyItemSelected(1);
  await verifyItemSelected(3);

  // select item 5
  await t.pressKey('down').pressKey('down').pressKey('enter');

  await verifyItemSelected(1);
  await verifyItemSelected(3);
  await verifyItemSelected(5);

  // deselect item 3
  await t.pressKey('up').pressKey('up').pressKey('enter');

  await verifyItemSelected(1);
  await verifyItemNotSelected(3);
  await verifyItemSelected(5);
});

test.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showCollapsedList: true, collapse: 'multiple' }))(
  'Should work in collapsed mode from keyboard',
  async t => {
    async function verifyItemExpanded(id: number | string) {
      await t
        .expect(getAccordionItem(id).getAttribute('aria-expanded'))
        .eql('true', `accordion item "${id}" is not expanded`);
    }

    async function verifyItemNotExpanded(id: number | string) {
      await t
        .expect(getAccordionItem(id).getAttribute('aria-expanded'))
        .eql('false', `accordion item "${id}" is expanded`);
    }

    await verifyItemNotExpanded(0);
    await verifyItemNotExpanded(1);

    // expand item 0
    await t.pressKey('tab').pressKey('down').pressKey('right');

    await verifyItemExpanded(0);
    await verifyItemNotExpanded(1);

    // expand item 1
    await t.pressKey('down').pressKey('down').pressKey('down').pressKey('right');

    await verifyItemExpanded(0);
    await verifyItemExpanded(1);

    // collapse item 1
    await t.pressKey('right');

    await verifyItemExpanded(0);
    await verifyItemNotExpanded(1);
  },
);

test.skip.page(getPage({ ...DEFAULT_EMPTY_SETTINGS, showAsyncList: true }))(
  'Should work in async mode from keyboard',
  async t => {
    const PAGE_SIZE = 10;

    await t.expect(Selector(dataTestIdSelector(TEST_ID)).find('[role="menuitem"]').count).eql(PAGE_SIZE);

    await t.pressKey('tab');
    for (let i = 0; i < PAGE_SIZE; i++) {
      await t.pressKey('down');
    }

    await t.expect(Selector(dataTestIdSelector(LOADER_TEST_ID)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(LOADER_TEST_ID)).exists).notOk();
    await t.expect(Selector(dataTestIdSelector(TEST_ID)).find('[role="menuitem"]').count).eql(2 * PAGE_SIZE);
  },
);
