import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const DROPLIST_TRIGGER_TEST_ID = 'droplist-button-trigger';
const TEST_ID = 'new-droplist';

const getBaseItem = (id: string) => Selector(dataTestIdSelector(`list__base-item_${id}`)).find('button');
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
  await t.click(Selector(dataTestIdSelector(DROPLIST_TRIGGER_TEST_ID)));

  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok('droplist is missing');
});

test.page(getPage({ selection: 'single', marker: true }))(
  'Should not have marker on parent nodes & switch nodes',
  async t => {
    async function verifyMarkerPresent(id: string) {
      await t.expect(getBaseItemMarker(id).exists).ok(`item"${id}" don't have a marker`);
    }

    async function verifyMarkerNotPresent(id: string) {
      await t.expect(getBaseItemMarker(id).exists).notOk(`item"${id}" has a marker`);
    }

    await t.click(Selector(dataTestIdSelector(DROPLIST_TRIGGER_TEST_ID)));
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

test.page(getPage({ selection: 'single' }))('Should select items in single mode', async t => {
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

  await t.click(Selector(dataTestIdSelector(DROPLIST_TRIGGER_TEST_ID)));
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

test.page(getPage({ selection: 'multiple' }))('Should select items in multiple mode', async t => {
  async function verifyItemSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t.expect(getBaseItemSwitch(id).getAttribute('data-checked')).eql('true', `item"${id}" is not checked`);
    } else {
      await t.expect(getBaseItem(id).getAttribute('data-checked')).eql('true', `item"${id}" is not checked`);
      await t
        .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
        .eql('true', `checkbox for item"${id}" is not checked`);
    }
  }

  async function verifyItemNotSelected({ id, hasSwitch = false }: { id: string; hasSwitch?: boolean }) {
    if (hasSwitch) {
      await t
        .expect(getBaseItemSwitch(id).getAttribute('data-checked'))
        .eql('false', `item"${id}" shouldn't be checked`);
    } else {
      await t.expect(getBaseItem(id).hasAttribute('data-checked')).notOk(`item"${id}" shouldn't be checked`);
      await t
        .expect(getBaseItemCheckbox(id).getAttribute('data-checked'))
        .eql('false', `checkbox for item"${id}" shouldn't be checked`);
    }
  }

  await t.click(Selector(dataTestIdSelector(DROPLIST_TRIGGER_TEST_ID)));
  await t.click(getBaseItemCheckbox('first'));
  await t.hover(getBaseItem('first-nested'));
  await t.click(getBaseItem('first-nested-0-0'));

  await verifyItemSelected({ id: 'first' });
  await verifyItemNotSelected({ id: 'first-nested' });
  await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });

  await t.click(getBaseItem('3'));
  await t.click(getBaseItem('3-0'));
  await t.click(getBaseItem('3-0-0'));
  await t.click(getBaseItem('2'));
  await t.hover(getBaseItem('first'));
  await t.hover(getBaseItem('first-nested'));

  await verifyItemNotSelected({ id: '3' });
  await verifyItemNotSelected({ id: '3-0' });
  await verifyItemSelected({ id: '3-0-0' });
  await verifyItemSelected({ id: '2', hasSwitch: true });
  await verifyItemSelected({ id: 'first' });
  await verifyItemSelected({ id: 'first-nested-0-0', hasSwitch: true });
});

// keyboard navigation
