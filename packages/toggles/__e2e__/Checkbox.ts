import { ClientFunction, fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('Checkbox');

const focus = ClientFunction((selector: string) => {
  document.querySelector<HTMLElement>(selector)?.focus();
});

const TEST_ID = 'checkbox';
const TEST_ID_NATIVE = `${TEST_ID}-native-input`;

const CHECKBOX = dataTestIdSelector(TEST_ID);
const NATIVE_CHECKBOX = dataTestIdSelector(TEST_ID_NATIVE);

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'toggles-checkbox',
    story: 'checkbox',
    props: {
      ...props,
      'data-test-id': 'checkbox',
    },
  });

test.page(getPage())('Should be switched to checked by click', async t => {
  await t.expect(Selector(NATIVE_CHECKBOX).checked).eql(false, "checked shouldn't be set at start");
  await t.click(Selector(CHECKBOX));
  await t.expect(Selector(NATIVE_CHECKBOX).checked).eql(true, 'checked should be set');
});

test.page(getPage({ disabled: true }))("Shouldn't be switched to checked by click if disabled", async t => {
  await t.expect(Selector(NATIVE_CHECKBOX).checked).eql(false, "checked shouldn't be set at start");
  await t.click(Selector(CHECKBOX));
  await t.expect(Selector(NATIVE_CHECKBOX).checked).eql(false, "checked shouldn't be set");
});

// FIXME: этот падает в firefox
// https://github.com/DevExpress/testcafe/issues/6969
// test.page(getPage())('Should be switched by keyboard', async t => {
//   await t.expect(Selector(NATIVE_CHECKBOX).checked).eql(false, "checked shouldn't be set at start");
//   await focus(NATIVE_CHECKBOX);
//   await t.pressKey('space');
//   await t.expect(Selector(NATIVE_CHECKBOX).checked).eql(true, 'checked should be set');
// });

test.page(getPage({ disabled: true }))("Shouldn't be switched by keyboard if disabled", async t => {
  await t.expect(Selector(NATIVE_CHECKBOX).checked).eql(false, "checked shouldn't be set at start");
  await focus(NATIVE_CHECKBOX);
  await t.pressKey('space');
  await t.expect(Selector(NATIVE_CHECKBOX).checked).eql(false, "checked shouldn't be set");
});

test.page(
  getPage({
    id: 'test-id',
    name: 'test-name',
  }),
)('Should set id and name to native checkbox', async t => {
  const attrs = await Selector(NATIVE_CHECKBOX).attributes;
  await t.expect(Selector(NATIVE_CHECKBOX).id).eql('test-id', 'should have id value');
  await t.expect(attrs.name).eql('test-name', 'should have name value');
});
