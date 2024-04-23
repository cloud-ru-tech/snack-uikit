import { fixture, test } from 'testcafe';

import { chipChoiceCommonTests, createChipGetPage, getComponent, VALUES_LABELS } from './utils/chipChoice';

fixture('ChipChoice.Single');

const getPage = createChipGetPage('single');

test.page(getPage({ defaultValue: VALUES_LABELS[0].value }))(
  'should render with "defaultValue" and click on clearButton removes it',
  async t => {
    const { chip, value, label, clearButton } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(label.exists).ok();
    await t.expect(value.exists).ok();

    await t.expect(value.innerText).eql(VALUES_LABELS[0].label);

    await t.click(clearButton);

    await t.expect(value.innerText).eql('All');
  },
);

test.page(getPage())('should change value by option selection', async t => {
  const { chip, value, getOption } = getComponent();

  await t.expect(value.innerText).eql(VALUES_LABELS[0].label);

  await t.click(chip);
  await t.click(getOption(VALUES_LABELS[2].value));

  await t.expect(value.innerText).eql(VALUES_LABELS[2].label);
});

chipChoiceCommonTests(getPage, 'single');
