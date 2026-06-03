import { expect, type Locator, type Page, test } from '../../../playwright/fixtures';

const DROPLIST_TRIGGER_TEST_ID = 'droplist-button-trigger';
const TEST_ID = 'new-droplist';
const NEXT_LIST_ITEMS = ['0-0', '0-1', '1-0', '1-1', '2-0', '2-1', '3-0', '3-1', '4-0', '4-1', '5-0', '5-1'].map(
  id => 'first-nested-' + id,
);

async function waitForDroplistOpen(getByTestId: (testId: string) => Locator) {
  await expect(getByTestId(TEST_ID)).toBeVisible();
  await expect(getByTestId(TEST_ID).locator('[role="menuitem"]').first()).toBeVisible();
}

async function openDroplistAndFocusList(page: Page, getByTestId: (testId: string) => Locator) {
  await getByTestId(DROPLIST_TRIGGER_TEST_ID).click();
  await waitForDroplistOpen(getByTestId);
  await getByTestId(DROPLIST_TRIGGER_TEST_ID).focus();
  await page.keyboard.press('ArrowDown');
  await expect(getByTestId('list__base-item_first')).toBeFocused();
}

async function verifyCheckboxIndeterminate(getBaseItemCheckbox: (id: string) => Locator, id: string) {
  await expect(getBaseItemCheckbox(id).locator('[data-indeterminate]').first()).toHaveAttribute(
    'data-indeterminate',
    'true',
  );
}

const getStory = (props: object = {}) => ({
  group: 'list',
  name: 'droplist',
  story: 'droplist',
  props: {
    'data-test-id': TEST_ID,
    ...props,
  },
});

test.describe('DropList', () => {
  test('Should render', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory());
    await getByTestId(DROPLIST_TRIGGER_TEST_ID).click();

    await expect(getByTestId(TEST_ID)).toBeVisible();
  });

  test('Should not have marker on parent nodes & switch nodes', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ selectionMode: 'single', marker: true }));

    const getBaseItem = (id: string) => getByTestId(`list__base-item_${id}`);
    const getBaseItemMarker = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-marker"]`);

    async function verifyMarkerPresent(id: string) {
      await expect(getBaseItemMarker(id)).toBeVisible();
    }

    async function verifyMarkerNotPresent(id: string) {
      await expect(getBaseItemMarker(id)).not.toBeVisible();
    }

    await getByTestId(DROPLIST_TRIGGER_TEST_ID).click();
    await getBaseItem('first').hover();
    await getBaseItem('first-nested').hover();

    await verifyMarkerNotPresent('first');
    await verifyMarkerNotPresent('first-nested');
    await verifyMarkerNotPresent('first-nested-0-0');

    await getBaseItem('3').click();
    await getBaseItem('3-0').click();
    await getBaseItem('3-0-0').click();

    await verifyMarkerNotPresent('3');
    await verifyMarkerNotPresent('3-0');
    await verifyMarkerPresent('3-0-0');
  });

  test('Should select items in single mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ selectionMode: 'single' }));

    const getBaseItem = (id: string) => getByTestId(`list__base-item_${id}`);
    const getBaseItemSwitch = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-switch"]`);

    async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'true');
      } else {
        await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
      }
    }

    async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'false');
      } else {
        await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
      }
    }

    await getByTestId(DROPLIST_TRIGGER_TEST_ID).click();
    await getBaseItem('first').hover();
    await getBaseItem('first-nested').hover();
    await getBaseItem('first-nested-0-0').click();

    await verifyItemSelected({ id: 'first' });
    await verifyItemSelected({ id: 'first-nested' });
    await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

    await getBaseItem('3').click();
    await getBaseItem('3-0').click();
    await getBaseItem('3-0-0').click();

    await verifyItemSelected({ id: '3' });
    await verifyItemSelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-0' });

    await getBaseItem('first').hover();
    await getBaseItem('first-nested').hover();

    await verifyItemNotSelected({ id: 'first' });
    await verifyItemNotSelected({ id: 'first-nested' });
    await verifyItemNotSelected({ id: 'first-nested-0-0', hasSwitch: true });

    await getBaseItem('2').click();

    await verifyItemSelected({ id: '2', hasSwitch: true });
    await verifyItemNotSelected({ id: '3' });
    await verifyItemNotSelected({ id: '3-0' });
    await verifyItemNotSelected({ id: '3-0-0' });
  });

  test('Should select next list items in multiple mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ selectionMode: 'multiple' }));

    const getBaseItem = (id: string) => getByTestId(`list__base-item_${id}`);
    const getBaseItemCheckbox = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-checkbox"]`);
    const getBaseItemSwitch = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-switch"]`);

    async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'true');
      } else {
        await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
        await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'true');
      }
    }

    async function verifyItemPartiallySelected({ id }: { id: string }) {
      await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
      await verifyCheckboxIndeterminate(getBaseItemCheckbox, id);
    }

    async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'false');
      } else {
        await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
        await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'false');
      }
    }

    await getByTestId(DROPLIST_TRIGGER_TEST_ID).click();

    // next list item - click inner items
    await getBaseItemCheckbox('first').hover();
    await getBaseItem('first-nested').hover();
    await getBaseItem('first-nested-0-0').click();

    await verifyItemPartiallySelected({ id: 'first' });
    await verifyItemPartiallySelected({ id: 'first-nested' });
    await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

    for (const id of NEXT_LIST_ITEMS.slice(1)) {
      await getBaseItem(id).click();
    }

    await verifyItemSelected({ id: 'first' });
    await verifyItemSelected({ id: 'first-nested' });

    for (const id of NEXT_LIST_ITEMS) {
      await getBaseItem(id).click();
    }

    await verifyItemNotSelected({ id: 'first' });
    await verifyItemNotSelected({ id: 'first-nested' });
  });

  test('Should select accordion items in multiple mode', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ selectionMode: 'multiple' }));

    const getBaseItem = (id: string) => getByTestId(`list__base-item_${id}`);
    const getBaseItemCheckbox = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-checkbox"]`);
    const getBaseItemSwitch = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-switch"]`);

    async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'true');
      } else {
        await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
        await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'true');
      }
    }

    async function verifyItemPartiallySelected({ id }: { id: string }) {
      await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
      await verifyCheckboxIndeterminate(getBaseItemCheckbox, id);
    }

    async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'false');
      } else {
        await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
        await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'false');
      }
    }

    await getByTestId(DROPLIST_TRIGGER_TEST_ID).click();

    // accordion item - select by inner items
    await getBaseItem('3').click();
    await getBaseItem('3-0').click();
    await getBaseItem('3-0-0').click();
    await getBaseItem('2').click();

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemPartiallySelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-0' });
    await verifyItemSelected({ id: '2', hasSwitch: true });

    await getBaseItem('3-0-1').click();

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemSelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-1' });

    await getBaseItem('3-0-0').click();
    await getBaseItem('3-0-1').click();

    await verifyItemNotSelected({ id: '3' });
    await verifyItemNotSelected({ id: '3-0' });
    await verifyItemNotSelected({ id: '3-0-0' });
    await verifyItemNotSelected({ id: '3-0-1' });

    // accordion list item - select by parent items
    await getBaseItemCheckbox('3').click();
    await getBaseItem('3-1').click();

    await verifyItemSelected({ id: '3' });
    await verifyItemSelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-0' });
    await verifyItemSelected({ id: '3-0-1' });
    await verifyItemSelected({ id: '3-1' });
    await verifyItemSelected({ id: '3-1-0' });
    await verifyItemSelected({ id: '3-1-1' });

    await getBaseItemCheckbox('3-0').click();

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemNotSelected({ id: '3-0' });
    await verifyItemNotSelected({ id: '3-0-0' });
    await verifyItemNotSelected({ id: '3-0-1' });
    await verifyItemSelected({ id: '3-1' });
    await verifyItemSelected({ id: '3-1-0' });
    await verifyItemSelected({ id: '3-1-1' });
  });

  // keyboard navigation
  // TODO: space not working in Firefox
  test('Should select items in single mode with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ selectionMode: 'single' }));

    const getBaseItem = (id: string) => getByTestId(`list__base-item_${id}`);
    const getBaseItemSwitch = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-switch"]`);

    async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'true');
      } else {
        await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
      }
    }

    async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'false');
      } else {
        await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
      }
    }

    await openDroplistAndFocusList(page, getByTestId);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await verifyItemSelected({ id: 'first' });
    await verifyItemSelected({ id: 'first-nested' });
    await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

    // go back to main list & to the collapse section
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    // open collapse list and select item 3-0-0
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await verifyItemSelected({ id: '3' });
    await verifyItemSelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-0' });

    // go back to the next list item
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    await verifyItemNotSelected({ id: 'first' });
    await verifyItemNotSelected({ id: 'first-nested' });
    await verifyItemNotSelected({ id: 'first-nested-0-0', hasSwitch: true });

    // select item 2
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await verifyItemSelected({ id: '2', hasSwitch: true });
    await verifyItemNotSelected({ id: '3' });
    await verifyItemNotSelected({ id: '3-0' });
    await verifyItemNotSelected({ id: '3-0-0' });
  });

  // TODO: space not working in Firefox
  test('Should select next list items in multiple mode with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ selectionMode: 'multiple' }));

    const getBaseItem = (id: string) => getByTestId(`list__base-item_${id}`);
    const getBaseItemCheckbox = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-checkbox"]`);
    const getBaseItemSwitch = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-switch"]`);

    async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'true');
      } else {
        await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
        await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'true');
      }
    }

    async function verifyItemPartiallySelected({ id }: { id: string }) {
      await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
      await verifyCheckboxIndeterminate(getBaseItemCheckbox, id);
    }

    async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'false');
      } else {
        await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
        await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'false');
      }
    }

    await expect(getByTestId(DROPLIST_TRIGGER_TEST_ID)).toBeVisible();
    // next list item - click inner items
    // select item first-nested-0-0
    await openDroplistAndFocusList(page, getByTestId);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await verifyItemPartiallySelected({ id: 'first' });
    await verifyItemPartiallySelected({ id: 'first-nested' });
    await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

    // select all inner items
    for (let i = 0; i < NEXT_LIST_ITEMS.length - 1; i++) {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
    }

    await verifyItemSelected({ id: 'first' });
    await verifyItemSelected({ id: 'first-nested' });

    // deselect all inner items
    for (let i = 0; i < NEXT_LIST_ITEMS.length; i++) {
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowUp');
    }

    await verifyItemNotSelected({ id: 'first' });
    await verifyItemNotSelected({ id: 'first-nested' });

    // next list item - click parent items
    // select item first-nested
    // TODO: not working with space
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    await verifyItemSelected({ id: 'first' });
    await verifyItemSelected({ id: 'first-nested' });

    for (const id of NEXT_LIST_ITEMS) {
      await verifyItemSelected({ id, hasSwitch: true });
    }
  });

  // TODO: space not working in Firefox
  test('Should select accordion items in multiple mode with keyboard', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ selectionMode: 'multiple' }));

    const getBaseItem = (id: string) => getByTestId(`list__base-item_${id}`);
    const getBaseItemCheckbox = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-checkbox"]`);
    const getBaseItemSwitch = (id: string) => getBaseItem(id).locator(`[data-test-id="list__base-item-switch"]`);

    async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'true');
      } else {
        await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
        await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'true');
      }
    }

    async function verifyItemPartiallySelected({ id }: { id: string }) {
      await expect(getBaseItem(id)).toHaveAttribute('data-checked', 'true');
      await verifyCheckboxIndeterminate(getBaseItemCheckbox, id);
    }

    async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await expect(getBaseItemSwitch(id)).toHaveAttribute('data-checked', 'false');
      } else {
        await expect(getBaseItem(id)).not.toHaveAttribute('data-checked', 'true');
        await expect(getBaseItemCheckbox(id)).toHaveAttribute('data-checked', 'false');
      }
    }

    async function focusListItem(id: string, direction: 'ArrowDown' | 'ArrowUp' = 'ArrowDown') {
      for (let step = 0; step < 30; step++) {
        const isFocused = await getBaseItem(id).evaluate(node => node === document.activeElement);

        if (isFocused) {
          return;
        }

        await page.keyboard.press(direction);
      }

      await expect(getBaseItem(id)).toBeFocused();
    }

    async function pressKeyWhenFocused(key: string, id: string) {
      await expect(getBaseItem(id)).toBeFocused();
      await page.keyboard.press(key);
    }

    await openDroplistAndFocusList(page, getByTestId);

    // accordion item - select by inner items
    await focusListItem('3');
    await pressKeyWhenFocused('ArrowRight', '3');
    await expect(getBaseItem('3-0')).toBeVisible();

    await focusListItem('3-0');
    await pressKeyWhenFocused('ArrowRight', '3-0');
    await expect(getBaseItem('3-0-0')).toBeVisible();

    await focusListItem('3-0-0');
    await pressKeyWhenFocused('Enter', '3-0-0');

    await focusListItem('2', 'ArrowUp');
    await pressKeyWhenFocused('Enter', '2');

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemPartiallySelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-0' });
    await verifyItemSelected({ id: '2', hasSwitch: true });

    // select item 3-0-1
    await focusListItem('3-0-1');
    await pressKeyWhenFocused('Enter', '3-0-1');

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemSelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-1' });

    // deselect items 3-0-0 & 3-0-1
    await pressKeyWhenFocused('Enter', '3-0-1');
    await focusListItem('3-0-0', 'ArrowUp');
    await pressKeyWhenFocused('Enter', '3-0-0');

    await verifyItemNotSelected({ id: '3' });
    await verifyItemNotSelected({ id: '3-0' });
    await verifyItemNotSelected({ id: '3-0-0' });
    await verifyItemNotSelected({ id: '3-0-1' });

    // accordion list item - select by parent items
    await focusListItem('3-1');
    await pressKeyWhenFocused('ArrowRight', '3-1');
    await focusListItem('3', 'ArrowUp');
    await pressKeyWhenFocused('Enter', '3');

    await verifyItemSelected({ id: '3' });
    await verifyItemSelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-0' });
    await verifyItemSelected({ id: '3-0-1' });
    await verifyItemSelected({ id: '3-1' });
    await verifyItemSelected({ id: '3-1-0' });
    await verifyItemSelected({ id: '3-1-1' });

    // deselect item 3-0
    await focusListItem('3-0');
    await pressKeyWhenFocused('Enter', '3-0');

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemNotSelected({ id: '3-0' });
    await verifyItemNotSelected({ id: '3-0-0' });
    await verifyItemNotSelected({ id: '3-0-1' });
    await verifyItemSelected({ id: '3-1' });
    await verifyItemSelected({ id: '3-1-0' });
    await verifyItemSelected({ id: '3-1-1' });
  });
});
