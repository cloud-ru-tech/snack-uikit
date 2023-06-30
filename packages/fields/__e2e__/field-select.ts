import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getButtonClearValue, getInput, runCommonTests, runTestsForOpenableFields } from './utils';

fixture('Field Select').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

const TEST_ID = 'field-select-test';
const COMPONENT_PREFIX = 'field-select';
const LIST_TEST_ID = 'field-select__list';

const getOptions = () => Selector(`*[data-test-id^="field-select__list-option-"]`);
const getOption = (id: string) => Selector(dataTestIdSelector(`field-select__list-option-${id}`));
const getNoData = () => Selector(dataTestIdSelector('field-select__no-data'));

const expectOptionChecked = async (t: TestController, optionIds: string[]) => {
  for (const id of optionIds) {
    await t.expect(getOption(id).find('input').checked).ok(`option with id "${id}" is not checked`);
  }
};

const expectOptionNotChecked = async (t: TestController, optionIds: string[]) => {
  for (const id of optionIds) {
    await t.expect(getOption(id).find('input').checked).notOk(`option with id "${id}" is checked although shouldn't`);
  }
};

const clearInput = async (t: TestController) => {
  await t.pressKey('ctrl+a').pressKey('delete');
};

const getInputInner = (wrapper: Selector) => getInput(wrapper, COMPONENT_PREFIX);

const visit = (props?: Record<string, unknown>): string =>
  getTestcafeUrl({
    group: 'fields',
    name: 'field-select',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

runCommonTests(props => visit(props), TEST_ID, {
  componentPrefix: COMPONENT_PREFIX,
  hasCounter: false,
  hasPlaceholder: true,
  hasPrefixIcon: true,
  hasClearButton: true,
  defaultValue: 'Option 1',
});

runTestsForOpenableFields(props => visit({ ...props, searchable: false }), TEST_ID, {
  dropListTestId: LIST_TEST_ID,
  iconTestId: 'icon-chevron-down-xs',
});

// searchable = false
test.page(visit({ value: '', searchable: false }))("Shouldn't allow to input text when searchable = false", async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);

  await t.typeText(input, 'Option').expect(input.value).eql('');
});

// open/close & searchable = true
test.page(visit({ value: 'Option 1', searchable: true }))(
  'Should open list when typing & reset input when closing list',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const list = Selector(dataTestIdSelector(LIST_TEST_ID));

    await t.pressKey('tab');
    await t.expect(list.exists).notOk("list is present although shouldn't");

    await t.pressKey('o');
    await t.expect(input.value).eql('o');
    await t.expect(list.exists).ok('list is not present after input');

    await t.pressKey('esc');
    await t.expect(list.exists).notOk('list is present after esc');
    await t.expect(input.value).eql('Option 1');
  },
);

// FieldSelect.mode = Single

// select item by mouse
test.page(visit({ value: 'Option 1', searchable: false }))('Should select items with mouse', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const list = Selector(dataTestIdSelector(LIST_TEST_ID));

  await t.click(input);
  await t.expect(input.value).eql('Option 1', 'Option 1 is not selected at the beginning');
  await expectOptionChecked(t, ['op1']);

  await t.click(getOption('op2'));
  await t.expect(list.exists).notOk('list is still present after selecting item');
  await t.expect(input.value).eql('Option 2', 'should select active item');

  // selecting disabled item
  await t.click(input);
  await expectOptionChecked(t, ['op2']);
  await t.click(getOption('op5'));
  await t.expect(list.exists).ok('list is not present after selecting disabled item');
  await t.expect(input.value).eql('Option 2', "shouldn't select disabled item");
});

// search & select item by mouse
test.page(visit({ value: '', searchable: true }))('Should search & select items with mouse', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const options = getOptions();

  await t.click(input);
  await t.expect(options.count).eql(7);

  await t.typeText(input, '1');

  await t.expect(options.count).eql(3);
  await t.expect(options.nth(0).textContent).eql('Option 1');
  await t.expect(options.nth(1).textContent).eql('Option 11');
  await t.expect(options.nth(2).textContent).eql('WOption 12');

  await t.click(options.nth(1));

  await t.expect(input.value).eql('Option 11');
});

// select item by keyboard
test.page(visit({ value: 'Option 1', searchable: false }))('Should select items with keyboard', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const list = Selector(dataTestIdSelector(LIST_TEST_ID));

  // open list
  await t.pressKey('tab').pressKey('space');

  // select 2nd option
  await t.pressKey('down').pressKey('down').pressKey('space');
  await t.expect(list.exists).notOk('list is still present after selecting item');
  await t.expect(input.value).eql('Option 2', 'should go down & select item with space');

  // skip disabled item
  await t.pressKey('space');
  await t.pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('space');
  await t.expect(input.value).eql('Option 11', 'should go down, skip disabled item & select active item');

  // go through list in a loop
  await t.pressKey('space');
  await t
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('space');
  await t.expect(input.value).eql('Option 2', 'should go down through list in a loop & select item');

  // do the same in the other direction
  // select 11th option
  await t.pressKey('space');
  await t.pressKey('up').pressKey('up').pressKey('space');
  await t.expect(input.value).eql('Option 11', 'should go up & select item with space');

  // skip disabled item
  await t.pressKey('space');
  await t.pressKey('up').pressKey('up').pressKey('up').pressKey('space');
  await t.expect(input.value).eql('Option 4', 'should go up, skip disabled item & select active item');

  // go through list in a loop
  await t.pressKey('space');
  await t
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('up')
    .pressKey('space');
  await t.expect(input.value).eql('Option 11', 'should go up through list in a loop & select item');
});

// search & select item by keyboard
test.page(visit({ value: 'Option 3', searchable: true }))('Should search & select items with keyboard', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const input = getInputInner(wrapper);
  const options = getOptions();

  // search & open list
  await t.pressKey('tab').typeText(input, '1');
  await t.expect(options.count).eql(3);

  // select 2nd option
  await t.pressKey('down').pressKey('down').pressKey('space');
  await t.expect(input.value).eql('Option 11', 'should go down & select item with space');

  // go through list in a loop
  await clearInput(t);

  await t.expect(options.count).eql(7);

  await t.typeText(input, '1');
  await t.pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('space');
  await t.expect(input.value).eql('Option 1', 'should go down through list in a loop & select item');

  // do the same in the other direction
  // select 11th option
  await clearInput(t);
  await t.typeText(input, '1');
  await t.pressKey('up').pressKey('up').pressKey('space');
  await t.expect(input.value).eql('Option 11', 'should go up & select item with space');

  // go through list in a loop
  await clearInput(t);
  await t.typeText(input, '1');
  await t.pressKey('up').pressKey('up').pressKey('up').pressKey('up').pressKey('up').pressKey('space');
  await t.expect(input.value).eql('Option 12', 'should go up through list in a loop & select item');

  // get back into input & search until nothing is found
  await clearInput(t);
  await t.pressKey('1');
  await t.pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('1');
  await t.expect(options.count).eql(1);
  await t.expect(options.nth(0).textContent).eql('Option 11');
  await t.pressKey('up').pressKey('up').pressKey('1');
  await t.expect(getNoData().exists).ok('no data is not present');
});

// FieldSelect.mode = Multi

// select item by mouse
test.page(visit({ value: 'Option 1', selectionMode: 'multi', searchable: false }))(
  'Should select multiple items with mouse',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const list = Selector(dataTestIdSelector(LIST_TEST_ID));

    await t.click(input);
    await t.expect(input.value).eql('Option 1', 'Option 1 is not selected at the beginning');
    await expectOptionChecked(t, ['op1']);

    // selecting items
    await t.click(getOption('op2'));
    await t.expect(list.exists).ok('list is not present after selecting item');
    await t.expect(input.value).eql('Selected: 2', 'should select 2 items');
    await expectOptionChecked(t, ['op1', 'op2']);

    // selecting disabled item
    await t.click(getOption('op5'));
    await t.expect(input.value).eql('Selected: 2', "shouldn't select disabled item");
    await expectOptionChecked(t, ['op1', 'op2']);
    await expectOptionNotChecked(t, ['op5']);

    // unselecting items
    await t.click(getOption('op1'));
    await t.expect(input.value).eql('Option 2', 'should leave only 2nd item');
    await expectOptionNotChecked(t, ['op1']);
    await expectOptionChecked(t, ['op2']);

    await t.click(getButtonClearValue(wrapper));
    await t.expect(input.value).eql('', 'should clear all items');
    await expectOptionNotChecked(t, ['op2']);

    // close list
    await t.pressKey('esc');
    await t.expect(list.exists).notOk('list is not present after selecting item');
  },
);

// search & select item by mouse
test.page(visit({ value: 'Option 1', selectionMode: 'multi', searchable: true }))(
  'Should search & select multiple items with mouse',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const options = getOptions();

    await t.expect(input.value).eql('Option 1');

    await t.click(input);
    await t.expect(options.count).eql(7);
    await t.expect(input.value).eql('');

    await t.typeText(input, '1');

    await t.expect(input.value).eql('1');
    await t.expect(options.count).eql(3);
    await t.expect(options.nth(0).textContent).eql('Option 1');
    await t.expect(options.nth(1).textContent).eql('Option 11');
    await t.expect(options.nth(2).textContent).eql('WOption 12');

    await t.click(options.nth(1));

    await t.expect(input.value).eql('Selected: 2');
    await t.expect(options.count).eql(3);
    await expectOptionChecked(t, ['op1', 'op11']);

    await t.pressKey('esc');
    await t.expect(input.value).eql('Selected: 2');
  },
);

// select item by keyboard
test.page(visit({ value: 'Option 1', selectionMode: 'multi', searchable: false }))(
  'Should select multiple items with keyboard',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);

    // open list
    await t.pressKey('tab').pressKey('space');

    // select 2nd option
    await t.pressKey('down').pressKey('down').pressKey('space');
    await t.expect(input.value).eql('Selected: 2', 'should go down & select item with space');
    await expectOptionChecked(t, ['op1', 'op2']);

    // skip disabled item
    await t.pressKey('down').pressKey('down').pressKey('down').pressKey('space');
    await t.expect(input.value).eql('Selected: 3', 'should go down, skip disabled item & select active item');
    await expectOptionChecked(t, ['op1', 'op2', 'op11']);

    // go through list in a loop
    await t.pressKey('down').pressKey('down').pressKey('down').pressKey('space');
    await t.expect(input.value).eql('Selected: 2', 'should go down through list in a loop & unselect item');
    await expectOptionChecked(t, ['op1', 'op11']);
    await expectOptionNotChecked(t, ['op2']);

    // do the same in the other direction
    // select 11th option
    await t.pressKey('esc').pressKey('tab').pressKey('space');
    await t.pressKey('up').pressKey('up').pressKey('space');
    await t.expect(input.value).eql('Option 1', 'should go up & deselect item with space');
    await expectOptionChecked(t, ['op1']);
    await expectOptionNotChecked(t, ['op11']);

    // skip disabled item
    await t.pressKey('up').pressKey('space');
    await t.expect(input.value).eql('Selected: 2', 'should go up, skip disabled item & select active item');
    await expectOptionChecked(t, ['op1', 'op4']);

    // go through list in a loop
    await t.pressKey('up').pressKey('up').pressKey('up').pressKey('up').pressKey('up').pressKey('space');
    await t.expect(input.value).eql('Selected: 3', 'should go up through list in a loop & select item');
    await expectOptionChecked(t, ['op1', 'op4', 'op11']);
  },
);

// search & select item by keyboard
test.page(visit({ value: 'Option 3', selectionMode: 'multi', searchable: true }))(
  'Should search & select multiple items with keyboard',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const options = getOptions();

    // search & open list
    await t.pressKey('tab').typeText(input, '1');
    await t.expect(input.value).eql('1', 'text is not entered');
    await t.expect(options.count).eql(3);

    // select 2nd option
    await t.pressKey('down').pressKey('down').pressKey('space');
    await t.expect(input.value).eql('Selected: 2', 'input should return to display value after selection');
    await t.expect(options.count).eql(3);
    await t.pressKey('up').pressKey('up');
    await clearInput(t);
    await expectOptionChecked(t, ['op3', 'op11']);

    // go through list in a loop
    await t.typeText(input, '1');
    await t.pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('space');
    await t.pressKey('up');
    await clearInput(t);
    await expectOptionChecked(t, ['op1', 'op3', 'op11']);

    // do the same in the other direction
    // select 11th option
    await t.typeText(input, '1');
    await t.pressKey('up').pressKey('up').pressKey('space');
    await t.pressKey('down').pressKey('down');
    await clearInput(t);
    await expectOptionChecked(t, ['op1', 'op3']);
    await expectOptionNotChecked(t, ['op11']);

    // go through list in a loop
    await t.typeText(input, '1');
    await t.pressKey('up').pressKey('up').pressKey('up').pressKey('up').pressKey('up').pressKey('space');
    await t.pressKey('down');
    await clearInput(t);
    await expectOptionChecked(t, ['op1', 'op3', 'op12']);

    // get back into input & search until nothing is found
    await t.pressKey('1');
    await t.pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('1');
    await t.expect(options.count).eql(1);
    await t.expect(options.nth(0).textContent).eql('Option 11');
    await t.pressKey('up').pressKey('up').pressKey('1');
    await t.expect(getNoData().exists).ok('no data is not present');
  },
);
