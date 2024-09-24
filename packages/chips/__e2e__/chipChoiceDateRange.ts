import { fixture, test } from 'testcafe';

import { DEFAULT_EMPTY_VALUE } from '../src/constants';
import { chipChoiceCommonTests, createChipGetPage, getComponent } from './utils/chipChoice';

fixture('ChipChoice.DateRange');

const getPage = createChipGetPage('date-range');

test.page(getPage({ useDefaultValue: true }))(
  'should render with "defaultValue" and click on clearButton removes it',
  async t => {
    const { chip, value, label, clearButton } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(label.exists).ok();
    await t.expect(value.exists).ok();

    await t
      .expect(value.innerText)
      .eql(
        [new Date('2022-10-15').toLocaleDateString(), new Date('2023-10-15').toLocaleDateString()].join(
          ` ${DEFAULT_EMPTY_VALUE} `,
        ),
      );

    await t.click(clearButton);

    await t.expect(value.innerText).eql('All');
  },
);

chipChoiceCommonTests(getPage, 'date-range');
