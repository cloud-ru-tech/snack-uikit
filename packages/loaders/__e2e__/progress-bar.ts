import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getStyleProperty, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'progress-bar-test';
const FILLER_TEST_ID = 'progress-bar-filler';

const getPageUrl = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'progress-bar',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
    group: 'loaders',
  });

fixture('ProgressBar');

test.page(getPageUrl({ progress: 50 }))('Rendered', async t => {
  const progressBar = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(progressBar.exists).ok();

  const style = await getStyleProperty(progressBar.find(dataTestIdSelector(FILLER_TEST_ID)));

  await t.expect(style['--progress']).eql('50%');
});

test.page(getPageUrl({ progress: -5 }))('Rendered as 0 progress for negative numbers', async t => {
  const progressBar = Selector(dataTestIdSelector(TEST_ID));
  const style = await getStyleProperty(progressBar.find(dataTestIdSelector(FILLER_TEST_ID)));

  await t.expect(style['--progress']).eql('0%');
});

test.page(getPageUrl({ progress: 150 }))('Rendered as totally filled progress bar for numbers > 100', async t => {
  const progressBar = Selector(dataTestIdSelector(TEST_ID));
  const style = await getStyleProperty(progressBar.find(dataTestIdSelector(FILLER_TEST_ID)));

  await t.expect(style['--progress']).eql('100%');
});
