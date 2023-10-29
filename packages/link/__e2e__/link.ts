import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'link-on-surface-test';
const EXTERNAL_ICON_TEST_ID = 'link__external-icon';

const getPageUrl = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'link',
    props: {
      'data-test-id': TEST_ID,
      external: false,
      ...props,
    },
  });

fixture('Link');

test.page(getPageUrl())('Rendered', async t => {
  const link = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(link.exists).ok();
  await t.expect(link.find(dataTestIdSelector(EXTERNAL_ICON_TEST_ID)).exists).notOk();
});

test.page(getPageUrl({ external: true }))('Rendered with external icon', async t => {
  const link = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(link.find(dataTestIdSelector(EXTERNAL_ICON_TEST_ID)).exists).ok();
});
