import { expect, Locator, test } from '../../../playwright/fixtures';
import { TAG_ROW_TEST_IDS } from '../src/components/TagRow/constants';

const TEST_ID = 'tag-row-test';
const CLOSE_BUTTON_DATA_TEST_ID = 'tag-remove-button';

test.describe('TagRow', () => {
  const getComponent = (getByTestId: (testId: string) => Locator) => getByTestId(TEST_ID);

  const getVisibleTagsWrapper = (getByTestId: (testId: string) => Locator) =>
    getComponent(getByTestId).locator(`[data-test-id="${TAG_ROW_TEST_IDS.visibleTagsWrapper}"]`);
  const getAmountOfVisibleTags = async (getByTestId: (testId: string) => Locator) =>
    getVisibleTagsWrapper(getByTestId).locator('div').count();
  const getNinthVisibleTag = (getByTestId: (testId: string) => Locator) =>
    getVisibleTagsWrapper(getByTestId).locator('div').nth(8);
  const getNinthVisibleTagText = async (getByTestId: (testId: string) => Locator) => {
    const tag = getNinthVisibleTag(getByTestId);
    const label = tag.locator('span').first();
    await expect(label).toBeVisible();
    return await label.textContent();
  };

  const getTagCloudWrapper = (getByTestId: (testId: string) => Locator) =>
    getByTestId(TAG_ROW_TEST_IDS.droplistTagsWrapper);
  const getAmountOfCloudTags = async (getByTestId: (testId: string) => Locator) =>
    getTagCloudWrapper(getByTestId).locator('div').count();
  const getFirstCloudTag = (getByTestId: (testId: string) => Locator) =>
    getTagCloudWrapper(getByTestId).locator('div').first();
  const getFirstCloudTagText = async (getByTestId: (testId: string) => Locator) => {
    const tag = getFirstCloudTag(getByTestId);
    const label = tag.locator('span').first();
    await expect(label).toBeVisible();
    return await label.textContent();
  };

  const getMoreTagsButton = (getByTestId: (testId: string) => Locator) =>
    getVisibleTagsWrapper(getByTestId).locator(`[data-test-id="${TAG_ROW_TEST_IDS.moreButton}"]`);

  const getTagDeleteButton = (selector: Locator) => selector.locator(`[data-test-id="${CLOSE_BUTTON_DATA_TEST_ID}"]`);

  test('Should render all 50 preconfigured demo tags in case no limit is specified', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      group: 'tag',
      name: 'tag-row',
      props: {
        'data-test-id': TEST_ID,
        rowLimit: undefined,
        demoTagsAmount: 50,
      },
    });

    const component = getComponent(getByTestId);

    await expect(component).toBeVisible();
    await expect(getVisibleTagsWrapper(getByTestId)).not.toBeVisible();
    const childCount = await component.locator('div').count();
    expect(childCount).toEqual(50);

    await expect(getByTestId(TAG_ROW_TEST_IDS.moreButton)).not.toBeVisible();
  });

  test('Should render all specified 20 demo tags in case row limit is set to 0', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'tag',
      name: 'tag-row',
      props: {
        'data-test-id': TEST_ID,
        rowLimit: 0,
        demoTagsAmount: 20,
      },
    });

    const component = getComponent(getByTestId);

    await expect(component).toBeVisible();
    await expect(getVisibleTagsWrapper(getByTestId)).not.toBeVisible();
    const childCount = await component.locator('div').count();
    expect(childCount).toEqual(20);

    await expect(getByTestId(TAG_ROW_TEST_IDS.moreButton)).not.toBeVisible();
  });

  test('Should render a single row of tags with more button if the row limit is set to 1. All remaining tags should be available in a droplist once the more button is hovered', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      group: 'tag',
      name: 'tag-row',
      props: {
        'data-test-id': TEST_ID,
        rowLimit: 1,
        demoTagsAmount: 50,
      },
    });

    await expect(getComponent(getByTestId)).toBeVisible();
    await expect(getVisibleTagsWrapper(getByTestId)).toBeVisible();
    const visibleTagsCount = await getAmountOfVisibleTags(getByTestId);
    expect(visibleTagsCount).toEqual(5);

    const moreButton = getMoreTagsButton(getByTestId);
    await expect(moreButton).toBeVisible();

    await expect(getTagCloudWrapper(getByTestId)).not.toBeVisible();
    const buttonText = await moreButton.textContent();
    expect(buttonText).toEqual('More: 45');

    await moreButton.hover();

    await expect(getTagCloudWrapper(getByTestId)).toBeVisible();
    const cloudTagsCount = await getAmountOfCloudTags(getByTestId);
    expect(cloudTagsCount).toEqual(45);
  });

  test('Should render 3 rows of tags with more button if the row limit is set to 3. All remaining tags should be available in a droplist once the more button is hovered', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      group: 'tag',
      name: 'tag-row',
      props: {
        'data-test-id': TEST_ID,
        rowLimit: 3,
        demoTagsAmount: 50,
      },
    });

    await expect(getComponent(getByTestId)).toBeVisible();
    await expect(getVisibleTagsWrapper(getByTestId)).toBeVisible();
    const visibleTagsCount = await getAmountOfVisibleTags(getByTestId);
    expect(visibleTagsCount).toEqual(16);

    const moreButton = getMoreTagsButton(getByTestId);
    await expect(moreButton).toBeVisible();

    await expect(getTagCloudWrapper(getByTestId)).not.toBeVisible();
    const buttonText = await moreButton.textContent();
    expect(buttonText).toEqual('More: 34');

    await moreButton.hover();

    await expect(getTagCloudWrapper(getByTestId)).toBeVisible();
    const cloudTagsCount = await getAmountOfCloudTags(getByTestId);
    expect(cloudTagsCount).toEqual(34);
  });

  test('Should support changing button text', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'tag',
      name: 'tag-row',
      props: {
        'data-test-id': TEST_ID,
        moreButtonLabel: 'test',
      },
    });

    const moreButton = getMoreTagsButton(getByTestId);
    await expect(moreButton).toBeVisible();
    const buttonText = await moreButton.textContent();
    expect(buttonText).toEqual('test39');
  });

  test('Should support deleting tags', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'tag',
      name: 'tag-row',
      props: {
        'data-test-id': TEST_ID,
        removableMode: true,
        demoTagsAmount: 50,
      },
    });

    expect(await getAmountOfVisibleTags(getByTestId)).toEqual(9);
    const moreButton = getMoreTagsButton(getByTestId);
    await expect(moreButton).toHaveText('More: 41');

    await moreButton.hover();
    expect(await getAmountOfCloudTags(getByTestId)).toEqual(41);

    const ninthVisibleTagText1 = await getNinthVisibleTagText(getByTestId);
    expect(ninthVisibleTagText1).toEqual('tag9xxxx');

    const ninthVisibleTag = getNinthVisibleTag(getByTestId);
    await ninthVisibleTag.click();
    await getTagDeleteButton(ninthVisibleTag).click();

    expect(await getNinthVisibleTagText(getByTestId)).toEqual('tag10xxxxx');
    expect(await getAmountOfVisibleTags(getByTestId)).toEqual(9);
    expect(moreButton).toHaveText('More: 40');

    await moreButton.hover();
    const cloudTagsCount2 = await getAmountOfCloudTags(getByTestId);
    expect(cloudTagsCount2).toEqual(40);
    const firstCloudTagText1 = await getFirstCloudTagText(getByTestId);
    expect(firstCloudTagText1).toEqual('tag11x');

    const firstCloudTag = getFirstCloudTag(getByTestId);
    await firstCloudTag.click();
    await getTagDeleteButton(firstCloudTag).click();
    // Wait for the DOM to update after deletion
    await expect(getFirstCloudTag(getByTestId).locator('span').first()).toHaveText('tag12xx');
    const visibleTagsCount3 = await getAmountOfVisibleTags(getByTestId);
    expect(visibleTagsCount3).toEqual(9);
    const buttonText3 = await moreButton.textContent();
    expect(buttonText3).toEqual(`More: 39`);

    await moreButton.hover();
    const cloudTagsCount3 = await getAmountOfCloudTags(getByTestId);
    expect(cloudTagsCount3).toEqual(39);
    const firstCloudTagText2 = await getFirstCloudTagText(getByTestId);
    expect(firstCloudTagText2).toEqual('tag12xx');
  });
});
