import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'code-editor';

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'code-editor',
    props: {
      'data-test-id': TEST_ID,
      value: 9,
      ...props,
    },
  });

fixture('Code Editor');

test.page(getPage())('Rendered', async t => {
  const codeEditor = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(codeEditor.exists).ok();
});
