import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('SegmentedControl');

const SEGMENTED_CONTROL_TEST_ID = 'SegmentedControl';

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'segmented-control',
    props: {
      'data-test-id': SEGMENTED_CONTROL_TEST_ID,
      ...props,
    },
  });

const getCurrentValue = () => Selector(dataTestIdSelector('selected-segment')).innerText;

test.page(getPage())('Show segmented control', async t => {
  await t.expect(Selector(dataTestIdSelector(SEGMENTED_CONTROL_TEST_ID)).exists).ok();
});

test.page(getPage())('Should select segment after click', async t => {
  await t.expect(Selector(dataTestIdSelector('section-1')).getAttribute('data-active')).eql('true');
  await t.expect(Selector(dataTestIdSelector('section-2')).getAttribute('data-active')).eql(null);
  await t.expect(getCurrentValue()).eql('1');

  await t.click(Selector(dataTestIdSelector('section-2')));

  await t.expect(Selector(dataTestIdSelector('section-1')).getAttribute('data-active')).eql(null);
  await t.expect(Selector(dataTestIdSelector('section-2')).getAttribute('data-active')).eql('true');
  await t.expect(getCurrentValue()).eql('2');
});

test.page(getPage())('Should not select segment after click to disabled element', async t => {
  await t.expect(Selector(dataTestIdSelector('section-1')).getAttribute('data-active')).eql('true');
  await t.expect(Selector(dataTestIdSelector('section-4')).getAttribute('data-active')).eql(null);
  await t.expect(getCurrentValue()).eql('1');

  await t.click(Selector(dataTestIdSelector('section-4')));

  await t.expect(Selector(dataTestIdSelector('section-1')).getAttribute('data-active')).eql('true');
  await t.expect(Selector(dataTestIdSelector('section-4')).getAttribute('data-active')).eql(null);
  await t.expect(getCurrentValue()).eql('1');
});

test.page(getPage())('Should select segment after press tab arrow right and enter', async t => {
  await t.expect(Selector(dataTestIdSelector('section-1')).getAttribute('data-active')).eql('true');
  await t.expect(Selector(dataTestIdSelector('section-2')).getAttribute('data-active')).eql(null);
  await t.expect(getCurrentValue()).eql('1');

  await t.pressKey('tab');
  await t.pressKey('right');
  await t.pressKey('enter');

  await t.expect(Selector(dataTestIdSelector('section-1')).getAttribute('data-active')).eql(null);
  await t.expect(Selector(dataTestIdSelector('section-2')).getAttribute('data-active')).eql('true');
  await t.expect(getCurrentValue()).eql('2');
});

test.page(getPage())('Should skip disabled segment', async t => {
  await t.expect(Selector(dataTestIdSelector('section-1')).getAttribute('data-active')).eql('true');
  await t.expect(Selector(dataTestIdSelector('section-5')).getAttribute('data-active')).eql(null);
  await t.expect(getCurrentValue()).eql('1');

  await t.pressKey('tab');
  await t.pressKey('right');
  await t.pressKey('right');
  await t.pressKey('right');
  await t.pressKey('enter');

  await t.expect(Selector(dataTestIdSelector('section-1')).getAttribute('data-active')).eql(null);
  await t.expect(Selector(dataTestIdSelector('section-5')).getAttribute('data-active')).eql('true');
  await t.expect(getCurrentValue()).eql('5');
});
