import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'tag-test';
const CLOSE_BUTTON_DATA_TEST_ID = 'tag-remove-button';

function getPage(removableMode: boolean) {
  return getTestcafeUrl({
    name: 'tag',
    story: 'tag',
    group: 'tag',
    props: {
      'data-test-id': TEST_ID,
      removableMode,
    },
  });
}

fixture('Tag');

test.page(getPage(false))('Without remove button', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
  await t
    .expect(Selector(dataTestIdSelector(TEST_ID)).find(dataTestIdSelector(CLOSE_BUTTON_DATA_TEST_ID)).exists)
    .notOk();
});

test.page(getPage(true))('With remove button', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).find(dataTestIdSelector(CLOSE_BUTTON_DATA_TEST_ID)).exists).ok();
  await t
    .click(Selector(dataTestIdSelector(CLOSE_BUTTON_DATA_TEST_ID)))
    .expect(Selector(dataTestIdSelector(TEST_ID)).exists)
    .notOk();
});
