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
const getDisplayedValue = (wrapper: Selector) => wrapper.find(dataTestIdSelector('field-select__displayed-value'));

const expectOptionChecked = async (t: TestController, optionIds: string[]) => {
  for (const id of optionIds) {
    const attrs = await getOption(id).attributes;
    await t.expect(attrs['aria-selected']).eql('true', `option with id "${id}" is not selected`);
  }
};

const expectOptionNotChecked = async (t: TestController, optionIds: string[]) => {
  for (const id of optionIds) {
    await t.expect(getOption(id).find('input').checked).notOk(`option with id "${id}" is checked although shouldn't`);
  }
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
  hasCopyButton: true,
  hasValidationStates: true,
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

// open/close & required = false
test.page(visit({ value: 'Option 1', required: false }))(
  "Shouldn't open list on clearing value if not required",
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const list = Selector(dataTestIdSelector(LIST_TEST_ID));

    await t.click(getButtonClearValue(wrapper));

    await t.expect(list.exists).notOk("list is present although shouldn't");
  },
);

// open/close & required = true
test.page(visit({ value: 'Option 1', required: true }))('Should open list on clearing value if required', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const list = Selector(dataTestIdSelector(LIST_TEST_ID));

  await t.click(getButtonClearValue(wrapper));

  await t.expect(list.exists).ok('list is not present after clearing value');
});

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
  await t.pressKey('down').pressKey('down').pressKey('enter');
  await t.expect(list.exists).notOk('list is still present after selecting item');
  await t.expect(input.value).eql('Option 2', 'should go down & select item with space');

  // skip disabled item
  await t.pressKey('right'); // navigate to button first & then open
  await t.pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('down').pressKey('enter');
  await t.expect(input.value).eql('Option 11', 'should go down, skip disabled item & select active item');

  // do the same in the other direction
  // select 11th option
  await t.pressKey('down').pressKey('down').pressKey('down').pressKey('up').pressKey('enter');
  await t.expect(input.value).eql('Option 2', 'should go up & select item with space');

  // skip disabled item
  await t
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('down')
    .pressKey('up')
    .pressKey('enter');
  await t.expect(input.value).eql('Option 4', 'should go up, skip disabled item & select active item');
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
  await t.pressKey('down').pressKey('down').pressKey('enter');
  await t.expect(input.value).eql('Option 11', 'should go down & select item with space');

  // do the same in the other direction
  // select 11th option
  await t.pressKey('ctrl+a').pressKey('delete');
  await t.expect(options.count).eql(7);
  await t.typeText(input, '1');
  await t.pressKey('down').pressKey('down').pressKey('down').pressKey('up').pressKey('enter');
  await t.expect(input.value).eql('Option 11', 'should go up & select item with space');

  // get back into input & search until nothing is found
  await t.pressKey('ctrl+a').pressKey('1');
  await t.expect(options.count).eql(3);
  await t.pressKey('down').pressKey('up').pressKey('1');
  await t.expect(options.count).eql(1);
  await t.expect(options.nth(0).textContent).eql('Option 11');
  await t.pressKey('down').pressKey('up').pressKey('1');
  await t.expect(getNoData().exists).ok('no data is not present');
});

// FieldSelect.mode = Multi

// select item by mouse
test.page(visit({ value: 'Option 1', selectionMode: 'multi', searchable: false, required: true }))(
  'Should select multiple items with mouse',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const list = Selector(dataTestIdSelector(LIST_TEST_ID));

    await t.click(input);
    await t.expect(getDisplayedValue(wrapper).textContent).eql('Option 1', 'Option 1 is not selected at the beginning');
    await expectOptionChecked(t, ['op1']);

    // selecting items
    await t.click(getOption('op2'));
    await t.expect(list.exists).ok('list is not present after selecting item');
    await t.expect(getDisplayedValue(wrapper).textContent).eql('Selected: 2', 'should select 2 items');
    await expectOptionChecked(t, ['op1', 'op2']);

    // selecting disabled item
    await t.click(getOption('op5'));
    await t.expect(getDisplayedValue(wrapper).textContent).eql('Selected: 2', "shouldn't select disabled item");
    await expectOptionChecked(t, ['op1', 'op2']);
    await expectOptionNotChecked(t, ['op5']);

    // unselecting items
    await t.click(getOption('op1'));
    await t.expect(getDisplayedValue(wrapper).textContent).eql('Option 2', 'should leave only 2nd item');
    await expectOptionNotChecked(t, ['op1']);
    await expectOptionChecked(t, ['op2']);

    await t.click(getButtonClearValue(wrapper));
    await t.expect(getDisplayedValue(wrapper).exists).notOk('should clear all items');
    await expectOptionNotChecked(t, ['op2']);
  },
);

// close after selection
test.page(visit({ value: 'Option 1', selectionMode: 'multi', searchable: false, required: true }))(
  'Open/close list after selection multiple items',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const list = Selector(dataTestIdSelector(LIST_TEST_ID));

    // selecting items
    await t.click(input).click(getOption('op2'));
    await t.expect(list.exists).ok('list is not present after selecting item');

    // should close list on click
    await t.click(input).expect(list.exists).notOk('list is still present after input click');
    await t.click(input).expect(list.exists).ok('list is not present after second input click');
  },
);

// search & select item by mouse
test.page(visit({ value: 'Option 1', selectionMode: 'multi', searchable: true }))(
  'Should search & select multiple items with mouse',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const options = getOptions();

    await t.expect(getDisplayedValue(wrapper).textContent).eql('Option 1');

    // should search and select
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

    await t.expect(getDisplayedValue(wrapper).textContent).eql('Selected: 2');
    await t.expect(options.count).eql(3);
    await expectOptionChecked(t, ['op1', 'op11']);
  },
);

// close after search & selection
test.page(visit({ value: 'Option 1', selectionMode: 'multi', searchable: true }))(
  'Open/close list after search & selection multiple items',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));
    const input = getInputInner(wrapper);
    const options = getOptions();
    const list = Selector(dataTestIdSelector(LIST_TEST_ID));

    // should search and select
    await t.click(input).typeText(input, '1');
    await t.click(options.nth(1));

    // should keep list open after focus in input, but then it should close
    await t.click(input);
    await t.expect(list.exists).ok('list is not present after input focus');
    await t.expect(getDisplayedValue(wrapper).exists).notOk('display value is still present after input focus');
    await t.expect(input.value).eql('1', 'input value was lost');

    await t.click(input).expect(list.exists).notOk('list is still present after second input click');
    await t.click(input).expect(list.exists).ok('list is not present after third input click');
  },
);

// select item by keyboard
test.page(visit({ value: 'Option 1', selectionMode: 'multi', searchable: false }))(
  'Should select multiple items with keyboard',
  async t => {
    const wrapper = Selector(dataTestIdSelector(TEST_ID));

    // open list
    await t.pressKey('tab').pressKey('space');

    // select 2nd option
    await t.pressKey('down').pressKey('down').pressKey('enter');
    await t
      .expect(getDisplayedValue(wrapper).textContent)
      .eql('Selected: 2', 'should go down & select item with space');
    await expectOptionChecked(t, ['op1', 'op2']);

    // skip disabled item
    await t.pressKey('down').pressKey('down').pressKey('down').pressKey('enter');
    await t
      .expect(getDisplayedValue(wrapper).textContent)
      .eql('Selected: 3', 'should go down, skip disabled item & select active item');
    await expectOptionChecked(t, ['op1', 'op2', 'op11']);

    // do the same in the other direction
    // select 11th option
    await t
      .pressKey('esc')
      .pressKey('down')
      .pressKey('down')
      .pressKey('down')
      .pressKey('down')
      .pressKey('down')
      .pressKey('down')
      .pressKey('up')
      .pressKey('enter');
    await t
      .expect(getDisplayedValue(wrapper).textContent)
      .eql('Selected: 2', 'should go up & deselect item with space');
    await expectOptionChecked(t, ['op1', 'op2']);
    await expectOptionNotChecked(t, ['op11']);

    // skip disabled item
    await t.pressKey('up').pressKey('enter');
    await t
      .expect(getDisplayedValue(wrapper).textContent)
      .eql('Selected: 3', 'should go up, skip disabled item & select active item');
    await expectOptionChecked(t, ['op1', 'op2', 'op4']);
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
    await t.pressKey('down').pressKey('down').pressKey('enter');
    await t
      .expect(getDisplayedValue(wrapper).textContent)
      .eql('Selected: 2', 'input should return to display value after selection');
    await t.expect(options.count).eql(3);
    await t.pressKey('up').pressKey('up').pressKey('ctrl+a').pressKey('delete');
    await expectOptionChecked(t, ['op3', 'op11']);

    // do the same in the other direction
    // select 11th option
    await t.typeText(input, '1');
    await t.pressKey('down').pressKey('down').pressKey('down').pressKey('up').pressKey('enter');
    await t.expect(getDisplayedValue(wrapper).textContent).eql('Option 3', 'should go up & deselect item with space');
    await t.pressKey('up').pressKey('up').pressKey('ctrl+a').pressKey('delete');
    await expectOptionChecked(t, ['op3']);
    await expectOptionNotChecked(t, ['op11']);

    // get back into input & search until nothing is found
    await t.pressKey('1');
    await t.expect(options.count).eql(3);
    await t.pressKey('down').pressKey('up').pressKey('1');
    await t.expect(options.count).eql(1);
    await t.expect(options.nth(0).textContent).eql('Option 11');
    await t.pressKey('down').pressKey('up').pressKey('1');
    await t.expect(getNoData().exists).ok('no data is not present');
  },
);

test.page(visit())('should toggle droplist by clicks', async t => {
  const wrapper = Selector(dataTestIdSelector(TEST_ID));
  const icon = wrapper.find(dataTestIdSelector('icon-chevron-down-xs'));
  const getDropList = () => Selector(dataTestIdSelector(LIST_TEST_ID));

  await t.expect(getDropList().exists).notOk("drop list is present although shouldn't");
  await t.click(wrapper);
  await t.expect(getDropList().exists).ok('drop list is not present after click');
  await t.click(wrapper);
  await t.expect(getDropList().exists).notOk("drop list still present after click although shouldn't");

  await t.click(icon);
  await t.expect(getDropList().exists).ok('drop list is not present after clicking on icon');

  await t.click(wrapper);
  await t.expect(getDropList().exists).notOk("drop list still present after click although shouldn't");
  await t.pressKey('enter');
  await t.expect(getDropList().exists).ok('drop list is not present after enter');
});
