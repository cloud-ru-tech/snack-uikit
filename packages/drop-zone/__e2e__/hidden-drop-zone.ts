import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'hidden-drop-zone';

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'hidden-drop-zone',
    group: 'drop-zone',
    story: 'hidden-drop-zone',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Hidden Drop Zone');

test.page(getPage())('After dropping the file, the values in the form remain', async t => {
  const form = Selector('#form');
  const firstName = Selector('#firstName');
  const lastName = Selector('#lastName');

  const dropZone = Selector(dataTestIdSelector(TEST_ID));

  await t.typeText(firstName, 'Имя').typeText(lastName, 'Фамилия');

  await t.expect(form.exists).ok().dispatchEvent(form, 'dragover').dispatchEvent(dropZone, 'dragleave');

  await t.expect(firstName.value).eql('Имя').expect(lastName.value).eql('Фамилия');
});
