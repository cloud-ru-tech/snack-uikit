import { expect, test } from '../../../playwright/fixtures';
import { chipChoiceCommonTests, createChipGetStory, getComponent, VALUES_LABELS } from './utils/chipChoice';

const getStory = createChipGetStory('single');

test.describe('ChipChoice.Single', () => {
  test('should render with "defaultValue" and click on clearButton removes it', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ defaultValue: VALUES_LABELS[0].value }));
    const { chip, value, label, clearButton } = getComponent(getByTestId);

    await expect(chip).toBeVisible();
    await expect(label).toBeVisible();
    await expect(value).toBeVisible();

    await expect(value).toHaveText(VALUES_LABELS[0].label);

    await clearButton.click();

    await expect(value).toHaveText('All');
  });

  test('should change value by option selection', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory());
    const { chip, value, getOption } = getComponent(getByTestId);

    await expect(value).toHaveText(VALUES_LABELS[0].label);

    await chip.click();
    await getOption(VALUES_LABELS[2].value).click();

    await expect(value).toHaveText(VALUES_LABELS[2].label);
  });

  test('should not change value by selecting option and chance by approve click', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(getStory({ useDefaultValue: false, autoApply: false }));
    const { footer, chip, value, getOption, cancelButton, approveButton } = getComponent(getByTestId);

    await chip.click();
    await expect(footer).toBeVisible();

    await getOption(VALUES_LABELS[2].value).click();
    await expect(value).toHaveText('All');

    await cancelButton.click();
    await chip.click();

    await expect(getOption(VALUES_LABELS[2].value)).not.toHaveAttribute('data-checked', 'true');

    await getOption(VALUES_LABELS[1].value).click();

    await approveButton.click();
    await expect(value).toHaveText(VALUES_LABELS[1].label);
  });

  chipChoiceCommonTests(getStory, 'single');
});
