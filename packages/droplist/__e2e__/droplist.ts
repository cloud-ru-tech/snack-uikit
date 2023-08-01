import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'droplist';
const DROPLIST_SELECTOR = dataTestIdSelector(TEST_ID);
const BUTTON_SELECTOR = dataTestIdSelector('button-with-droplist');

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'dropdown',
    story: 'dropdown',
    group: 'droplist',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Droplist');

const getElementWidth = (selector: string): Promise<number> => Selector(selector).offsetWidth;

test.page(getPage())('Should be rendered by click', async t => {
  await t.expect(Selector(DROPLIST_SELECTOR).exists).notOk();
  await t.click(Selector(BUTTON_SELECTOR));
  await t.expect(Selector(DROPLIST_SELECTOR).exists).ok();
});

[60, 300, 600].forEach(width => {
  test.page(getPage({ widthStrategy: 'Equal', storySkeletonWidth: width }))(
    `Should render with width equals button width when content = ${width}px`,
    async t => {
      await t.click(Selector(BUTTON_SELECTOR));
      const droplistWidth = await getElementWidth(DROPLIST_SELECTOR);
      const buttonWidth = await getElementWidth(BUTTON_SELECTOR);
      await t.expect(droplistWidth).eql(buttonWidth);
    },
  );
});

[60, 300, 600].forEach(width => {
  test.page(getPage({ widthStrategy: 'GreatThanOrEqual', storySkeletonWidth: width }))(
    `Should render with width equals or great button width when content = ${width}px`,
    async t => {
      await t.click(Selector(BUTTON_SELECTOR));
      const droplistWidth = await getElementWidth(DROPLIST_SELECTOR);
      const buttonWidth = await getElementWidth(BUTTON_SELECTOR);
      await t.expect(droplistWidth).gte(buttonWidth);
    },
  );
});

test.page(getPage())('Should close by "esc" button', async t => {
  await t.expect(Selector(DROPLIST_SELECTOR).exists).notOk();
  await t.click(Selector(BUTTON_SELECTOR));
  await t.expect(Selector(DROPLIST_SELECTOR).exists).ok();
  await t.pressKey('esc');
  await t.expect(Selector(DROPLIST_SELECTOR).exists).notOk();
});
