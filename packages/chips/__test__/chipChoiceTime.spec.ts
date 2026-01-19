import { expect, test } from '../../../playwright/fixtures';
import { chipChoiceCommonTests, createChipGetStory, getComponent } from './utils/chipChoice';

const getStory = createChipGetStory('time');

test.describe('ChipChoice.Time', () => {
  test('should render with "defaultValue" and click on clearButton removes it', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ useDefaultValue: true }));
    const { chip, value, label, clearButton } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(label).toBeVisible();
    await expect(value).toBeVisible();

    await expect(value).toHaveText('20:15:30');

    await clearButton.click();

    await expect(value).toHaveText('All');
  });

  test('[mode="date-time", showSeconds=false] should render with value as hh:mm', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(getStory({ useDefaultValue: true, showSeconds: false }));
    const { chip, value } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(value).toBeVisible();

    await expect(value).toHaveText('20:15');
  });

  chipChoiceCommonTests(getStory, 'time');
});
