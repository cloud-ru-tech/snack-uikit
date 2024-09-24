import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function getUrl(props: Record<string, unknown> = {}) {
  return getTestcafeUrl({
    name: 'scroll',
    props: {
      'data-test-id': 'scroll-test',
      ...props,
    },
  });
}

fixture('Scroll');

const TEST_IDS = {
  verticalScrollbar: '.os-scrollbar-vertical',
  horizontalScrollbar: '.os-scrollbar-horizontal',
  unusableScrollbar: '.os-scrollbar-unusable',
};

function getSelectors() {
  return {
    verticalScrollbar: Selector(TEST_IDS.verticalScrollbar),
    horizontalScrollbar: Selector(TEST_IDS.horizontalScrollbar),
    unusableScrollbar: Selector(TEST_IDS.unusableScrollbar),
    host: Selector(`*[data-overlayscrollbars="host"]`),
    viewport: Selector(`*[data-overlayscrollbars-contents]`),
  };
}

test.page(getUrl())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('scroll-test')).exists).ok();
});

test.page(getUrl())('Has vertical and horizontal scrollbars', async t => {
  const { verticalScrollbar, horizontalScrollbar, unusableScrollbar } = getSelectors();
  await t.expect(verticalScrollbar.exists).ok();
  await t.expect(horizontalScrollbar.exists).ok();
  await t.expect(unusableScrollbar.exists).notOk();
});

test.page(getUrl({ storyCards: 1 }))('Should hide horizontal scrollbar', async t => {
  const { verticalScrollbar, horizontalScrollbar } = getSelectors();

  await t.expect(verticalScrollbar.exists).ok();
  await t.expect(horizontalScrollbar.exists).ok();
  await t.expect(Selector(TEST_IDS.verticalScrollbar + TEST_IDS.unusableScrollbar).exists).ok();
  await t.expect(Selector(TEST_IDS.horizontalScrollbar + TEST_IDS.unusableScrollbar).exists).notOk();
});

test.page(getUrl())('Should be scrolled to top on init', async t => {
  const { verticalScrollbar } = getSelectors();

  await t.expect(verticalScrollbar.scrollTop).eql(0);
});

test.page(getUrl({ autoscrollTo: 'bottom' }))('Should be scrolled to bottom on init', async t => {
  const { viewport, host } = getSelectors();

  await t.expect(viewport.visible).ok();

  const hostHeight = await host.offsetHeight;
  const scrollHeight = await viewport.scrollHeight;

  const scrollTop = await viewport.scrollTop;
  const delta = scrollHeight - hostHeight;

  await t.expect(scrollTop).within(delta - 2, delta + 2);
});
