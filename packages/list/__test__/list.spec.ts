import { expect, test } from '../../../playwright/fixtures';

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

const getStory = (props: object = {}) => ({
  group: 'list',
  name: 'list',
  story: 'list',
  props: {
    'data-test-id': TEST_ID,
    ...props,
  },
});

test.describe('List', () => {
  test('Should render', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS }));
    await expect(getByTestId(TEST_ID)).toBeVisible();
  });

  test('Should show pinned top items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showPinTopItems: true }));
    await expect(getByTestId(PIN_TOP_GROUP_ITEM_TEST_ID)).toBeVisible();
  });

  test('Should show pinned bottom items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showPinBottomItems: true }));
    await expect(getByTestId(PIN_BOTTOM_GROUP_ITEM_TEST_ID)).toBeVisible();
  });

  test('Should show search', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showSearch: true }));
    await expect(getByTestId(SEARCH_ITEM_TEST_ID)).toBeVisible();
  });

  test('Should show no result', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showSearch: true, showEmptyList: true, dataFiltered: true }));
    await expect(getByTestId(NO_RESULTS_TEST_ID)).toBeVisible();
  });

  test('Should show no data', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      getStory({ ...DEFAULT_EMPTY_SETTINGS, showSearch: true, showEmptyList: true, dataFiltered: false }),
    );
    await expect(getByTestId(NO_DATA_TEST_ID)).toBeVisible();
  });

  test('Should show footer', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showFooter: true }));
    await expect(getByTestId(FOOTER_TEST_ID)).toBeVisible();
  });

  test('Should show switch', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showSwitch: true }));
    await expect(getByTestId(BASE_ITEM_SWITCH_TEST_ID).first()).toBeVisible();
  });

  test('Should show loader', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, loading: true }));
    await expect(getByTestId(LOADER_TEST_ID)).toBeVisible();
  });

  test('Should show marker', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, marker: true }));
    await expect(getByTestId(BASE_ITEM_MARKER_TEST_ID).first()).toBeVisible();
  });

  test('Should select in single mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      getStory({ ...DEFAULT_EMPTY_SETTINGS, selectionMode: 'single', showPinTopItems: true, showPinBottomItems: true }),
    );

    const getBaseItem = (id: string | number) => getByTestId(`list__base-item_${id}`);

    async function verifyItemSelected(id: number) {
      await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
    }

    async function verifyItemNotSelected(id: number) {
      await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
    }

    await getBaseItem(1).click();

    await verifyItemSelected(1);

    await getBaseItem(3).click();

    await verifyItemNotSelected(1);
    await verifyItemSelected(3);

    await getBaseItem(5).click();

    await verifyItemNotSelected(3);
    await verifyItemSelected(5);

    await getBaseItem(5).click();

    await verifyItemNotSelected(5);
  });

  test('Should select in multiple mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      getStory({
        ...DEFAULT_EMPTY_SETTINGS,
        selectionMode: 'multiple',
        showPinTopItems: true,
        showPinBottomItems: true,
      }),
    );

    const getBaseItem = (id: string | number) => getByTestId(`list__base-item_${id}`);
    const getBaseItemCheckbox = (id: string | number) =>
      getBaseItem(id).locator(`[data-test-id="list__base-item-checkbox"]`);

    async function verifyItemSelected(id: number) {
      await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
      await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'true');
    }

    async function verifyItemNotSelected(id: number) {
      await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
      await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'false');
    }

    await getBaseItem(1).click();

    await verifyItemSelected(1);

    await getBaseItem(3).click();

    await verifyItemSelected(1);
    await verifyItemSelected(3);

    await getBaseItem(5).click();

    await verifyItemSelected(1);
    await verifyItemSelected(3);
    await verifyItemSelected(5);

    await getBaseItem(3).click();

    await verifyItemSelected(1);
    await verifyItemNotSelected(3);
    await verifyItemSelected(5);
  });

  // TODO: add later
  test.skip('List - Should work in collapsed single mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showCollapsedList: true, collapse: 'single' }));

    const getAccordionItem = (id: string | number) => getByTestId(`list__accordion-item-${id}`);

    async function verifyItemExpanded(id: number | string) {
      await expect(getAccordionItem(id)).toHaveAttribute('aria-expanded', 'true');
    }

    async function verifyItemNotExpanded(id: number | string) {
      await expect(getAccordionItem(id)).toHaveAttribute('aria-expanded', 'false');
    }

    await verifyItemNotExpanded(0);
    await verifyItemNotExpanded(1);

    await getAccordionItem(0).click();

    await verifyItemExpanded(0);
    await verifyItemNotExpanded(1);

    await getAccordionItem(1).click();

    await verifyItemNotExpanded(0);
    await verifyItemExpanded(1);
    await verifyItemNotExpanded('1-0');
    await verifyItemNotExpanded('1-1');

    await getAccordionItem('1-0').click();

    await verifyItemExpanded('1-0');
    await verifyItemNotExpanded('1-1');

    await getAccordionItem('1-1').click();

    await verifyItemNotExpanded('1-0');
    await verifyItemExpanded('1-1');
  });

  test('Should work in collapsed multiple mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showCollapsedList: true, collapse: 'multiple' }));

    const getAccordionItem = (id: string | number) => getByTestId(`list__accordion-item-${id}`);

    async function verifyItemExpanded(id: number | string) {
      await expect(getAccordionItem(id)).toHaveAttribute('aria-expanded', 'true');
    }

    async function verifyItemNotExpanded(id: number | string) {
      await expect(getAccordionItem(id)).toHaveAttribute('aria-expanded', 'false');
    }

    await verifyItemNotExpanded(0);
    await verifyItemNotExpanded(1);

    await getAccordionItem(0).click();

    await verifyItemExpanded(0);
    await verifyItemNotExpanded(1);

    await getAccordionItem(1).click();

    await verifyItemExpanded(0);
    await verifyItemExpanded(1);
    await verifyItemNotExpanded('1-0');
    await verifyItemNotExpanded('1-1');

    await getAccordionItem('1-0').click();

    await verifyItemExpanded('1-0');
    await verifyItemNotExpanded('1-1');

    await getAccordionItem('1-1').click();

    await verifyItemExpanded('1-0');
    await verifyItemExpanded('1-1');
  });

  test('Should work in async mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showAsyncList: true }));

    const getBaseItem = (id: string | number) => getByTestId(`list__base-item_${id}`);

    await expect(getByTestId(TEST_ID).locator('[role="menuitem"]')).toHaveCount(10);

    await getBaseItem(9).scrollIntoViewIfNeeded();

    await expect(getByTestId(LOADER_TEST_ID)).toBeVisible();
    await expect(getByTestId(LOADER_TEST_ID)).not.toBeVisible();
    await expect(getByTestId(TEST_ID).locator('[role="menuitem"]')).toHaveCount(20);
  });

  // keyboard navigation
  // TODO: space not working in Firefox
  test('Should select in single mode from keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(
      getStory({ ...DEFAULT_EMPTY_SETTINGS, selectionMode: 'single', showPinTopItems: true, showPinBottomItems: true }),
    );

    const getBaseItem = (id: string | number) => getByTestId(`list__base-item_${id}`);

    async function verifyItemSelected(id: number) {
      await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
    }

    async function verifyItemNotSelected(id: number) {
      await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
    }

    await expect(getByTestId(TEST_ID)).toBeVisible();

    // select item 1
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await verifyItemSelected(1);

    // select item 3
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await verifyItemNotSelected(1);
    await verifyItemSelected(3);

    // select item 5
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await verifyItemNotSelected(3);
    await verifyItemSelected(5);

    // deselect item 5
    await page.keyboard.press('Enter');

    await verifyItemNotSelected(5);
  });

  // TODO: space not working in Firefox
  test('Should select in multiple mode from keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(
      getStory({
        ...DEFAULT_EMPTY_SETTINGS,
        selectionMode: 'multiple',
        showPinTopItems: true,
        showPinBottomItems: true,
      }),
    );

    const getBaseItem = (id: string | number) => getByTestId(`list__base-item_${id}`);
    const getBaseItemCheckbox = (id: string | number) =>
      getBaseItem(id).locator(`[data-test-id="list__base-item-checkbox"]`);

    async function verifyItemSelected(id: number) {
      await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
      await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'true');
    }

    async function verifyItemNotSelected(id: number) {
      await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
      await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'false');
    }

    await expect(getByTestId(TEST_ID)).toBeVisible();

    // select item 1
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await verifyItemSelected(1);

    // select item 3
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await verifyItemSelected(1);
    await verifyItemSelected(3);

    // select item 5
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await verifyItemSelected(1);
    await verifyItemSelected(3);
    await verifyItemSelected(5);

    // deselect item 3
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    await verifyItemSelected(1);
    await verifyItemNotSelected(3);
    await verifyItemSelected(5);
  });

  test('Should work in collapsed mode from keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showCollapsedList: true, collapse: 'multiple' }));

    const getAccordionItem = (id: string | number) => getByTestId(`list__accordion-item-${id}`);

    async function verifyItemExpanded(id: number | string) {
      await expect(getAccordionItem(id)).toHaveAttribute('aria-expanded', 'true');
    }

    async function verifyItemNotExpanded(id: number | string) {
      await expect(getAccordionItem(id)).toHaveAttribute('aria-expanded', 'false');
    }

    await verifyItemNotExpanded(0);
    await verifyItemNotExpanded(1);

    // expand item 0
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');

    await verifyItemExpanded(0);
    await verifyItemNotExpanded(1);

    // expand item 1
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');

    await verifyItemExpanded(0);
    await verifyItemExpanded(1);

    // collapse item 1
    await page.keyboard.press('ArrowRight');

    await verifyItemExpanded(0);
    await verifyItemNotExpanded(1);
  });

  test.skip('List - Should work in async mode from keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ ...DEFAULT_EMPTY_SETTINGS, showAsyncList: true }));

    const PAGE_SIZE = 10;

    await expect(getByTestId(TEST_ID).locator('[role="menuitem"]')).toHaveCount(PAGE_SIZE);

    await page.keyboard.press('Tab');
    for (let i = 0; i < PAGE_SIZE; i++) {
      await page.keyboard.press('ArrowDown');
    }

    await expect(getByTestId(LOADER_TEST_ID)).toBeVisible();
    await expect(getByTestId(LOADER_TEST_ID)).not.toBeVisible();
    await expect(getByTestId(TEST_ID).locator('[role="menuitem"]')).toHaveCount(2 * PAGE_SIZE);
  });
});
