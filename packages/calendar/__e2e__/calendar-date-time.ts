import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getCalendarTextSnapshot, getDateValueFromHolder } from './utils';

const TEST_ID = 'test-id';
const ITEM = `item-${TEST_ID}`;
const PERIOD_LEVEL = `period-level-${TEST_ID}`;
const HOURS_ITEM = `hours-${TEST_ID}`;
const MINUTES_ITEM = `minutes-${TEST_ID}`;
const SECONDS_ITEM = `seconds-${TEST_ID}`;
const APPLY_BUTTON = `apply-button-${TEST_ID}`;
const CURRENT_BUTTON = `current-button-${TEST_ID}`;

const mainElementSelector = Selector(dataTestIdSelector(TEST_ID));

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'calendar',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      dateToday: 1684141200000, // 15 Мая 2023, 12-00
      mode: 'date-time',
      ...props,
    },
  });

fixture('[calendar] mode=date-time');

test.page(getPage())('Should select date and then time by click', async t => {
  await t.click(Selector(dataTestIdSelector(ITEM)).nth(4));
  await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

  // check apply button is still disabled
  await t.expect(getDateValueFromHolder()).eql('');

  await t.click(Selector(dataTestIdSelector(HOURS_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(MINUTES_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(SECONDS_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
    hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
    minutes: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
    seconds: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
  });

  await t.expect(getDateValueFromHolder()).eql('1683165905000');
});

test.page(getPage())('Should select time and then date by click', async t => {
  await t.click(Selector(dataTestIdSelector(HOURS_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(MINUTES_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(SECONDS_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

  // check apply button is still disabled
  await t.expect(getDateValueFromHolder()).eql('');

  await t.click(Selector(dataTestIdSelector(ITEM)).nth(4));
  await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
    hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
    minutes: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
    seconds: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
  });

  await t.expect(getDateValueFromHolder()).eql('1683165905000');
});

test.page(getPage())('Should save selected time then moving between periods', async t => {
  await t.click(Selector(dataTestIdSelector(HOURS_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(MINUTES_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(SECONDS_ITEM)).nth(5));

  await t.click(Selector(dataTestIdSelector(PERIOD_LEVEL)));
  await t.click(Selector(dataTestIdSelector(ITEM)).nth(5));

  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8',
    periodLevelName: 'June 2023',
    hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
    minutes: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
    seconds: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
  });
});

test.page(getPage({ dateValue: 1678845905000 /* 15 марта 23 05:05:05 */ }))(
  'Should render with selected date & time',
  async t => {
    await t.expect(mainElementSelector.visible).ok();

    await t.expect(await getCalendarTextSnapshot()).eql({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '26,27,28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8',
      periodLevelName: 'March 2023',
      hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
      minutes: [
        '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
      seconds: [
        '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
    });

    await t.expect(getDateValueFromHolder()).eql('1678845905000');
  },
);

test.page(getPage({ dateDefaultValue: 1678845905000 /* 15 марта 23 05:05:05 */ }))(
  'Should select current date & time by click',
  async t => {
    await t.click(Selector(dataTestIdSelector(CURRENT_BUTTON)));
    await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

    await t.expect(await getCalendarTextSnapshot()).eql({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[!15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
      hours: '00,01,02,03,04,05,06,07,08,09,10,11,[12],13,14,15,16,17,18,19,20,21,22,23',
      minutes: [
        '[00],01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
      seconds: [
        '[00],01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
    });

    await t.expect(getDateValueFromHolder()).eql('1684141200000');
  },
);

test.page(getPage())('Should select date and then time by keyboard', async t => {
  const pressKey = async (keys: string, times: number = 1) => {
    await t.pressKey(new Array(times).fill(keys).join(' '));
  };

  await t.expect(mainElementSelector.visible).ok();

  // select May 4
  await pressKey('tab', 2);
  await pressKey('up', 2);
  await pressKey('right', 3);
  await pressKey('enter');

  // select 5 hours
  await pressKey('down', 5);
  await pressKey('enter');

  // select 5 minutes
  await pressKey('down', 5);
  await pressKey('enter');

  // select 5 seconds
  await pressKey('down', 5);
  await pressKey('enter');

  // apply
  await pressKey('enter');

  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
    hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
    minutes: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
    seconds: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
  });

  await t.expect(getDateValueFromHolder()).eql('1683165905000');
});

test.page(getPage())('Should select time and then date by keyboard', async t => {
  const pressKey = async (keys: string, times: number = 1) => {
    await t.pressKey(new Array(times).fill(keys).join(' '));
  };

  await t.expect(mainElementSelector.visible).ok();

  // go to time section
  await pressKey('tab', 3);

  // select 5 hours
  await pressKey('down', 5);
  await pressKey('enter');

  // select 5 minutes
  await pressKey('down', 5);
  await pressKey('enter');

  // select 5 seconds
  await pressKey('down', 5);
  await pressKey('enter');

  // go to date section
  await pressKey('shift+tab', 5);

  // select May 4
  await pressKey('up', 2);
  await pressKey('right', 3);
  await pressKey('enter');

  // apply
  await pressKey('tab', 4);
  await pressKey('enter');

  await t.expect(await getCalendarTextSnapshot()).eql({
    header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    items:
      '30,1,2,3,[4],5,6,7,8,9,10,11,12,13,14,!15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
    periodLevelName: 'May 2023',
    hours: '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23',
    minutes: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
    seconds: [
      '00,01,02,03,04,[05],06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
      '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
    ].join(','),
  });

  await t.expect(getDateValueFromHolder()).eql('1683165905000');
});

test.page(getPage({ dateDefaultValue: 1678845905000 /* 15 марта 23 05:05:05 */ }))(
  'Should select current date & time by keyboard',
  async t => {
    const pressKey = async (keys: string, times: number = 1) => {
      await t.pressKey(new Array(times).fill(keys).join(' '));
    };

    await t.expect(mainElementSelector.visible).ok();

    // go to current button & apply
    await pressKey('tab', 6);
    await pressKey('enter', 2);

    await t.expect(await getCalendarTextSnapshot()).eql({
      header: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      items:
        '30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,[!15],16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10',
      periodLevelName: 'May 2023',
      hours: '00,01,02,03,04,05,06,07,08,09,10,11,[12],13,14,15,16,17,18,19,20,21,22,23',
      minutes: [
        '[00],01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
      seconds: [
        '[00],01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
        '31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59',
      ].join(','),
    });

    await t.expect(getDateValueFromHolder()).eql('1684141200000');
  },
);

test.page(getPage({ dateValue: 1683165905000 /* 4 мая 2023 05:05:05 */ }))(
  'Should navigate by active elements in time lists',
  async t => {
    const pressKey = async (keys: string, times: number = 1) => {
      await t.pressKey(new Array(times).fill(keys).join(' '));
    };

    await t.expect(mainElementSelector.visible).ok();

    // move by already selected items & apply
    await pressKey('tab', 3);
    await pressKey('enter', 3);
    await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

    await t.expect(getDateValueFromHolder()).eql('1683165905000');

    // go back to seconds
    await pressKey('shift+tab', 2);
    await pressKey('enter');

    // go back to minutes
    await pressKey('shift+tab', 3);
    await pressKey('enter');

    // go back to hours
    await pressKey('shift+tab');
    await pressKey('enter');

    // apply
    await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

    await t.expect(getDateValueFromHolder()).eql('1683165905000');
  },
);
