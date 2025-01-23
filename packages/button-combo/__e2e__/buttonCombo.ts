import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { DROPLIST_OPTIONS } from './constants';

const DEFAULT_LABEL = 'create';

const BUTTON_COMBO_ID = 'button-combo';
const BUTTON_OPTION_ID = 'button-combo__option';
const BUTTON_DROPDOWN_ID = 'button-combo__dropdown-button';
const DROPDOWN_ID = 'button-combo__dropdown';

const getDropdownBaseItem = (id: string) => Selector(dataTestIdSelector(`list__base-item_${id}`));

const getPage = (props?: Record<string, unknown>) =>
  getTestcafeUrl({
    name: BUTTON_COMBO_ID,
    props: {
      'data-test-id': BUTTON_COMBO_ID,
      ...props,
    },
  });

fixture(BUTTON_COMBO_ID);

test.page(getPage({ defaultLabel: DEFAULT_LABEL }))('Should render', async t => {
  const button = Selector(dataTestIdSelector(BUTTON_COMBO_ID));
  const optionButton = Selector(dataTestIdSelector(BUTTON_OPTION_ID));
  const dropdownButton = Selector(dataTestIdSelector(BUTTON_DROPDOWN_ID));

  await t.expect(button.exists).ok();

  await t.expect(optionButton.exists).ok();
  const optionButtonLabel = optionButton.find(dataTestIdSelector('label'));
  await t.expect(optionButtonLabel.exists).ok();

  await t.expect(dropdownButton.exists).ok();
  const dropdownButtonIcon = dropdownButton.find(dataTestIdSelector('icon'));
  await t.expect(dropdownButtonIcon.exists).ok();
});

test.page(getPage({ defaultLabel: DEFAULT_LABEL, loading: true, defaultValue: '1' }))(
  'Should be disabled with loading prop',
  async t => {
    const optionButton = Selector(dataTestIdSelector(BUTTON_OPTION_ID));
    const dropdownButton = Selector(dataTestIdSelector(BUTTON_DROPDOWN_ID));

    await t.expect(optionButton.hasAttribute('data-loading')).ok();
    await t.expect(dropdownButton.hasAttribute('data-loading')).ok();

    const label = optionButton.find(dataTestIdSelector('label'));
    await t.expect(label.getStyleProperty('opacity')).eql('0');

    const optionLoadingIcon = optionButton.find(dataTestIdSelector('loading-icon'));
    await t.expect(optionLoadingIcon.exists).ok();

    const dropdownLoadingIcon = dropdownButton.find(dataTestIdSelector('loading-icon'));
    await t.expect(dropdownLoadingIcon.exists).ok();

    await t.expect(optionButton.getStyleProperty('cursor')).eql('not-allowed');
    await t.setNativeDialogHandler(() => true).click(optionButton);

    const history = await t.getNativeDialogHistory();

    await t.expect(history.length).eql(0);

    await t.click(dropdownButton);

    const dropdown = Selector(dataTestIdSelector(DROPDOWN_ID));
    await t.expect(dropdown.exists).notOk();
  },
);

test.page(getPage({ defaultLabel: DEFAULT_LABEL, disabled: true, defaultValue: '1' }))(
  'Should be disabled with disabled prop',
  async t => {
    const optionButton = Selector(dataTestIdSelector(BUTTON_OPTION_ID));
    const dropdownButton = Selector(dataTestIdSelector(BUTTON_DROPDOWN_ID));

    await t.expect(optionButton.hasAttribute('data-disabled')).ok();
    await t.expect(dropdownButton.hasAttribute('data-disabled')).ok();

    await t.expect(optionButton.getStyleProperty('cursor')).eql('not-allowed');
    await t.setNativeDialogHandler(() => true).click(optionButton);

    const history = await t.getNativeDialogHistory();

    await t.expect(history.length).eql(0);

    await t.click(dropdownButton);

    const dropdown = Selector(dataTestIdSelector(DROPDOWN_ID));
    await t.expect(dropdown.exists).notOk();
  },
);

test.page(getPage({ defaultLabel: DEFAULT_LABEL, defaultValue: '1' }))('Should change label and action', async t => {
  const optionButton = Selector(dataTestIdSelector(BUTTON_OPTION_ID));
  const dropdownButton = Selector(dataTestIdSelector(BUTTON_DROPDOWN_ID));

  await t.expect(optionButton.innerText).eql(DROPLIST_OPTIONS[0].label);

  await t.setNativeDialogHandler(() => true).click(optionButton);

  await t.click(dropdownButton);

  const dropdown = Selector(dataTestIdSelector(DROPDOWN_ID));
  await t.expect(dropdown.exists).ok();

  await t.click(getDropdownBaseItem(String(DROPLIST_OPTIONS[1].id)));
  await t.setNativeDialogHandler(() => true).click(optionButton);

  await t.expect(optionButton.innerText).eql(DROPLIST_OPTIONS[1].label);

  const history = await t.getNativeDialogHistory();

  await t.expect(history.length).eql(2);
  await t.expect(history[0].text).eql('Action 2 completed');
  await t.expect(history[1].text).eql('Action 1 completed');
});
