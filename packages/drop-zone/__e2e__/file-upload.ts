import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'file-upload';

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'file-upload',
    group: 'drop-zone',
    story: 'file-upload',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('File Upload');

test.page(getPage())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
});
