import { expect, test } from '../../../playwright/fixtures';
import { chipChoiceCommonTests, createChipGetStory, getComponent } from './utils/chipChoice';

const getStory = createChipGetStory('date');

test.describe('ChipChoice.Date', () => {
  test('should render with "defaultValue" and click on clearButton removes it', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ useDefaultValue: true }));
    const { chip, value, label, clearButton } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(label).toBeVisible();
    await expect(value).toBeVisible();

    await expect(value).toHaveText(new Date('2023-10-15').toLocaleDateString('ru-RU'));

    await clearButton.click();

    await expect(value).toHaveText('All');
  });

  test('[mode="month"] should render with value as month.year', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ useDefaultValue: true, mode: 'month' }));
    const { chip, value } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(value).toBeVisible();

    await expect(value).toHaveText(
      new Date('2023-10-15').toLocaleDateString('ru-RU', { year: 'numeric', month: 'numeric', day: undefined }),
    );
  });

  test('[mode="year"] should render with value as year', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ useDefaultValue: true, mode: 'year' }));
    const { chip, value } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(value).toBeVisible();

    await expect(value).toHaveText(
      new Date('2023-10-15').toLocaleDateString('ru-RU', { year: 'numeric', month: undefined, day: undefined }),
    );
  });

  test('[mode="date-time", showSeconds=false] should render with value as day.month.year, hh:mm', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(getStory({ useDefaultValue: true, mode: 'date-time', showSeconds: false }));
    const { chip, value } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(value).toBeVisible();

    await expect(value).toHaveText(
      new Date('2023-10-15').toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
      }),
    );
  });

  chipChoiceCommonTests(getStory, 'date');
});
