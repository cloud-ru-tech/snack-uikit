import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { CHIP_CHOICE_ROW_IDS, CHIP_CHOICE_TEST_IDS } from '../src/constants';
import { DEFAULT_VALUES, STORY_TEST_IDS } from '../stories/forTests';

const TEST_ID = 'chip-choice-row';

const getPageUrl = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'chipchoicerow',
    story: 'chip-choice-row',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
    group: 'chips',
  });

function getComponent() {
  return {
    row: Selector(dataTestIdSelector(TEST_ID)),
    state: Selector(dataTestIdSelector(STORY_TEST_IDS.State)),
    addButton: Selector(dataTestIdSelector(CHIP_CHOICE_ROW_IDS.addButton)),
    addButtonOption: (optionId: string) =>
      Selector(dataTestIdSelector(`${CHIP_CHOICE_ROW_IDS.addButtonOption}-${optionId}`)),
    addButtonTooltip: Selector(dataTestIdSelector(CHIP_CHOICE_ROW_IDS.addButtonTooltip)),
    clearButton: Selector(dataTestIdSelector(CHIP_CHOICE_ROW_IDS.clearButton)),

    pinnedMulti: Selector(dataTestIdSelector(STORY_TEST_IDS.Multiple2)),
    pinnedDate: Selector(dataTestIdSelector(STORY_TEST_IDS.Date)),

    single: Selector(dataTestIdSelector(STORY_TEST_IDS.Single2)),
    dateTime: Selector(dataTestIdSelector(STORY_TEST_IDS.DateTime)),
    dateRange: Selector(dataTestIdSelector(STORY_TEST_IDS.DateRange)),

    listOption: (optionId: string) => Selector(dataTestIdSelector(`list__base-item_${optionId}`)),
    chipList: Selector(dataTestIdSelector(`chip-choice__droplist`)),
    chip: Selector(dataTestIdSelector('chip-choice-row__').replace('=', '^=')),
  };
}

fixture('ChipChoiceRow');

test.page(getPageUrl({ useDefaultValues: false }))(
  'Should render ClearAllButton when pinned filter is changed',
  async t => {
    const { clearButton, pinnedMulti, listOption } = getComponent();

    await t.expect(clearButton.exists).notOk("Clear button exists although shouldn't");

    await t.click(pinnedMulti).click(listOption('vm-2'));

    await t.expect(clearButton.exists).ok('Clear button is missing');
  },
);

test.page(getPageUrl({ useDefaultValues: false }))(
  'Should render ClearAllButton when usual filter is added',
  async t => {
    const { clearButton, addButton, addButtonOption, listOption } = getComponent();

    await t.expect(clearButton.exists).notOk("Clear button exists although shouldn't");

    await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.Single2)).click(listOption('true'));

    await t.expect(clearButton.exists).ok('Clear button is missing');
  },
);

test.page(getPageUrl({ useDefaultValues: false, showClearButton: false }))(
  'Should not render ClearAllButton with showClearAllButton=false',
  async t => {
    const { clearButton, pinnedMulti, listOption, addButton, addButtonOption } = getComponent();

    await t.click(pinnedMulti).click(listOption('vm-2'));
    await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.Single2)).click(listOption('true'));

    await t.expect(clearButton.exists).notOk("Clear button exists although shouldn't");
  },
);

test.page(getPageUrl({ showAddButton: false }))('Should show add button when showAddButton = false', async t => {
  const { addButton } = getComponent();

  await t.expect(addButton.exists).notOk("Add button exists although shouldn't");
});

test.page(getPageUrl({ useDefaultValues: false }))('Add button should allow to add new chips', async t => {
  const { single, dateRange, addButton, addButtonOption, chip, chipList } = getComponent();

  await t.expect(single.exists).notOk("Single chip exists although shouldn't");
  await t.expect(dateRange.exists).notOk("Date range chip exists although shouldn't");

  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.DateRange));

  await t.expect(dateRange.exists).ok('Date range chip was not added');
  await t.expect(chipList.exists).ok('Date range chip list is not open');

  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.Single2));

  await t.expect(single.exists).ok('Single chip was not added');
  await t.expect(chipList.exists).ok('Single chip list is not open');

  await t.expect(chip.nth(2).getAttribute('data-test-id')).eql(STORY_TEST_IDS.DateRange);
  await t.expect(chip.nth(3).getAttribute('data-test-id')).eql(STORY_TEST_IDS.Single2);
});

test.page(getPageUrl())('Should show add button tooltip when no more filter is possible to add', async t => {
  const { addButton, addButtonOption, addButtonTooltip } = getComponent();

  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.Multiple1));
  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.Single1));
  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.DateTime));
  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.DateTimeAndSec));
  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.TimeAndSec));
  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.Custom));
  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.MultipleManyOption));
  await t.hover(addButton);

  await t.expect(addButtonTooltip.exists).ok('Add button tooltip is missing');
});

test.page(getPageUrl({ useDefaultValues: false }))('Should change state after interaction with chips', async t => {
  const { row, state, pinnedMulti, listOption, addButton, addButtonOption } = getComponent();

  await t.expect(row.exists).ok();
  await t.expect(state.innerText).eql('{}');

  await t.click(pinnedMulti).click(listOption('vm-2'));
  await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.Single2)).click(listOption('true'));

  await t.expect(state.innerText).eql(JSON.stringify({ multiple2: ['vm-2'], single2: 'true' }));
});

test.page(getPageUrl())('Should clear state after ClearAllButton click', async t => {
  const { state, clearButton } = getComponent();

  await t.expect(state.innerText).eql(JSON.stringify(DEFAULT_VALUES));
  await t.click(clearButton);

  await t
    .expect(state.innerText)
    .eql(JSON.stringify({ multiple2: DEFAULT_VALUES.multiple2, date: DEFAULT_VALUES.date }));
});

test.page(getPageUrl({ useDefaultValues: false, showClearButton: false }))(
  'Should clear state after pinned chip clear button click',
  async t => {
    const { state, single, listOption, addButton, addButtonOption } = getComponent();

    await t.click(addButton).click(addButtonOption(STORY_TEST_IDS.Single2)).click(listOption('true'));

    await t.expect(state.innerText).eql(JSON.stringify({ single2: 'true' }));

    const clearButton = single.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.clearButton));
    await t.click(clearButton);

    await t.expect(state.innerText).eql('{}');
  },
);

test.page(getPageUrl({ useDefaultValues: false, showClearButton: false }))(
  'Should clear state after usual chip clear button click',
  async t => {
    const { state, listOption, pinnedMulti } = getComponent();

    await t.click(pinnedMulti).click(listOption('vm-2'));

    await t.expect(state.innerText).eql(JSON.stringify({ multiple2: ['vm-2'] }));

    const clearButton = pinnedMulti.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.clearButton));
    await t.click(clearButton);

    await t.expect(state.innerText).eql('{}');
  },
);
