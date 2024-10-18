import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'markdown-editor';

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'markdown-editor',
    props: {
      'data-test-id': TEST_ID,
      value: '10',
      ...props,
    },
    group: 'markdown',
  });

fixture('Markdown Editor');

test.page(getPage())('Rendered', async t => {
  const markdownEditor = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(markdownEditor.exists).ok();
});
