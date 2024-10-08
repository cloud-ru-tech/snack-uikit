import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'brdcrmbs';
const CRUMB_CLICK_HOLDER = 'last-clicked-crumb';
const CRUMB = `crumb-element-${TEST_ID}`;
// const COLLAPSE = `collapse-element-${TEST_ID}`;

const mainElementSelector = Selector(dataTestIdSelector(TEST_ID));

const crumbElementSelector = Selector(dataTestIdSelector(CRUMB));

const getTextView = async () => {
  const elements = Selector(`[data-test-id$="element-${TEST_ID}"]`);
  const count = await elements.count;
  const texts: string[] = [];

  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const text = await element.innerText;
    const isCrumb = (await element.getAttribute('data-test-id')) === CRUMB;
    if (isCrumb) {
      const renderMode = await element.getAttribute('data-render-mode');
      texts.push(`[${renderMode?.toUpperCase()}: ${text}]`);
    } else {
      texts.push(text);
    }
  }

  return texts.join('');
};

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'breadcrumbs',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Breadcrumbs');

test.page(getPage({ storyContainerWidth: '900px' }))('Should be rendered', async t => {
  await t.expect(mainElementSelector.exists).ok();
});

test.page(getPage({ storyContainerWidth: '900px' }))('Should show all items', async t => {
  await t.expect(mainElementSelector.visible).ok();

  await t
    .expect(await getTextView())
    .eql(
      '[FULL: Литература]›[FULL: Стихи]›[FULL: Золотой век русской поэзии]›[FULL: Михаил Лермонтов]›[FULL: Тема "Одиночество"]›[FULL: Парус]',
    );
});

test.page(getPage({ storyContainerWidth: '900px', separator: '-' }))('Should use separator symbol', async t => {
  await t.expect(mainElementSelector.visible).ok();

  await t
    .expect(await getTextView())
    .eql(
      '[FULL: Литература]-[FULL: Стихи]-[FULL: Золотой век русской поэзии]-[FULL: Михаил Лермонтов]-[FULL: Тема "Одиночество"]-[FULL: Парус]',
    );
});

test.page(getPage({ storyContainerWidth: '700px' }))('Should short some items', async t => {
  await t.expect(mainElementSelector.visible).ok();

  await t
    .expect(await getTextView())
    .eql(
      '[FULL: Литература]›[FULL: Стихи]›[SHORTLABEL: Золотой век]›[FULL: Михаил Лермонтов]›[FULL: Тема "Одиночество"]›[FULL: Парус]',
    );
});

// skip flacky test
// selector found 11 elements, but it should be 9
test.skip.page(getPage({ storyContainerWidth: '400px' }))('Should collapse some items', async t => {
  await t.expect(mainElementSelector.visible).ok();

  await t
    .expect(await getTextView())
    .eql('[FULL: Литература]›...›[ELLIPSIS: Михаил Лермонтов]›[ELLIPSIS: Тема "Одиночество"]›[FULL: Парус]');
});

test.page(getPage({ storyContainerWidth: '900px', storyOnClick: true }))('Should handle clicks', async t => {
  await t.expect(Selector(dataTestIdSelector(CRUMB_CLICK_HOLDER)).innerText).eql('');
  await t.click(crumbElementSelector.nth(0));
  await t.expect(Selector(dataTestIdSelector(CRUMB_CLICK_HOLDER)).innerText).eql('Литература');
  await t.click(crumbElementSelector.nth(1));
  await t.expect(Selector(dataTestIdSelector(CRUMB_CLICK_HOLDER)).innerText).eql('Стихи');
  await t.click(crumbElementSelector.nth(2));
  await t.expect(Selector(dataTestIdSelector(CRUMB_CLICK_HOLDER)).innerText).eql('Золотой век русской поэзии');
});

test.page(getPage({ storyContainerWidth: '900px', storyUrl: true }))('Should use a tag', async t => {
  await t
    .expect(crumbElementSelector.nth(0).find('a').getAttribute('href'))
    .eql('https://yandex.ru/search?text=%D0%9B%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0');
  await t
    .expect(crumbElementSelector.nth(1).find('a').getAttribute('href'))
    .eql('https://yandex.ru/search?text=%D0%A1%D1%82%D0%B8%D1%85%D0%B8');
  await t
    .expect(crumbElementSelector.nth(2).find('a').getAttribute('href'))
    .eql(
      'https://yandex.ru/search?text=%D0%97%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9%20%D0%B2%D0%B5%D0%BA%20%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%B9%20%D0%BF%D0%BE%D1%8D%D0%B7%D0%B8%D0%B8',
    );
  await t
    .expect(crumbElementSelector.nth(3).find('a').getAttribute('href'))
    .eql(
      'https://yandex.ru/search?text=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%20%D0%9B%D0%B5%D1%80%D0%BC%D0%BE%D0%BD%D1%82%D0%BE%D0%B2',
    );
});

test.page(getPage({ storyContainerWidth: '900px', storyOnClick: true }))('Should handle last item click', async t => {
  await t.click(crumbElementSelector.nth(5));
  await t.expect(Selector(dataTestIdSelector(CRUMB_CLICK_HOLDER)).innerText).eql('Парус');
});

test.page(getPage({ storyContainerWidth: '900px', storyOnClick: true, inactiveLastItem: true }))(
  "Should't handle last item click because of inactiveLastItem = true",
  async t => {
    await t.click(crumbElementSelector.nth(5));
    await t.expect(Selector(dataTestIdSelector(CRUMB_CLICK_HOLDER)).innerText).eql('');
  },
);
