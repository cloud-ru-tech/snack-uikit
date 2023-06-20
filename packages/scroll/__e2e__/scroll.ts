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

const verticalScrollbar = '.os-scrollbar-vertical';
const horizontalScrollbar = '.os-scrollbar-horizontal';
const unusableScrollbar = '.os-scrollbar-unusable';
const viewportScrollbar = '.os-viewport';
const hostScrollbar = '.os-host';
const corner = '.os-scrollbar-corner-resize';

test.page(getUrl())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector('scroll-test')).exists).ok();
});

test.page(getUrl())('Has vertical and horizontal scrollbars', async t => {
  await t.expect(Selector(verticalScrollbar).exists).ok();
  await t.expect(Selector(horizontalScrollbar).exists).ok();
  await t.expect(Selector(unusableScrollbar).exists).notOk();
});

test.page(getUrl({ contentLines: 1 }))('Should hide horizontal scrollbar', async t => {
  await t.expect(Selector(verticalScrollbar).exists).ok();
  await t.expect(Selector(horizontalScrollbar).exists).ok();
  await t.expect(Selector(verticalScrollbar + unusableScrollbar).exists).ok();
  await t.expect(Selector(horizontalScrollbar + unusableScrollbar).exists).notOk();
});

test.page(getUrl())('Should be scrolled to top on init', async t => {
  await t.expect(Selector(viewportScrollbar).scrollTop).eql(0);
});

test.page(getUrl({ autoscrollTo: 'bottom' }))('Should be scrolled to bottom on init', async t => {
  const hostHeight = await Selector(hostScrollbar).offsetHeight;
  const scrollHeight = await Selector(viewportScrollbar).scrollHeight;
  const scrollTop = await Selector(viewportScrollbar).scrollTop;
  const delta = scrollHeight - hostHeight;

  await t.expect(scrollTop).within(delta - 1, delta + 1);
});

test.page(getUrl({}))("Corner-resize shouldn't exists", async t => {
  await t.expect(Selector(corner).exists).notOk();
});

test.page(getUrl({ resize: 'both' }))('Should be resized in width and height', async t => {
  const startWidth = await Selector(hostScrollbar).offsetWidth;
  const startHeight = await Selector(hostScrollbar).offsetHeight;
  await t.drag(Selector(corner), -20, -50);
  await t.expect(Selector(hostScrollbar).offsetWidth).eql(startWidth - 20);
  await t.expect(Selector(hostScrollbar).offsetHeight).eql(startHeight - 50);
});

test.page(getUrl({ resize: 'vertical' }))('Should be resized in height only', async t => {
  const startWidth = await Selector(hostScrollbar).offsetWidth;
  const startHeight = await Selector(hostScrollbar).offsetHeight;
  await t.drag(Selector(corner), -20, -50);
  await t.expect(Selector(hostScrollbar).offsetWidth).eql(startWidth);
  await t.expect(Selector(hostScrollbar).offsetHeight).eql(startHeight - 50);
});

test.page(getUrl({ resize: 'horizontal' }))('Should be resized in width only', async t => {
  const startWidth = await Selector(hostScrollbar).offsetWidth;
  const startHeight = await Selector(hostScrollbar).offsetHeight;
  await t.drag(Selector(corner), -20, -50);
  await t.expect(Selector(hostScrollbar).offsetWidth).eql(startWidth - 20);
  await t.expect(Selector(hostScrollbar).offsetHeight).eql(startHeight);
});
