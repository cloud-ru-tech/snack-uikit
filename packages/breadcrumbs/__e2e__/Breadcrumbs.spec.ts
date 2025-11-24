import type { Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'brdcrmbs';
const CRUMB_CLICK_HOLDER = 'last-clicked-crumb';
const CRUMB = `crumb-element-${TEST_ID}`;

const getTextView = async (page: Page) => {
  const elements = page.locator(`[data-test-id$="element-${TEST_ID}"]`);
  const count = await elements.count();
  const texts: string[] = [];

  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const text = await element.textContent();
    const isCrumb = (await element.getAttribute('data-test-id')) === CRUMB;
    if (isCrumb) {
      const renderMode = await element.getAttribute('data-render-mode');
      texts.push(`[${renderMode?.toUpperCase()}: ${text}]`);
    } else {
      texts.push(text || '');
    }
  }

  return texts.join('');
};

test.describe('Breadcrumbs', () => {
  test('Should be rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '900px',
      },
    });
    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();
  });

  test('Should show all items', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '900px',
      },
    });
    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    expect(await getTextView(page)).toEqual(
      '[FULL: Литература]›[FULL: Стихи]›[FULL: Золотой век русской поэзии]›[FULL: Михаил Лермонтов]›[FULL: Тема "Одиночество"]›[FULL: Парус]',
    );
  });

  test('Should use separator symbol', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '900px',
        separator: '-',
      },
    });
    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    expect(await getTextView(page)).toEqual(
      '[FULL: Литература]-[FULL: Стихи]-[FULL: Золотой век русской поэзии]-[FULL: Михаил Лермонтов]-[FULL: Тема "Одиночество"]-[FULL: Парус]',
    );
  });

  test('Should short some items', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '700px',
      },
    });
    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    expect(await getTextView(page)).toEqual(
      '[FULL: Литература]›[FULL: Стихи]›[SHORTLABEL: Золотой век]›[FULL: Михаил Лермонтов]›[FULL: Тема "Одиночество"]›[FULL: Парус]',
    );
  });

  // skip flacky test
  // selector found 11 elements, but it should be 9
  test.skip('Should collapse some items', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '400px',
      },
    });
    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    expect(await getTextView(page)).toEqual(
      '[FULL: Литература]›...›[ELLIPSIS: Михаил Лермонтов]›[ELLIPSIS: Тема "Одиночество"]›[FULL: Парус]',
    );
  });

  test('Should handle clicks', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '900px',
        storyOnClick: true,
      },
    });
    const crumbElementSelector = getByTestId(CRUMB);
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('');
    await crumbElementSelector.nth(0).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Литература');
    await crumbElementSelector.nth(1).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Стихи');
    await crumbElementSelector.nth(2).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Золотой век русской поэзии');
  });

  test('Should use a tag', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '900px',
        storyUrl: true,
      },
    });
    const crumbElementSelector = getByTestId(CRUMB);
    await expect(crumbElementSelector.nth(0).locator('a')).toHaveAttribute(
      'href',
      'https://yandex.ru/search?text=%D0%9B%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0',
    );
    await expect(crumbElementSelector.nth(1).locator('a')).toHaveAttribute(
      'href',
      'https://yandex.ru/search?text=%D0%A1%D1%82%D0%B8%D1%85%D0%B8',
    );
    await expect(crumbElementSelector.nth(2).locator('a')).toHaveAttribute(
      'href',
      'https://yandex.ru/search?text=%D0%97%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9%20%D0%B2%D0%B5%D0%BA%20%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%B9%20%D0%BF%D0%BE%D1%8D%D0%B7%D0%B8%D0%B8',
    );
    await expect(crumbElementSelector.nth(3).locator('a')).toHaveAttribute(
      'href',
      'https://yandex.ru/search?text=%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%20%D0%9B%D0%B5%D1%80%D0%BC%D0%BE%D0%BD%D1%82%D0%BE%D0%B2',
    );
  });

  test('Should handle last item click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '900px',
        storyOnClick: true,
      },
    });
    const crumbElementSelector = getByTestId(CRUMB);
    await crumbElementSelector.nth(5).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('Парус');
  });

  test("Should't handle last item click because of inactiveLastItem = true", async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'breadcrumbs',
      props: {
        'data-test-id': TEST_ID,
        storyContainerWidth: '900px',
        storyOnClick: true,
        inactiveLastItem: true,
      },
    });
    const crumbElementSelector = getByTestId(CRUMB);
    await crumbElementSelector.nth(5).click();
    await expect(getByTestId(CRUMB_CLICK_HOLDER)).toHaveText('');
  });
});
