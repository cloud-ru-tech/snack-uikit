import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getCalendarTextSnapshot, getTimeValueFromHolder } from './utils';

const TEST_ID = 'test-id';
const HOURS_ITEM = `hours-${TEST_ID}`;
const MINUTES_ITEM = `minutes-${TEST_ID}`;
const SECONDS_ITEM = `seconds-${TEST_ID}`;
const APPLY_BUTTON = `apply-button-${TEST_ID}`;
const CURRENT_BUTTON = `current-button-${TEST_ID}`;

const mainElementSelector = Selector(dataTestIdSelector(TEST_ID));

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'time-picker',
    group: 'calendar',
    props: {
      'data-test-id': TEST_ID,
      todayHours: 12,
      todayMinutes: 0,
      todaySeconds: 0,
      mode: 'date-time',
      ...props,
    },
  });

fixture('timepicker');

test.page(getPage())('Should select time by click', async t => {
  await t.click(Selector(dataTestIdSelector(HOURS_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(MINUTES_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(SECONDS_ITEM)).nth(5));
  await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

  await t.expect(await getCalendarTextSnapshot()).eql({
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

  await t.expect(getTimeValueFromHolder()).eql('05:05:05');
});

test.page(getPage({ valueHours: 5, valueMinutes: 5, valueSeconds: 5 }))('Should render with selected time', async t => {
  await t.expect(mainElementSelector.visible).ok();

  await t.expect(await getCalendarTextSnapshot()).eql({
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

  await t.expect(getTimeValueFromHolder()).eql('05:05:05');
});

test.page(getPage({ valueHours: 5, valueMinutes: 5, valueSeconds: 5 }))(
  'Should select current time by click',
  async t => {
    await t.click(Selector(dataTestIdSelector(CURRENT_BUTTON)));
    await t.click(Selector(dataTestIdSelector(APPLY_BUTTON)));

    await t.expect(await getCalendarTextSnapshot()).eql({
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

    await t.expect(getTimeValueFromHolder()).eql('12:00:00');
  },
);

test.page(getPage())('Should select time by keyboard', async t => {
  const pressKey = async (keys: string, times: number = 1) => {
    await t.pressKey(new Array(times).fill(keys).join(' '));
  };

  await t.expect(mainElementSelector.visible).ok();

  // select 5 hours
  await pressKey('tab');
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

  await t.expect(getTimeValueFromHolder()).eql('05:05:05');
});

test.page(getPage({ valueHours: 5, valueMinutes: 5, valueSeconds: 5 }))(
  'Should select current time by keyboard',
  async t => {
    const pressKey = async (keys: string, times: number = 1) => {
      await t.pressKey(new Array(times).fill(keys).join(' '));
    };

    // workaround to place focus in the beginning, because of some issues in Testcafe
    await t.click(mainElementSelector, { offsetX: 0, offsetY: 0 });

    // go to current button & apply
    await pressKey('tab', 4);
    await pressKey('enter', 2);

    await t.expect(await getCalendarTextSnapshot()).eql({
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

    await t.expect(getTimeValueFromHolder()).eql('12:00:00');
  },
);
