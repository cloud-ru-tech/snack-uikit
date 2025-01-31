import { fixture, test } from 'testcafe';

import { chipChoiceCommonTests, createChipGetPage, getComponent, LABEL_TEXT, VALUES_LABELS } from './utils/chipChoice';

const getPage = createChipGetPage('multi');

fixture('ChipChoice.Multi');

test.page(getPage({ label: LABEL_TEXT, useDefaultValue: false }))(
  `should have 0 selected options by default`,
  async t => {
    const { chip, value, label } = getComponent();
    await t.expect(value.innerText).eql('All');
    await t.expect(label.innerText).eql(LABEL_TEXT);

    await t.click(chip);
  },
);

test.page(getPage({ label: LABEL_TEXT, useDefaultValue: false }))(
  `should select 2 values by clicking options and click on clear button removes selection`,
  async t => {
    const { chip, value, label, getOption, clearButton } = getComponent();

    await t.click(chip);

    await t.click(getOption(VALUES_LABELS[0].value));
    await t.click(getOption(VALUES_LABELS[1].value));

    await t.expect(value.innerText).eql('2/5', 'Value not matched after selection');
    await t.expect(label.innerText).eql(LABEL_TEXT);

    await t.click(clearButton);
    await t.expect(value.innerText).eql('All', 'Default value not matched');
  },
);

test.page(getPage({ useDefaultValue: false, autoApply: false }))(
  `should not change value by selecting option and chance by approve click`,
  async t => {
    const { footer, chip, getOption, value, approveButton, cancelButton } = getComponent();

    await t.click(chip);
    await t.expect(footer.exists).ok('Droplist footer dont exists');

    await t.click(getOption(VALUES_LABELS[0].value));

    await t.expect(value.innerText).eql('All', 'Value changed after selection with autoApply flag');

    await t.click(cancelButton);
    await t.click(chip);

    await t.expect(getOption(VALUES_LABELS[0].value).checked).notOk('Values not resets after click on cancel button');

    await t.click(getOption(VALUES_LABELS[0].value));
    await t.click(getOption(VALUES_LABELS[1].value));

    await t.click(approveButton);
    await t.expect(value.innerText).eql('2/5', 'Value not matched after selection');
  },
);

chipChoiceCommonTests(getPage, 'multi');
