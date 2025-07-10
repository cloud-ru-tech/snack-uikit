import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/testIds';
import { STORY_TEST_IDS } from '../stories/constants';

const TEST_ID = 'carousel';

const getPage = (props: Record<string, unknown> & { showImage?: boolean; customSrc?: string } = {}) =>
  getTestcafeUrl({
    name: 'carousel',
    props: {
      'data-test-id': TEST_ID,
      scrollBy: 2,
      showItems: 2.5,
      page: 1,
      itemsCount: 12,
      arrows: true,
      pagination: true,
      infiniteScroll: false,
      controlsVisibility: 'always',
      ...props,
    },
  });

fixture('Carousel');

function getSelectors() {
  return {
    carousel: Selector(dataTestIdSelector(TEST_ID)),
    pagination: Selector(dataTestIdSelector(TEST_IDS.pagination)),
    arrowNext: Selector(dataTestIdSelector(TEST_IDS.arrowNext)),
    arrowPrev: Selector(dataTestIdSelector(TEST_IDS.arrowPrev)),
    trackLine: Selector(dataTestIdSelector(TEST_IDS.trackLine)),
    hiddenPageCounter: Selector(dataTestIdSelector(STORY_TEST_IDS.HiddenPageCounter)),
    paginationItems: Selector(dataTestIdSelector(TEST_IDS.pagination)).find('button'),
  };
}

test.page(getPage({ page: 2 }))('Should render with arrows & pagination', async t => {
  const { carousel, arrowNext, arrowPrev, pagination } = getSelectors();

  await t.expect(carousel.exists).ok();
  await t.expect(arrowNext.exists).ok();
  await t.expect(arrowPrev.exists).ok();
  await t.expect(pagination.exists).ok();
});

test.page(getPage({ arrows: false, pagination: false }))('Should render without arrows & pagination', async t => {
  const { carousel, arrowNext, arrowPrev, pagination } = getSelectors();

  await t.expect(carousel.exists).ok();
  await t.expect(arrowNext.exists).notOk();
  await t.expect(arrowPrev.exists).notOk();
  await t.expect(pagination.exists).notOk();
});

test.page(getPage())('Should hide arrows in first/last page', async t => {
  const { arrowNext, arrowPrev, paginationItems } = getSelectors();

  const lastPaginationItem = paginationItems.nth(-1);

  await t.expect(arrowNext.exists).ok();
  await t.expect(arrowPrev.exists).notOk();

  await t.click(arrowNext);

  await t.expect(arrowNext.exists).ok();
  await t.expect(arrowPrev.exists).ok();

  await t.click(lastPaginationItem);
  await t.expect(arrowPrev.exists).ok();
  await t.expect(arrowNext.exists).notOk();
});

test.page(
  getPage({
    infiniteScroll: true,
  }),
)('Should infiniteScroll', async t => {
  const { arrowNext, arrowPrev, hiddenPageCounter } = getSelectors();

  await t.expect(arrowNext.exists).ok();
  await t.expect(arrowPrev.exists).ok();

  await t.expect(hiddenPageCounter.innerText).eql('1');

  await t.click(arrowPrev);

  await t.expect(hiddenPageCounter.innerText).notEql('1');

  await t.expect(arrowNext.exists).ok();
  await t.expect(arrowPrev.exists).ok();

  await t.click(arrowNext);

  await t.expect(hiddenPageCounter.innerText).eql('1');

  await t.expect(arrowNext.exists).ok();
  await t.expect(arrowPrev.exists).ok();
});

test.page(
  getPage({
    controlsVisibility: 'hover',
    infiniteScroll: true,
  }),
)('Should arrows be hidden', async t => {
  const { arrowNext, arrowPrev, hiddenPageCounter } = getSelectors();

  await t.click(hiddenPageCounter); // to snatch focus and hover from carousel
  await t.wait(250); // waiting for arrows disappearing animation

  await t.expect(arrowNext.exists).ok();
  await t.expect(arrowPrev.exists).ok();

  // Проверяем, что стрелки невидимы (opacity: 0)
  await t.expect(await arrowNext.getStyleProperty('opacity')).eql('0', 'arrowNext is not hidden');
  await t.expect(await arrowPrev.getStyleProperty('opacity')).eql('0', 'arrowPrev is not hidden');

  // Проверяем, что стрелки неактивны (pointer-events: none)
  await t.expect(await arrowNext.getStyleProperty('pointer-events')).eql('none', 'arrowNext catches mouse events');
  await t.expect(await arrowPrev.getStyleProperty('pointer-events')).eql('none', 'arrowPrev catches mouse events');
});
