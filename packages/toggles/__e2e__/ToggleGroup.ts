import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { SELECTION_MODE } from '../src/constants';

fixture('ToggleGroup');

const selectItem = (index: number) => Selector(dataTestIdSelector(`item-${index}`));
const validateState = (t: TestController) => async (items: boolean[], title: string) => {
  for (const [index, checked] of Object.entries(items)) {
    const { 'data-checked': isChecked } = await selectItem(Number(index) + 1).attributes;
    await t.expect(isChecked).eql(String(checked), `${title}: wrong checked state of item: ${index}`);
  }
};

const getPage = (props: Record<string, unknown>) =>
  getTestcafeUrl({
    name: 'toggles-toggle-group',
    story: 'toggle-group',
    props,
  });

test.page(getPage({ selectionMode: SELECTION_MODE.Single }))('Single mode - can select the only one item', async t => {
  await validateState(t)([false, false, false, false], 'Initial state');
  await t.click(selectItem(3));
  await validateState(t)([false, false, true, false], 'After click to 3');
  await t.click(selectItem(2));
  await validateState(t)([false, true, false, false], 'After click to 2');
  await t.click(selectItem(2));
  await validateState(t)([false, false, false, false], 'After second click to 2');
});

test.page(getPage({ selectionMode: SELECTION_MODE.Multiple }))('Multiple mode - can select several items', async t => {
  await validateState(t)([false, false, false, false], 'Initial state');
  await t.click(selectItem(3));
  await validateState(t)([false, false, true, false], 'After click to 3');
  await t.click(selectItem(2));
  await validateState(t)([false, true, true, false], 'After click to 2');
  await t.click(selectItem(2));
  await validateState(t)([false, false, true, false], 'After second click to 2');
});
