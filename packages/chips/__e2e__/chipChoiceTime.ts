import { fixture, test } from 'testcafe';

import { chipChoiceCommonTests, createChipGetPage, getComponent } from './utils/chipChoice';

fixture('ChipChoice.Time');

const getPage = createChipGetPage('time');

test.page(getPage({ useDefaultValue: true }))(
  'should render with "defaultValue" and click on clearButton removes it',
  async t => {
    const { chip, value, label, clearButton } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(label.exists).ok();
    await t.expect(value.exists).ok();

    await t.expect(value.innerText).eql('20:15:30');

    await t.click(clearButton);

    await t.expect(value.innerText).eql('All');
  },
);

test.page(getPage({ useDefaultValue: true, showSeconds: false }))(
  '[mode="date-time", showSeconds=false] should render with value as hh:mm',
  async t => {
    const { chip, value } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(value.exists).ok();

    await t.expect(value.innerText).eql('20:15');
  },
);

chipChoiceCommonTests(getPage, 'time');
