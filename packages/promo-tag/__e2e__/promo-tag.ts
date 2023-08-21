import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'promo-tag';

function getPage(props: object = {}) {
  return getTestcafeUrl({
    name: 'promo-tag',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('PromoTag');

test.page(getPage())('Should be rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
});

test.page(getPage({ text: 'Super promo tag' }))('Should has children text', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).innerText).eql('Super promo tag');
});
