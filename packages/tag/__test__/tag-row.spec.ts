import { expect, Locator, test } from '../../../playwright/fixtures';
import { TAG_ROW_TEST_IDS } from '../src/components/TagRow/constants';
import { generateFakeTags } from '../stories/utils';

const TEST_ID = 'tag-row-test';
const CLOSE_BUTTON_DATA_TEST_ID = 'tag-remove-button';
const DEMO_TAGS_PARAMS = { amountToGenerate: 50, char: 'x', charLimit: 5, includeTooltip: false } as const;

function getDemoTagLabel(index: number): string {
  return generateFakeTags({ ...DEMO_TAGS_PARAMS, amountToGenerate: index })[index - 1].label;
}

function getDemoTagsAfterRemoving(removedLabel: string) {
  return generateFakeTags(DEMO_TAGS_PARAMS).filter(tag => tag.label !== removedLabel);
}

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

  async function assertTruncatedTags(
    getByTestId: (testId: string) => Locator,
    totalTags: number,
    labelPrefix = 'More: ',
  ) {
    await expect(getVisibleTagsWrapper(getByTestId)).toBeVisible();
    const moreButton = getMoreTagsButton(getByTestId);
    await expect(moreButton).toBeVisible();

    await expect
      .poll(
        async () => {
          const visibleTagsCount = await getAmountOfVisibleTags(getByTestId);
          const hiddenCount = Number((await moreButton.textContent())?.replace(labelPrefix, '') ?? 0);

          return visibleTagsCount > 0 && visibleTagsCount + hiddenCount === totalTags
            ? { visibleTagsCount, hiddenCount }
            : null;
        },
        { timeout: 15000 },
      )
      .not.toBeNull();

    const visibleTagsCount = await getAmountOfVisibleTags(getByTestId);
    const hiddenCount = Number((await moreButton.textContent())?.replace(labelPrefix, '') ?? 0);

    expect(visibleTagsCount + hiddenCount).toEqual(totalTags);

    return { visibleTagsCount, hiddenCount, moreButton };
  }

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
    const { hiddenCount, moreButton } = await assertTruncatedTags(getByTestId, 50);

    await expect(getTagCloudWrapper(getByTestId)).not.toBeVisible();
    expect(await moreButton.textContent()).toEqual(`More: ${hiddenCount}`);

    await moreButton.hover();

    await expect(getTagCloudWrapper(getByTestId)).toBeVisible();
    expect(await getAmountOfCloudTags(getByTestId)).toEqual(hiddenCount);
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
    const { hiddenCount, moreButton } = await assertTruncatedTags(getByTestId, 50);

    await expect(getTagCloudWrapper(getByTestId)).not.toBeVisible();
    expect(await moreButton.textContent()).toEqual(`More: ${hiddenCount}`);

    await moreButton.hover();

    await expect(getTagCloudWrapper(getByTestId)).toBeVisible();
    expect(await getAmountOfCloudTags(getByTestId)).toEqual(hiddenCount);
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

    const { hiddenCount, moreButton } = await assertTruncatedTags(getByTestId, 50, 'test');
    expect(await moreButton.textContent()).toEqual(`test${hiddenCount}`);
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

    const { hiddenCount, moreButton } = await assertTruncatedTags(getByTestId, 50);

    await moreButton.hover();
    expect(await getAmountOfCloudTags(getByTestId)).toEqual(hiddenCount);

    const ninthVisibleTagText1 = await getNinthVisibleTagText(getByTestId);
    expect(ninthVisibleTagText1).toEqual(getDemoTagLabel(9));

    const ninthVisibleTag = getNinthVisibleTag(getByTestId);
    await ninthVisibleTag.click();
    await getTagDeleteButton(ninthVisibleTag).click();

    const tagsAfterFirstDelete = getDemoTagsAfterRemoving(getDemoTagLabel(9));
    const { hiddenCount: hiddenCountAfterFirstDelete, visibleTagsCount: visibleTagsCountAfterFirstDelete } =
      await assertTruncatedTags(getByTestId, 49);

    expect(await getNinthVisibleTagText(getByTestId)).toEqual(tagsAfterFirstDelete[8].label);

    await moreButton.hover();
    expect(await getAmountOfCloudTags(getByTestId)).toEqual(hiddenCountAfterFirstDelete);
    const expectedFirstCloudTagAfterFirstDelete = tagsAfterFirstDelete[visibleTagsCountAfterFirstDelete].label;
    await expect(getFirstCloudTag(getByTestId).locator('span').first()).toHaveText(
      expectedFirstCloudTagAfterFirstDelete,
    );

    const firstCloudTag = getFirstCloudTag(getByTestId);
    const firstCloudTagLabel = await getFirstCloudTagText(getByTestId);
    await firstCloudTag.click();
    await getTagDeleteButton(firstCloudTag).click();

    const tagsAfterSecondDelete = tagsAfterFirstDelete.filter(tag => tag.label !== firstCloudTagLabel);
    const { hiddenCount: hiddenCountAfterSecondDelete, visibleTagsCount: visibleTagsCountAfterSecondDelete } =
      await assertTruncatedTags(getByTestId, 48);

    await expect(getFirstCloudTag(getByTestId).locator('span').first()).toHaveText(
      tagsAfterSecondDelete[visibleTagsCountAfterSecondDelete].label,
    );

    await moreButton.hover();
    expect(await getAmountOfCloudTags(getByTestId)).toEqual(hiddenCountAfterSecondDelete);
    const firstCloudTagText2 = await getFirstCloudTagText(getByTestId);
    expect(firstCloudTagText2).toEqual(tagsAfterSecondDelete[visibleTagsCountAfterSecondDelete].label);
  });
});
