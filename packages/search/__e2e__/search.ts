import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { PRIVATE_SEARCH_TEST_IDS, TEST_IDS } from '../src/constants';
import { TEST_ID_SUBMIT_TOASTER } from '../stories/constants';
import { generateOptions } from '../stories/helpers';

const TEST_ID = 'search-test';
const VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY = 500;

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'search',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Search');

function getSelectors() {
  return {
    input: Selector(dataTestIdSelector(PRIVATE_SEARCH_TEST_IDS.input)),
    list: Selector(dataTestIdSelector(TEST_IDS.droplist)),
    option: Selector(dataTestIdSelector(TEST_IDS.option)),
    submitToaster: Selector(dataTestIdSelector(TEST_ID_SUBMIT_TOASTER)),
    buttonClear: Selector(dataTestIdSelector(PRIVATE_SEARCH_TEST_IDS.buttonClearValue)),
    iconSun: Selector(dataTestIdSelector(PRIVATE_SEARCH_TEST_IDS.iconSun)),
    iconSearch: Selector(dataTestIdSelector(PRIVATE_SEARCH_TEST_IDS.iconSearch)),
  };
}

test.page(getPage({ autocomplete: true }))(
  `Should open list when typing & won't reset input when closing list`,
  async t => {
    const { input, list } = getSelectors();

    await t.pressKey('tab');
    await t.expect(list.exists).notOk("list is present although shouldn't");

    await t.pressKey('o');
    await t.expect(input.value).eql('o').wait(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await t.expect(list.exists).ok('list is not present after input');

    await t.pressKey('esc');
    await t.expect(list.exists).notOk('list is present after esc');
    await t.expect(input.value).eql('o');
  },
);

test.page(getPage({ autocomplete: true }))(
  `Should call submit action by click on option in list and blur input`,
  async t => {
    const { input, list, option, submitToaster } = getSelectors();

    await t.pressKey('tab');
    await t.expect(list.exists).notOk("list is present although shouldn't");

    await t.pressKey('o');
    await t.expect(input.value).eql('o').wait(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
    await t.expect(list.exists).ok('list is not present after input');

    await t.click(option);

    const optionValue = generateOptions('o')[0].option;
    await t.expect(input.value).eql(optionValue);

    await t.expect(submitToaster.exists).notOk('submit toast not present after option click');
    await t.expect(input.focused).notOk('input should be blur after option click');
  },
);

test.page(getPage({ autocomplete: true }))(`Should clear input by click on ButtonClear`, async t => {
  const { input, list, buttonClear } = getSelectors();

  await t.pressKey('tab');
  await t.expect(list.exists).notOk("list is present although shouldn't");

  await t.pressKey('o');
  await t.expect(input.value).eql('o').wait(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
  await t.expect(list.exists).ok('list is not present after input');

  await t.expect(buttonClear.exists).ok('Should render button clear when input not empty');
  await t.click(buttonClear);

  await t.expect(input.value).eql('');
  await t.expect(list.exists).notOk('Should hide list when input not empty');
});

test.page(getPage({ autocomplete: true }))(`Should be controlled by keyboard`, async t => {
  const { input, list, option, buttonClear } = getSelectors();

  await t.pressKey('tab');
  await t.expect(list.exists).notOk("list is present although shouldn't");

  await t.pressKey('o');
  await t.expect(input.value).eql('o').wait(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);

  await t.pressKey('down');

  await t.expect(option.focused).ok('Option should be focused  by ArrowDown press');

  await t.pressKey('up');
  await t.expect(input.focused).ok('Input should be focused by ArrowUp press');

  await t.pressKey('right');
  await t.expect(buttonClear.focused).ok('ButtonClear should be focused by ArrowRight press');

  await t.pressKey('tab');
  await t.expect(input.focused).notOk('Input should be blur after tab press');
});

test.page(getPage({ autocomplete: true }))(`Should handle keypress while focus on option`, async t => {
  const { input, list, option } = getSelectors();

  await t.pressKey('tab');
  await t.expect(list.exists).notOk("list is present although shouldn't");

  await t.pressKey('o');
  await t.expect(input.value).eql('o').wait(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);

  await t.pressKey('down');
  await t.expect(option.focused).ok('Option should be focused by ArrowDown press');

  await t.pressKey('o');
  await t.expect(input.value).eql('oo').wait(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
});

test.page(getPage({ autocomplete: false }))(`Should be render without list`, async t => {
  const { input, list } = getSelectors();

  await t.pressKey('tab');
  await t.expect(list.exists).notOk("list is present although shouldn't");

  await t.pressKey('o').wait(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);
  await t.expect(input.value).eql('o');

  await t.expect(list.exists).notOk("list is present although shouldn't");
});

test.page(getPage({ autocomplete: false }))(`Should be changed icon`, async t => {
  const { input, iconSearch, iconSun } = getSelectors();

  await t.pressKey('tab');
  await t.expect(iconSearch.exists).ok('icon search should be rendered');

  await t.pressKey('o');
  await t.expect(input.value).eql('o');

  await t.expect(iconSun.exists).ok('icon sun should be rendered when loading');
});

test.page(getPage({ autocomplete: false }))(`Should call submit by Enter click`, async t => {
  const { input, submitToaster } = getSelectors();

  await t.pressKey('tab');

  await t.pressKey('o');
  await t.expect(input.value).eql('o').wait(VALUE_LITTLE_MORE_DEBOUNCE_IN_HISTORY);

  await t.pressKey('enter');
  await t.expect(input.value).eql('o');

  await t.expect(submitToaster.exists).notOk('submit toast not present after enter click');
  await t.expect(input.focused).notOk('input should be blur after enter click');
});
