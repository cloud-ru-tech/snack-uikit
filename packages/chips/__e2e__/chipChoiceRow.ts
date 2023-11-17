import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { CHIP_CHOICE_ROW_IDS, CHIP_CHOICE_TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS } from '../stories/testIds';

const getPageUrl = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'chipchoicerow',
    story: 'chip-choice-row',
    props: {
      'data-test-id': STORY_TEST_IDS.Row,
      ...props,
    },
    group: 'chips',
  });

fixture('ChipChoiceRow');

function getComponent() {
  return {
    row: Selector(dataTestIdSelector(STORY_TEST_IDS.Row)),
    single: Selector(dataTestIdSelector(STORY_TEST_IDS.Single)),
    multi: Selector(dataTestIdSelector(STORY_TEST_IDS.Multi)),
    state: Selector(dataTestIdSelector(STORY_TEST_IDS.State)),
    clearAllButton: Selector(dataTestIdSelector(CHIP_CHOICE_ROW_IDS.clearAllButton)),
  };
}

test.page(getPageUrl())('Should render ClearAllButton with non empty state', async t => {
  const { clearAllButton, state } = getComponent();

  const initialState = await state.innerText;

  await t.expect(clearAllButton.exists).ok();
  await t.click(clearAllButton);

  await t.expect(state.innerText).notEql(initialState);
  await t.expect(clearAllButton.exists).notOk();
});

test.page(getPageUrl({ showClearAllButton: false }))(
  'Should not render ClearAllButton with showClearAllButton=false',
  async t => {
    const { clearAllButton } = getComponent();

    await t.expect(clearAllButton.exists).notOk();
  },
);

test.page(getPageUrl({ defaultValue: undefined }))('Should change state after interaction with chips', async t => {
  const { row, single, state } = getComponent();
  const optionSingle = Selector(dataTestIdSelector(`${STORY_TEST_IDS.Single}__option`));
  const initialState = await state.innerText;

  await t.expect(row.exists).ok();

  await t.expect(single.exists).ok();
  await t.click(single);
  await t.expect(optionSingle.exists).ok();
  await t.click(optionSingle);

  await t.expect(state.innerText).notEql(initialState);
});

test.page(getPageUrl())('Should clear state after ClearAllButton click', async t => {
  const { state, clearAllButton } = getComponent();
  const initialState = await state.innerText;

  await t.expect(clearAllButton.exists).ok();
  await t.click(clearAllButton);

  await t.expect(state.innerText).notEql(initialState);
});

test.page(getPageUrl({ showClearAllButton: false }))('Should clear state after chip clear button click', async t => {
  const { state, multi } = getComponent();
  const initialState = await state.innerText;

  const clearButton = multi.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.clearButton));

  await t.expect(clearButton.exists).ok();
  await t.click(clearButton);

  await t.expect(state.innerText).notEql(initialState);
});
