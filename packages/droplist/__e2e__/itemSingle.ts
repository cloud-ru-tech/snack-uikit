import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'item';
const ITEM_SELECTOR = dataTestIdSelector(TEST_ID);
const BUTTON_SELECTOR = dataTestIdSelector('button-with-droplist');
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

test.page(getPage())('Should rendered 3 items', async t => {
  await t.expect(Selector(ITEM_SELECTOR).exists).notOk();
  await t.click(Selector(BUTTON_SELECTOR));
  await t.expect(Selector(ITEM_SELECTOR).count).eql(3);
});

test.page(getPage())('Should set checked for inner checkbox by click', async t => {
  await t.click(Selector(BUTTON_SELECTOR));
  await t.click(Selector(ITEM_SELECTOR).nth(1));
  await t.expect(Selector(ITEM_SELECTOR).nth(1).find('input[type=checkbox]').checked).ok();
});

test.page(getPage())('Should render tag, caption and description elements if passed relevant props', async t => {
  await t.click(Selector(BUTTON_SELECTOR));
  await t.expect(Selector(TAG_SELECTOR).count).eql(3);
  await t.expect(Selector(CAPTION_SELECTOR).count).eql(3);
  await t.expect(Selector(DESCRIPTION_SELECTOR).count).eql(3);
});

test.page(getPage({ tagLabel: undefined, caption: undefined, description: undefined }))(
  'Shouldn`t render tag, caption and description elements if relevant props aren`t passed',
  async t => {
    await t.click(Selector(BUTTON_SELECTOR));
    await t.expect(Selector(TAG_SELECTOR).count).eql(0);
    await t.expect(Selector(CAPTION_SELECTOR).count).eql(0);
    await t.expect(Selector(DESCRIPTION_SELECTOR).count).eql(0);
  },
);
