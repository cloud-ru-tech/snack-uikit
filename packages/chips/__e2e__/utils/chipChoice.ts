import { Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../../testcafe/utils';
import { CHIP_CHOICE_TEST_IDS } from '../../src/constants';
import { validateClicks, validateNoIconForSizeXs } from './commonTests';

type ChipType = 'single' | 'multi' | 'date' | 'date-range' | 'time';

const BASE_TEST_ID = 'chip-choice';

export const LABEL_TEXT = 'Label Text:';

export const VALUES_LABELS = [
  { value: 'value1', label: 'Option 1' },
  { value: 'value2', label: 'Option 2' },
  { value: 'value3', label: 'Option 3' },
];

export const ICON_NAME = 'PlaceholderSVG';

export const createChipGetPage =
  (chip: ChipType) =>
  (props: Record<string, unknown> & { icon?: string } = {}) =>
    getTestcafeUrl({
      name: 'chipchoice',
      story: `chip-choice-${chip}`,
      group: 'chips',
      props: {
        'data-test-id': BASE_TEST_ID,
        ...props,
        useBaseOptions: true,
        showClickCounter: true,
        searchable: false,
      },
    });

export function getComponent() {
  const chip = Selector(dataTestIdSelector(BASE_TEST_ID));
  const droplist = Selector(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.droplist));
  const getOption = (value: string | number) => droplist.find(dataTestIdSelector(`list__base-item_${value}`));

  const getOptionCheckbox = (value: string | number) =>
    getOption(value).find(dataTestIdSelector(`checkbox-${BASE_TEST_ID}__option`));

  return {
    chip,
    label: chip.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.label)),
    value: chip.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.value)),
    iconWrap: chip.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.icon)),
    icon: chip.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.icon)).find('svg'),
    spinner: chip.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.spinner)).find('svg'),
    clearButton: chip.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.clearButton)),
    footer: droplist.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.footer)),
    cancelButton: droplist.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.cancelButton)),
    approveButton: droplist.find(dataTestIdSelector(CHIP_CHOICE_TEST_IDS.approveButton)),
    droplist,
    getOption,
    getOptionCheckbox,
  };
}

export function chipChoiceCommonTests(getPage: ReturnType<typeof createChipGetPage>, chipType: ChipType) {
  test.page(getPage({ showClearButton: false, useDefaultValue: true }))(
    'should render with defaultValue, but without clear button',
    async t => {
      const { value, clearButton } = getComponent();

      await t.expect(value.exists).ok();
      await t.expect(value.textContent).notEql('All');
      await t.expect(clearButton.exists).notOk();
    },
  );

  if (chipType !== 'multi') {
    test.page(getPage({ useDefaultValue: false }))('should render without "defaultValue"', async t => {
      const { chip, value, label } = getComponent();

      await t.expect(chip.exists).ok();
      await t.expect(label.exists).ok();
      await t.expect(value.exists).ok();

      await t.expect(value.innerText).eql('All');
    });
  }

  test.page(getPage({ autoApply: true }))('should not render footer', async t => {
    const { footer } = getComponent();

    await t.expect(footer.exists).notOk('footer should not be exists with autoApply flag');
  });

  test.page(getPage({ icon: ICON_NAME }))('should render with icon', async t => {
    const { value, icon } = getComponent();

    await t.expect(value.exists).ok();
    await t.expect(icon.exists).ok();
  });

  test.page(getPage({ loading: true, icon: ICON_NAME }))('value should change to spinner when loading', async t => {
    const { value, icon, spinner } = getComponent();

    await t.expect(value.exists).notOk();
    await t.expect(spinner.exists).ok();
    await t.expect(icon.exists).ok();
  });

  test.page(getPage({ label: LABEL_TEXT, loading: true }))(
    `should render with label "${LABEL_TEXT} and change value to spinner"`,
    async t => {
      const { chip, label, value, spinner } = getComponent();

      await t.expect(chip.exists).ok();
      await t.expect(label.innerText).eql(LABEL_TEXT);
      await t.expect(spinner.exists).ok();
      await t.expect(value.exists).notOk();
    },
  );

  test.page(getPage({ useDefaultValue: true }))('Keyboard handling is working properly', async t => {
    if (t.browser.name === 'Firefox') {
      console.info('Keyboard test has a lot of bugs in Firefox, so it is skipped');
      return;
    }

    const { chip, droplist, clearButton } = getComponent();
    await t.expect(chip.visible).ok('Chip should be rendered');

    await t.pressKey('Tab');
    await t.expect(chip.focused).ok('Chip should be focused after first "Tab" key press');

    await t.pressKey('Down');
    await t.expect(droplist.exists).ok('Droplist should be opened after "Down" key press');

    if (chipType === 'time') {
      await t.pressKey(new Array(21).fill('Up').join(' '));
      await t.expect(chip.focused).ok('Chip should be focused after "Up" key press');
      await t.expect(droplist.exists).notOk('Droplist should be closed after "Up" key press');
    } else {
      await t.pressKey('Up');
      await t.expect(chip.focused).ok('Chip should be focused after "Up" key press');
      await t.pressKey('Up');
      await t.expect(droplist.exists).notOk('Droplist should be closed after "Up" key press');
    }

    await t.pressKey('Right');
    await t.expect(chip.focused).notOk('Chip should loose focus after "Right" key press');
    await t.expect(clearButton.focused).ok('Clear button should be focused');

    await t.pressKey('Left');
    await t.expect(chip.focused).ok('Focus should return to chip after "Left" key press');
    await t.expect(clearButton.focused).notOk('Clear button should not be focused');

    await t.pressKey('Tab');
    await t.expect(chip.focused).notOk('Chip should loose focus after pressing "Tab"');
  });

  validateNoIconForSizeXs(getPage, getComponent, true);

  validateClicks(getPage, getComponent);
}
