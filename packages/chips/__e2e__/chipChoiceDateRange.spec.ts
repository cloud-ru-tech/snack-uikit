import { expect, test } from '../../../playwright/fixtures';
import { chipChoiceCommonTests, createChipGetStory, getComponent } from './utils/chipChoice';

const getStory = createChipGetStory('date-range');

test.describe('ChipChoice.DateRange', () => {
  test('should render with "defaultValue" and click on clearButton removes it', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ useDefaultValue: true }));
    const { chip, value, label, clearButton } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(label).toBeVisible();
    await expect(value).toBeVisible();

    await expect(value).toHaveText('15.10.2022 — 15.10.2023');

    await clearButton.click();

    await expect(value).toHaveText('All');
  });

  chipChoiceCommonTests(getStory, 'date-range');
});
