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

    await t.expect(value.innerText).eql(new Date('2023-10-15').toLocaleDateString('ru-RU'));

    await t.click(clearButton);

    await t.expect(value.innerText).eql('All');
  },
);

test.page(getPage({ useDefaultValue: true, mode: 'month' }))(
  '[mode="month"] should render with value as month.year',
  async t => {
    const { chip, value } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(value.exists).ok();

    await t
      .expect(value.innerText)
      .eql(new Date('2023-10-15').toLocaleDateString('ru-RU', { year: 'numeric', month: 'numeric', day: undefined }));
  },
);

test.page(getPage({ useDefaultValue: true, mode: 'date-time', showSeconds: false }))(
  '[mode="date-time", showSeconds=false] should render with value as day.month.year, hh:mm',
  async t => {
    const { chip, value } = getComponent();

    await t.expect(chip.exists).ok();
    await t.expect(value.exists).ok();

    await t.expect(value.innerText).eql(
      new Date('2023-10-15').toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
      }),
    );
  },
);

chipChoiceCommonTests(getPage, 'date');
