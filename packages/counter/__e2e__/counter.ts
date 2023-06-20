import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Variant } from '../src/components/constants';

const TEST_ID = 'progress-bar-test';

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'counter',
    props: {
      'data-test-id': TEST_ID,
      value: 9,
      ...props,
    },
  });

fixture('Counter');

test.page(getPage())('Rendered', async t => {
  const counter = Selector(dataTestIdSelector(TEST_ID));
  await t.expect(counter.exists).ok();
  await t.expect(counter.textContent).eql('9');
});

test.page(getPage({ value: 10, variant: Variant.CountPlus }))('Rendered with variant = plus', async t => {
  const counter = Selector(dataTestIdSelector(TEST_ID));
  await t.expect(counter.exists).ok();
  await t.expect(counter.textContent).eql('9+');
});

test.page(getPage({ value: 8500, variant: Variant.CountK }))('Rendered with variant = key', async t => {
  const counter = Selector(dataTestIdSelector(TEST_ID));
  await t.expect(counter.exists).ok();
  await t.expect(counter.textContent).eql('9K');
});

test.page(getPage({ value: 150, plusLimit: 100, variant: Variant.CountPlus }))(
  'Should change the plus limit',
  async t => {
    const counter = Selector(dataTestIdSelector(TEST_ID));
    await t.expect(counter.exists).ok();
    await t.expect(counter.textContent).eql('99+');
  },
);
