import { DropZoneProps } from '@snack-ui/drop-zone';
import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'drop-zone';

const getPage = (props: Partial<DropZoneProps> = {}) =>
  getTestcafeUrl({
    name: 'drop-zone',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Drop Zone');

test.page(getPage())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
  await t.expect(Selector(dataTestIdSelector('description')).exists).ok();
});

test.page(getPage({ description: '' }))('Rendered without description', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_ID)).exists).ok();
  await t.expect(Selector(dataTestIdSelector('description')).exists).notOk();
});
