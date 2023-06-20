import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'pagination-slider';
const TOTAL = 7;
const PAGE = 3;

const getPageButtonId = (index: number) => dataTestIdSelector(`page-button-slider-${index}`);

const getPage = (props?: Record<string, unknown>) =>
  getTestcafeUrl({
    name: 'pagination-slider',
    group: 'pagination',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Pagination Slider');

test.page(getPage({ total: TOTAL, page: PAGE }))('should render', async t => {
  const pagination = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(pagination.exists).ok();

  for (let i = 1; i <= TOTAL; i++) {
    const item = pagination.find(getPageButtonId(i));

    await t.expect(item.exists).ok();
    await t.expect(item.hasAttribute('data-activated'))[i === PAGE ? 'ok' : 'notOk']();
  }

  await t.expect(pagination.find(getPageButtonId(TOTAL + 1)).exists).notOk();
});

test.page(getPage({ total: TOTAL, page: PAGE }))('should select page by click', async t => {
  const pagination = Selector(dataTestIdSelector(TEST_ID));
  const prevItem = pagination.find(getPageButtonId(PAGE));
  const newItem = pagination.find(getPageButtonId(5));

  await t.click(newItem);

  await t.expect(prevItem.hasAttribute('data-activated')).notOk();
  await t.expect(newItem.hasAttribute('data-activated')).ok();
});
