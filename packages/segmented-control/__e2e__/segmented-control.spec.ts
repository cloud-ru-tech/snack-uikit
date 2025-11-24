import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  main: 'SegmentedControl',
  selectedSegment: 'selected-segment',
  section1: 'section-1',
  section2: 'section-2',
  section4: 'section-4',
  section5: 'section-5',
};

test.describe('SegmentedControl', () => {
  test('Show segmented control', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'segmented-control',
      props: {
        'data-test-id': TEST_IDS.main,
      },
    });
    await expect(getByTestId(TEST_IDS.main)).toBeVisible();
  });

  test('Should select segment after click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'segmented-control',
      props: {
        'data-test-id': TEST_IDS.main,
      },
    });
    await expect(getByTestId(TEST_IDS.section1)).toHaveAttribute('data-active', 'true');
    await expect(await getByTestId(TEST_IDS.section2).getAttribute('data-active')).toBeNull();
    await expect(await getByTestId(TEST_IDS.selectedSegment).textContent()).toEqual('1');

    await getByTestId(TEST_IDS.section2).click();

    await expect(await getByTestId(TEST_IDS.section1).getAttribute('data-active')).toBeNull();
    await expect(getByTestId(TEST_IDS.section2)).toHaveAttribute('data-active', 'true');
    await expect(await getByTestId(TEST_IDS.selectedSegment).textContent()).toEqual('2');
  });

  test('Should not select segment after click to disabled element', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'segmented-control',
      props: {
        'data-test-id': TEST_IDS.main,
      },
    });
    await expect(getByTestId(TEST_IDS.section1)).toHaveAttribute('data-active', 'true');
    await expect(await getByTestId(TEST_IDS.section4).getAttribute('data-active')).toBeNull();
    await expect(await getByTestId(TEST_IDS.selectedSegment).textContent()).toEqual('1');

    await getByTestId(TEST_IDS.section4).click({ force: true });

    await expect(getByTestId(TEST_IDS.section1)).toHaveAttribute('data-active', 'true');
    await expect(await getByTestId(TEST_IDS.section4).getAttribute('data-active')).toBeNull();
    await expect(await getByTestId(TEST_IDS.selectedSegment).textContent()).toEqual('1');
  });

  test('Should select segment after press tab arrow right and enter', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'segmented-control',
      props: {
        'data-test-id': TEST_IDS.main,
      },
    });
    await expect(getByTestId(TEST_IDS.section1)).toHaveAttribute('data-active', 'true');
    await expect(await getByTestId(TEST_IDS.section2).getAttribute('data-active')).toBeNull();
    await expect(await getByTestId(TEST_IDS.selectedSegment).textContent()).toEqual('1');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await expect(await getByTestId(TEST_IDS.section1).getAttribute('data-active')).toBeNull();
    await expect(getByTestId(TEST_IDS.section2)).toHaveAttribute('data-active', 'true');
    await expect(await getByTestId(TEST_IDS.selectedSegment).textContent()).toEqual('2');
  });

  test('Should skip disabled segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'segmented-control',
      props: {
        'data-test-id': TEST_IDS.main,
      },
    });
    await expect(getByTestId(TEST_IDS.section1)).toHaveAttribute('data-active', 'true');
    await expect(await getByTestId(TEST_IDS.section5).getAttribute('data-active')).toBeNull();
    await expect(await getByTestId(TEST_IDS.selectedSegment).textContent()).toEqual('1');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await expect(await getByTestId(TEST_IDS.section1).getAttribute('data-active')).toBeNull();
    await expect(getByTestId(TEST_IDS.section5)).toHaveAttribute('data-active', 'true');
    await expect(await getByTestId(TEST_IDS.selectedSegment).textContent()).toEqual('5');
  });
});
