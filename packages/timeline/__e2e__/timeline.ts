import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_IDS = {
  timeline: 'timeline',
  track: 'timeline-track',
  trackDot: 'timeline-track-dot',
  trackLine: 'timeline-track-line',
  trackItem: 'timeline-track-item',
  trackItemOpposite: 'timeline-track-item-opposite',
};

function getPage(props: object = {}) {
  return getTestcafeUrl({
    group: 'timeline',
    name: 'timeline',
    props: {
      'data-test-id': TEST_IDS.timeline,
      ...props,
    },
  });
}

fixture('Timeline');

test.page(getPage({ showOpposite: false }))('Should be rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.timeline)).exists).ok('Timeline not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.track)).exists).ok('Track not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.trackDot)).exists).ok('Track dot not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.trackLine)).exists).ok('Track line not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.trackItem)).exists).ok('Track item not present');
  await t
    .expect(Selector(dataTestIdSelector(TEST_IDS.trackItemOpposite)).exists)
    .notOk("Opposite items are present although shouldn't");
});

test.page(getPage({ showOpposite: true }))('Should be rendered with opposite content', async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.timeline)).exists).ok('Timeline not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.track)).exists).ok('Track not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.trackDot)).exists).ok('Track dot not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.trackLine)).exists).ok('Track line not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.trackItem)).exists).ok('Track item not present');
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.trackItemOpposite)).exists).ok('Opposite items are not present');
});
