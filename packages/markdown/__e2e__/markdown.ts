import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'markdown';

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'markdown',
    props: {
      'data-test-id': TEST_ID,
      value: '10',
      ...props,
    },
    group: 'markdown',
  });

fixture('Markdown');

test.page(getPage())('Rendered', async t => {
  const markdown = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(markdown.exists).ok();
});
