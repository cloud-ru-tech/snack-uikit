import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/components/constants';

const TEST_ID = 'avatar';
const ABBREVIATION_TEST_ID = 'abbreviation';
const IMAGE_TEST_ID = 'image';
const INDICATOR_TEST_ID = 'indicator';

const nameAndSurname = 'John Smith';
const nameAndSurnameAbbr = 'JS';
const nameOnly = 'John';
const nameOnlyAbbr = 'JO';

const decimalName = '129309';
const decimalAbbr = '12';

test.describe('Avatar', () => {
  test('should render', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    const avatar = getByTestId(TEST_ID);

    await expect(avatar).toBeVisible();
    await expect(avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`)).toBeVisible();
    await expect(avatar.locator(`[data-test-id="${IMAGE_TEST_ID}"]`)).not.toBeVisible();
    await expect(avatar.locator(`[data-test-id="${INDICATOR_TEST_ID}"]`)).not.toBeVisible();
  });

  test('should render with indicator', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        indicator: 'red',
      },
    });
    const avatar = getByTestId(TEST_ID);
    const indicator = avatar.locator(`[data-test-id="${INDICATOR_TEST_ID}"]`);

    await expect(indicator).toBeVisible();
  });

  test('should render with image', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        showImage: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const image = avatar.locator(`[data-test-id="${IMAGE_TEST_ID}"]`);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);

    await expect(image).toBeVisible();
    await expect(abbreviation).not.toBeVisible();
  });

  test('should fallback to abbreviation when the link is broken', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        showImage: true,
        customSrc: 'x',
      },
    });
    const avatar = getByTestId(TEST_ID);
    const image = avatar.locator(`[data-test-id="${IMAGE_TEST_ID}"]`);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);

    await expect(image).not.toBeVisible();
    await expect(abbreviation).toBeVisible();
  });

  test('should render with 1 symbol', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        showTwoSymbols: false,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);
    const text = await abbreviation.textContent();

    expect(text?.length).toEqual(1);
  });

  test('should render with 2 symbols', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        showTwoSymbols: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);
    const text = await abbreviation.textContent();

    expect(text?.length).toEqual(2);
  });

  test('should always render with 1 symbol for size = xxs', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        size: SIZE.Xxs,
        showTwoSymbols: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);
    const text = await abbreviation.textContent();

    expect(text?.length).toEqual(1);
  });

  test('should select first 2 symbols for name only', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        name: nameOnly,
        showTwoSymbols: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);

    await expect(abbreviation).toHaveText(nameOnlyAbbr);
  });

  test('should select 1st symbol of name and 1st symbol of surname when available', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        name: nameAndSurname,
        showTwoSymbols: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);

    await expect(abbreviation).toHaveText(nameAndSurnameAbbr);
  });

  test(`should render first two decimals from ${decimalName}`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'avatar',
      props: {
        'data-test-id': TEST_ID,
        name: decimalName,
        showTwoSymbols: true,
      },
    });
    const avatar = getByTestId(TEST_ID);
    const abbreviation = avatar.locator(`[data-test-id="${ABBREVIATION_TEST_ID}"]`);

    await expect(abbreviation).toHaveText(decimalAbbr);
  });
});
