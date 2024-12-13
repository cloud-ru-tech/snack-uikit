import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT } from '../src/constants';

const TEST_ID = 'rating-test';

function getPage(props: Record<string, unknown> = {}) {
  return getTestcafeUrl({
    name: 'rating',
    story: 'rating',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Rating');

test.page(getPage())('Renders with default props', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();

  if (!DEFAULT_RATING_VALUE) {
    await t.expect(Selector(dataTestIdSelector(TEST_ID)).child().withAttribute('aria-checked', 'true').exists).notOk();
  } else {
    await t
      .expect(Selector(dataTestIdSelector(TEST_ID)).child().withAttribute('aria-checked', 'true').count)
      .eql(DEFAULT_RATING_VALUE, 'should be rendered with default number of stars checked');
  }

  await t
    .expect(Selector(dataTestIdSelector(TEST_ID)).child().withAttribute('role', 'radio').count)
    .eql(DEFAULT_STAR_COUNT, 'should be rendered with default number of stars');
});

test.page(getPage({ defaultValue: 3 }))('Renders with custom number of stars checked', async t => {
  await t
    .expect(Selector(dataTestIdSelector(TEST_ID)).child().withAttribute('aria-checked', 'true').count)
    .eql(3, 'should be rendered with custom number of stars checked');
});

test.page(getPage({ count: 10 }))('Renders with custom stars number', async t => {
  await t
    .expect(Selector(dataTestIdSelector(TEST_ID)).child().withAttribute('role', 'radio').count)
    .eql(10, 'should be rendered with custom number of stars');
});
