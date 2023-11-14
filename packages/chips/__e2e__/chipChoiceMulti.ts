import { fixture, test } from 'testcafe';

import { chipChoiceCommonTests, createChipGetPage, getComponent, LABEL_TEXT } from './utils/chipChoice';

const getPage = createChipGetPage('multi');

fixture('ChipChoice.Multi');

test.page(getPage({ label: LABEL_TEXT }))(`should have 0 selected options by default`, async t => {
  const { chip, value, label } = getComponent();
  await t.expect(value.innerText).eql('0/5');
  await t.expect(label.innerText).eql(LABEL_TEXT);

  await t.click(chip);
});

test.page(getPage({ label: LABEL_TEXT }))(
  `should select 2 values by clicking options and click on clear button removes selection`,
  async t => {
    const { chip, value, label, option, optionCheckbox, clearButton } = getComponent();

    await t.click(chip);

    await t.expect(optionCheckbox.exists).ok('Items should be with checkbox');

    await t.click(option.nth(1));
    await t.click(option.nth(2));

    await t.expect(value.innerText).eql('2/5', 'Value not matched after selection');
    await t.expect(label.innerText).eql(LABEL_TEXT);

    await t.click(clearButton);
    await t.expect(value.innerText).eql('0/5', 'Default value not matched');
  },
);

chipChoiceCommonTests(getPage, 'multi');
