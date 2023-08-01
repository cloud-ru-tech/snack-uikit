import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'item';
const ITEM_SELECTOR = dataTestIdSelector(TEST_ID);
const CHECKBOX_SELECTOR = `${ITEM_SELECTOR} > input[type=checkbox]`;
const TAG_SELECTOR = dataTestIdSelector(`tag-${TEST_ID}`);
const CAPTION_SELECTOR = dataTestIdSelector(`caption-${TEST_ID}`);
const DESCRIPTION_SELECTOR = dataTestIdSelector(`description-${TEST_ID}`);

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'droplist',
    story: 'item-single',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Droplist/ItemSingle');

test.page(getPage())('Should be rendered', async t => {
  await t.expect(Selector(ITEM_SELECTOR).exists).ok();
});

test.page(getPage())('Should not have checkbox', async t => {
  await t.expect(Selector(CHECKBOX_SELECTOR).exists).notOk();
});

test.page(getPage({ checked: true }))('Should not have checked checkbox', async t => {
  await t.expect(Selector(CHECKBOX_SELECTOR).exists).notOk();
});

test.page(getPage({ caption: 'capt', tagLabel: 'some tag', description: 'descr' }))('Should have texts', async t => {
  await t.expect(Selector(TAG_SELECTOR).innerText).eql('some tag');
  await t.expect(Selector(CAPTION_SELECTOR).innerText).eql('capt');
  await t.expect(Selector(DESCRIPTION_SELECTOR).innerText).eql('descr');
});
