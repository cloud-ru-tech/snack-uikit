import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { validateClicks, validateNoIconForSizeXs } from './utils/commonTests';

const TEST_IDS = {
  chip: 'filter-chip',
  label: 'filter-chip__label',
  icon: 'filter-chip__icon',
  value: 'filter-chip__value',
  spinner: 'filter-chip__spinner',
};

const LABEL_TEXT = 'Test text';
const VALUE_TEXT = 'Test value';
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
  };
}

fixture('FilterChip');

test.page(getPage({ value: VALUE_TEXT }))(`should render with value "${VALUE_TEXT}" and without label`, async t => {
  const { chip, value, label } = getComponent();

  await t.expect(chip.exists).ok();
  await t.expect(value.innerText).eql(VALUE_TEXT);

  await t.expect(label.exists).notOk();
});

test.page(getPage({ label: LABEL_TEXT, value: VALUE_TEXT }))(
  `should render with value "${VALUE_TEXT}" and label "${LABEL_TEXT}"`,
  async t => {
    const { chip, label, value } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(label.innerText).eql(LABEL_TEXT);
    await t.expect(value.innerText).eql(VALUE_TEXT);
  },
);

test.page(getPage({ value: VALUE_TEXT, icon: ICON_NAME }))('should render with icon', async t => {
  const { value, icon } = getComponent();

  await t.expect(value.exists).ok();
  await t.expect(icon.exists).ok();
});

test.page(getPage({ value: VALUE_TEXT, loading: true, icon: ICON_NAME }))(
  'value should change to spinner when loading',
  async t => {
    const { value, iconWrap, icon, spinner } = getComponent();

    await t.expect(value.exists).ok();
    await t.expect(spinner.exists).ok();
    await t.expect(icon.exists).ok();
    await t.expect(iconWrap.getStyleProperty('opacity')).eql('0');
  },
);

test.page(getPage({ label: LABEL_TEXT, value: VALUE_TEXT, loading: true }))(
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
