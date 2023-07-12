import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { validateClicks, validateNoIconForSizeXs } from './utils/commonTests';

const TEST_IDS = {
  chip: 'filter-chip',
  label: 'filter-chip__label',
  icon: 'filter-chip__icon',
  value: 'filter-chip__value',
  spinner: 'filter-chip__spinner',
  option: 'filter-chip__option',
};

const LABEL_TEXT = 'Text label';
const VALUES_LABELS = [
  { value: 'value1', label: 'Option number 1' },
  { value: 'value2', label: 'Option number 2' },
  { value: 'value3', label: 'Option number 3' },
];
const ICON_NAME = 'PlaceholderSVG';

const getPage = (props: Record<string, unknown> & { icon?: string } = {}) =>
  getTestcafeUrl({
    name: 'filterchip',
    story: 'filter-chip',
    group: 'chips',
    props: {
      'data-test-id': TEST_IDS.chip,
      ...props,
      showClickCounter: true,
    },
  });

function getComponent() {
  const chip = Selector(dataTestIdSelector(TEST_IDS.chip));

  return {
    chip,
    label: chip.find(dataTestIdSelector(TEST_IDS.label)),
    value: chip.find(dataTestIdSelector(TEST_IDS.value)),
    iconWrap: chip.find(dataTestIdSelector(TEST_IDS.icon)),
    icon: chip.find(dataTestIdSelector(TEST_IDS.icon)).find('svg'),
    spinner: chip.find(dataTestIdSelector(TEST_IDS.spinner)).find('svg'),
    option: Selector(dataTestIdSelector(TEST_IDS.option)),
  };
}

fixture('FilterChip');

test.page(getPage())(`should render with first value by default`, async t => {
  const { chip, value, label } = getComponent();

  await t.expect(chip.exists).ok();
  await t.expect(value.innerText).eql(VALUES_LABELS[0].label);

  await t.expect(label.exists).notOk();
});

test.page(getPage({ valueSingle: VALUES_LABELS[2].value }))(`should render with label of selected option`, async t => {
  const { chip, value, label } = getComponent();

  await t.expect(chip.exists).ok();
  await t.expect(value.innerText).eql(VALUES_LABELS[2].label);

  await t.expect(label.exists).notOk();
});

test.page(getPage({ valueSingle: 'unexistent' }))(`should render default item if value does bot exist`, async t => {
  const { chip, value, label } = getComponent();

  await t.expect(chip.exists).ok();
  await t.expect(value.innerText).eql(VALUES_LABELS[0].label);

  await t.expect(label.exists).notOk();
});

test.page(getPage())(`should change value by option selection`, async t => {
  const { chip, value } = getComponent();
  await t.expect(value.innerText).eql(VALUES_LABELS[0].label);
  await t.click(chip);
  await t.click(getComponent().option.nth(2));
  await t.expect(getComponent().value.innerText).eql(VALUES_LABELS[2].label);
});

test.page(getPage({ selectionMode: 'multi', label: LABEL_TEXT }))(
  `should have 0 selected options by default`,
  async t => {
    const { value, label } = getComponent();
    await t.expect(value.innerText).eql('0');
    await t.expect(label.innerText).eql(LABEL_TEXT);
  },
);

test.page(getPage({ selectionMode: 'multi', label: LABEL_TEXT }))(
  `should select 2 values by clicking options`,
  async t => {
    const { chip, value, label } = getComponent();
    await t.click(chip);
    await t.click(getComponent().option.nth(1));
    await t.click(getComponent().option.nth(2));
    await t.expect(value.innerText).eql('2');
    await t.expect(label.innerText).eql(LABEL_TEXT);
  },
);

test.page(getPage({ icon: ICON_NAME }))('should render with icon', async t => {
  const { value, icon } = getComponent();

  await t.expect(value.exists).ok();
  await t.expect(icon.exists).ok();
});

test.page(getPage({ loading: true, icon: ICON_NAME }))('value should change to spinner when loading', async t => {
  const { value, iconWrap, icon, spinner } = getComponent();

  await t.expect(value.exists).ok();
  await t.expect(spinner.exists).ok();
  await t.expect(icon.exists).ok();
  await t.expect(iconWrap.getStyleProperty('opacity')).eql('0');
});

test.page(getPage({ label: LABEL_TEXT, selectionMode: 'multi', loading: true }))(
  `should render with label "${LABEL_TEXT} and change value to spinner"`,
  async t => {
    const { chip, label, value, spinner } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(label.innerText).eql(LABEL_TEXT);
    await t.expect(spinner.exists).ok();
    await t.expect(value.exists).notOk();
  },
);

validateNoIconForSizeXs(getPage, getComponent, true);

validateClicks(getPage, getComponent);
