import { fixture, test } from 'testcafe';

import { chipChoiceCommonTests, createChipGetPage, getComponent } from './utils/chipChoice';

fixture('ChipChoice.Date');

const getPage = createChipGetPage('date');

test.page(getPage({ useDefaultValue: true }))(
  'should render with "defaultValue" and click on clearButton removes it',
  async t => {
    const { chip, value, label, clearButton } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(label.exists).ok();
    await t.expect(value.exists).ok();

    await t.expect(value.innerText).eql(new Date('2023-10-15').toLocaleDateString());

    await t.click(clearButton);

    await t.expect(value.innerText).eql('All');
  },
);

chipChoiceCommonTests(getPage, 'date');
