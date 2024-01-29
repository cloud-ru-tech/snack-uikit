import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'dropdown';
const DROPDOWN_SELECTOR = dataTestIdSelector(TEST_ID);
const BUTTON_SELECTOR = dataTestIdSelector('button-with-dropdown');

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'dropdown',
    story: 'dropdown',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Dropdown');

const getElementWidth = (selector: string): Promise<number> => Selector(selector).offsetWidth;

test.page(getPage())('Should be rendered by click', async t => {
  await t.expect(Selector(DROPDOWN_SELECTOR).exists).notOk();
  await t.click(Selector(BUTTON_SELECTOR));
  await t.expect(Selector(DROPDOWN_SELECTOR).exists).ok();
});

[60, 300, 600].forEach(width => {
  test.page(getPage({ widthStrategy: 'eq', storySkeletonWidth: width }))(
    `Should render with width equals button width when content = ${width}px`,
    async t => {
      await t.click(Selector(BUTTON_SELECTOR));
      const dropdownWidth = await getElementWidth(DROPDOWN_SELECTOR);
      const buttonWidth = await getElementWidth(BUTTON_SELECTOR);
      await t.expect(dropdownWidth).eql(buttonWidth);
    },
  );
});

[60, 300, 600].forEach(width => {
  test.page(getPage({ widthStrategy: 'gte', storySkeletonWidth: width }))(
    `Should render with width equals or great button width when content = ${width}px`,
    async t => {
      await t.click(Selector(BUTTON_SELECTOR));
      const dropdownWidth = await getElementWidth(DROPDOWN_SELECTOR);
      const buttonWidth = await getElementWidth(BUTTON_SELECTOR);
      await t.expect(dropdownWidth).gte(buttonWidth);
    },
  );
});

test.page(getPage())('Should close by "esc" button', async t => {
  await t.expect(Selector(DROPDOWN_SELECTOR).exists).notOk();
  await t.click(Selector(BUTTON_SELECTOR));
  await t.expect(Selector(DROPDOWN_SELECTOR).exists).ok();
  await t.pressKey('esc');
  await t.expect(Selector(DROPDOWN_SELECTOR).exists).notOk();
});
