import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const DROPLIST_TRIGGER_TEST_ID = 'droplist-button-trigger';
const TEST_ID = 'new-droplist';
const NEXT_LIST_ITEMS = ['0-0', '0-1', '1-0', '1-1', '2-0', '2-1', '3-0', '3-1', '4-0', '4-1', '5-0', '5-1'].map(
  id => 'first-nested-' + id,
);

const triggerElementSelector = Selector(dataTestIdSelector(DROPLIST_TRIGGER_TEST_ID));

const getBaseItem = (id: string) => Selector(dataTestIdSelector(`list__base-item_${id}`));
const getBaseItemCheckbox = (id: string) => getBaseItem(id).find(dataTestIdSelector('list__base-item-checkbox'));
const getBaseItemSwitch = (id: string) => getBaseItem(id).find(dataTestIdSelector('list__base-item-switch'));
const getBaseItemMarker = (id: string) => getBaseItem(id).find(dataTestIdSelector('list__base-item-marker'));

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    group: 'list',
    name: 'droplist',
    story: 'droplist',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('DropList');

test.page(getPage())('Should render', async t => {
  await t.click(triggerElementSelector);

  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok('droplist is missing');
});

test.page(getPage({ selectionMode: 'single', marker: true }))(
  'Should not have marker on parent nodes & switch nodes',
  async t => {
    async function verifyMarkerPresent(id: string) {
      await t.expect(getBaseItemMarker(id).exists).ok(`item"${id}" don't have a marker`);
    }

    async function verifyMarkerNotPresent(id: string) {
      await t.expect(getBaseItemMarker(id).exists).notOk(`item"${id}" has a marker`);
    }

    await t.click(triggerElementSelector);
    await t.hover(getBaseItem('first'));
    await t.hover(getBaseItem('first-nested'));

    await verifyMarkerNotPresent('first');
    await verifyMarkerNotPresent('first-nested');
    await verifyMarkerNotPresent('first-nested-0-0');

    await t.click(getBaseItem('3'));
    await t.click(getBaseItem('3-0'));
    await t.click(getBaseItem('3-0-0'));

    await verifyMarkerNotPresent('3');
    await verifyMarkerNotPresent('3-0');
    await verifyMarkerPresent('3-0-0');
  },
);

test.page(getPage({ selectionMode: 'single' }))('Should select items in single mode', async t => {
  async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t.expect(getBaseItemSwitch(id).getAttribute('data-checked')).eql('true', `item"${id}" is not checked`);
    } else {
      await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item"${id}" is not checked`);
    }
  }

  async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t
        .expect(getBaseItemSwitch(id).getAttribute('data-checked'))
        .eql('false', `item"${id}" shouldn't be checked`);
    } else {
      await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item"${id}" shouldn't be checked`);
    }
  }

  await t.click(triggerElementSelector);
  await t.hover(getBaseItem('first'));
  await t.hover(getBaseItem('first-nested'));
  await t.click(getBaseItem('first-nested-0-0'));

  await verifyItemSelected({ id: 'first' });
  await verifyItemSelected({ id: 'first-nested' });
  await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

  await t.click(getBaseItem('3'));
  await t.click(getBaseItem('3-0'));
  await t.click(getBaseItem('3-0-0'));

  await verifyItemSelected({ id: '3' });
  await verifyItemSelected({ id: '3-0' });
  await verifyItemSelected({ id: '3-0-0' });

  await t.hover(getBaseItem('first'));
  await t.hover(getBaseItem('first-nested'));

  await verifyItemNotSelected({ id: 'first' });
  await verifyItemNotSelected({ id: 'first-nested' });
  await verifyItemNotSelected({ id: 'first-nested-0-0', hasSwitch: true });

  await t.click(getBaseItem('2'));

  await verifyItemSelected({ id: '2', hasSwitch: true });
  await verifyItemNotSelected({ id: '3' });
  await verifyItemNotSelected({ id: '3-0' });
  await verifyItemNotSelected({ id: '3-0-0' });
});

test.page(getPage({ selectionMode: 'multiple' }))('Should select next list items in multiple mode', async t => {
  async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t.expect(getBaseItemSwitch(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
    } else {
      await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
      await t
        .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
        .eql('true', `checkbox for item "${id}" is not checked`);
    }
  }

  async function verifyItemPartiallySelected({ id }: { id: string }) {
    await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item "${id}" is not partially selected`);
    await t
      .expect(getBaseItemCheckbox(id).find('[data-indeterminate="true"]').exists)
      .ok(`checkbox for item "${id}" is not partially selected`);
  }

  async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t
        .expect(getBaseItemSwitch(id).getAttribute('data-checked'))
        .eql('false', `item "${id}" shouldn't be checked`);
    } else {
      await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item "${id}" shouldn't be checked`);
      await t
        .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
        .eql('false', `checkbox for item "${id}" shouldn't be checked`);
    }
  }

  await t.click(triggerElementSelector);

  // next list item - click inner items
  await t.hover(getBaseItemCheckbox('first'));
  await t.hover(getBaseItem('first-nested'));
  await t.click(getBaseItem('first-nested-0-0'));

  await verifyItemPartiallySelected({ id: 'first' });
  await verifyItemPartiallySelected({ id: 'first-nested' });
  await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

  for (const id of NEXT_LIST_ITEMS.slice(1)) {
    await t.click(getBaseItem(id));
  }

  await verifyItemSelected({ id: 'first' });
  await verifyItemSelected({ id: 'first-nested' });

  for (const id of NEXT_LIST_ITEMS) {
    await t.click(getBaseItem(id));
  }

  await verifyItemNotSelected({ id: 'first' });
  await verifyItemNotSelected({ id: 'first-nested' });
});

test.page(getPage({ selectionMode: 'multiple' }))('Should select accordion items in multiple mode', async t => {
  async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t.expect(getBaseItemSwitch(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
    } else {
      await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
      await t
        .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
        .eql('true', `checkbox for item "${id}" is not checked`);
    }
  }

  async function verifyItemPartiallySelected({ id }: { id: string }) {
    await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item "${id}" is not partially selected`);
    await t
      .expect(getBaseItemCheckbox(id).find('[data-indeterminate="true"]').exists)
      .ok(`checkbox for item "${id}" is not partially selected`);
  }

  async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t
        .expect(getBaseItemSwitch(id).getAttribute('data-checked'))
        .eql('false', `item "${id}" shouldn't be checked`);
    } else {
      await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item "${id}" shouldn't be checked`);
      await t
        .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
        .eql('false', `checkbox for item "${id}" shouldn't be checked`);
    }
  }

  await t.click(triggerElementSelector);

  // accordion item - select by inner items
  await t.click(getBaseItem('3'));
  await t.click(getBaseItem('3-0'));
  await t.click(getBaseItem('3-0-0'));
  await t.click(getBaseItem('2'));

  await verifyItemPartiallySelected({ id: '3' });
  await verifyItemPartiallySelected({ id: '3-0' });
  await verifyItemSelected({ id: '3-0-0' });
  await verifyItemSelected({ id: '2', hasSwitch: true });

  await t.click(getBaseItem('3-0-1'));

  await verifyItemPartiallySelected({ id: '3' });
  await verifyItemSelected({ id: '3-0' });
  await verifyItemSelected({ id: '3-0-1' });

  await t.click(getBaseItem('3-0-0'));
  await t.click(getBaseItem('3-0-1'));

  await verifyItemNotSelected({ id: '3' });
  await verifyItemNotSelected({ id: '3-0' });
  await verifyItemNotSelected({ id: '3-0-0' });
  await verifyItemNotSelected({ id: '3-0-1' });

  // accordion list item - select by parent items
  await t.click(getBaseItemCheckbox('3'));
  await t.click(getBaseItem('3-1'));

  await verifyItemSelected({ id: '3' });
  await verifyItemSelected({ id: '3-0' });
  await verifyItemSelected({ id: '3-0-0' });
  await verifyItemSelected({ id: '3-0-1' });
  await verifyItemSelected({ id: '3-1' });
  await verifyItemSelected({ id: '3-1-0' });
  await verifyItemSelected({ id: '3-1-1' });

  await t.click(getBaseItemCheckbox('3-0'));

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
test.page(getPage({ selectionMode: 'single' }))('Should select items in single mode with keyboard', async t => {
  async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t.expect(getBaseItemSwitch(id).getAttribute('data-checked')).eql('true', `item"${id}" is not checked`);
    } else {
      await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item"${id}" is not checked`);
    }
  }

  async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t
        .expect(getBaseItemSwitch(id).getAttribute('data-checked'))
        .eql('false', `item"${id}" shouldn't be checked`);
    } else {
      await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item"${id}" shouldn't be checked`);
    }
  }

  await t.expect(triggerElementSelector.exists).ok();

  // select item first-nested-0-0
  await t.pressKey('tab').pressKey('down').pressKey('right').pressKey('right').pressKey('enter');

  await verifyItemSelected({ id: 'first' });
  await verifyItemSelected({ id: 'first-nested' });
  await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

  // go back to main list & to the collapse section
  await t.pressKey('tab').pressKey('down').pressKey('down').pressKey('down').pressKey('down');
  // open collapse list and select item 3-0-0
  await t.pressKey('right').pressKey('down').pressKey('right').pressKey('down').pressKey('enter');

  await verifyItemSelected({ id: '3' });
  await verifyItemSelected({ id: '3-0' });
  await verifyItemSelected({ id: '3-0-0' });

  // go back to the next list item
  await t
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('right')
    .pressKey('right');

  await verifyItemNotSelected({ id: 'first' });
  await verifyItemNotSelected({ id: 'first-nested' });
  await verifyItemNotSelected({ id: 'first-nested-0-0', hasSwitch: true });

  // select item 2
  await t.pressKey('left').pressKey('left').pressKey('down').pressKey('down').pressKey('enter');

  await verifyItemSelected({ id: '2', hasSwitch: true });
  await verifyItemNotSelected({ id: '3' });
  await verifyItemNotSelected({ id: '3-0' });
  await verifyItemNotSelected({ id: '3-0-0' });
});

// TODO: space not working in Firefox
test.page(getPage({ selectionMode: 'multiple' }))(
  'Should select next list items in multiple mode with keyboard',
  async t => {
    async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await t.expect(getBaseItemSwitch(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
      } else {
        await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
        await t
          .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
          .eql('true', `checkbox for item "${id}" is not checked`);
      }
    }

    async function verifyItemPartiallySelected({ id }: { id: string }) {
      await t
        .expect(getBaseItem(id).getAttribute('data-checked'))
        .eql('true', `item "${id}" is not partially selected`);
      await t
        .expect(getBaseItemCheckbox(id).find('[data-indeterminate="true"]').exists)
        .ok(`checkbox for item "${id}" is not partially selected`);
    }

    async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await t
          .expect(getBaseItemSwitch(id).getAttribute('data-checked'))
          .eql('false', `item "${id}" shouldn't be checked`);
      } else {
        await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item "${id}" shouldn't be checked`);
        await t
          .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
          .eql('false', `checkbox for item "${id}" shouldn't be checked`);
      }
    }

    await t.expect(triggerElementSelector.exists).ok();
    // next list item - click inner items
    // select item first-nested-0-0
    await t.pressKey('tab').pressKey('down').pressKey('right').pressKey('right').pressKey('enter');

    await verifyItemPartiallySelected({ id: 'first' });
    await verifyItemPartiallySelected({ id: 'first-nested' });
    await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

    // select all inner items
    for (let i = 0; i < NEXT_LIST_ITEMS.length - 1; i++) {
      await t.pressKey('down').pressKey('enter');
    }

    await verifyItemSelected({ id: 'first' });
    await verifyItemSelected({ id: 'first-nested' });

    // deselect all inner items
    for (let i = 0; i < NEXT_LIST_ITEMS.length; i++) {
      await t.pressKey('enter').pressKey('up');
    }

    await verifyItemNotSelected({ id: 'first' });
    await verifyItemNotSelected({ id: 'first-nested' });

    // next list item - click parent items
    // select item first-nested
    // TODO: not working with space
    await t.pressKey('left').pressKey('enter').pressKey('right').pressKey('right');

    await verifyItemSelected({ id: 'first' });
    await verifyItemSelected({ id: 'first-nested' });

    for (const id of NEXT_LIST_ITEMS) {
      await verifyItemSelected({ id, hasSwitch: true });
    }
  },
);

// TODO: space not working in Firefox
test.page(getPage({ selectionMode: 'multiple' }))(
  'Should select accordion items in multiple mode with keyboard',
  async t => {
    async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await t.expect(getBaseItemSwitch(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
      } else {
        await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item "${id}" is not checked`);
        await t
          .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
          .eql('true', `checkbox for item "${id}" is not checked`);
      }
    }

    async function verifyItemPartiallySelected({ id }: { id: string }) {
      await t
        .expect(getBaseItem(id).getAttribute('data-checked'))
        .eql('true', `item "${id}" is not partially selected`);
      await t
        .expect(getBaseItemCheckbox(id).find('[data-indeterminate="true"]').exists)
        .ok(`checkbox for item "${id}" is not partially selected`);
    }

    async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
      if (hasSwitch) {
        await t
          .expect(getBaseItemSwitch(id).getAttribute('data-checked'))
          .eql('false', `item "${id}" shouldn't be checked`);
      } else {
        await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item "${id}" shouldn't be checked`);
        await t
          .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
          .eql('false', `checkbox for item "${id}" shouldn't be checked`);
      }
    }

    await t.expect(triggerElementSelector.exists).ok();
    // accordion item - select by inner items
    // select item 2
    await t.pressKey('tab').pressKey('down').pressKey('down').pressKey('down').pressKey('enter');
    // select item 3-0-0
    await t.pressKey('down').pressKey('right').pressKey('down').pressKey('right').pressKey('down').pressKey('enter');

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemPartiallySelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-0' });
    await verifyItemSelected({ id: '2', hasSwitch: true });

    // select item 3-0-1
    await t.pressKey('down').pressKey('enter');

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemSelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-1' });

    // deselect items 3-0-0 & 3-0-1
    await t.pressKey('enter').pressKey('up').pressKey('enter');

    await verifyItemNotSelected({ id: '3' });
    await verifyItemNotSelected({ id: '3-0' });
    await verifyItemNotSelected({ id: '3-0-0' });
    await verifyItemNotSelected({ id: '3-0-1' });

    // accordion list item - select by parent items
    // open collapse section 3-1
    await t.pressKey('down').pressKey('down').pressKey('right');
    // select item 3
    // TODO: not working with space
    await t.pressKey('up').pressKey('up').pressKey('up').pressKey('up').pressKey('enter');

    await verifyItemSelected({ id: '3' });
    await verifyItemSelected({ id: '3-0' });
    await verifyItemSelected({ id: '3-0-0' });
    await verifyItemSelected({ id: '3-0-1' });
    await verifyItemSelected({ id: '3-1' });
    await verifyItemSelected({ id: '3-1-0' });
    await verifyItemSelected({ id: '3-1-1' });

    // deselect item 3-0
    // TODO: not working with space
    await t.pressKey('down').pressKey('enter');

    await verifyItemPartiallySelected({ id: '3' });
    await verifyItemNotSelected({ id: '3-0' });
    await verifyItemNotSelected({ id: '3-0-0' });
    await verifyItemNotSelected({ id: '3-0-1' });
    await verifyItemSelected({ id: '3-1' });
    await verifyItemSelected({ id: '3-1-0' });
    await verifyItemSelected({ id: '3-1-1' });
  },
);
