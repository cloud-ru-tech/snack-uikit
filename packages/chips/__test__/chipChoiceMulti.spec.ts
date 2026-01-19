import { expect, test } from '../../../playwright/fixtures';
import { chipChoiceCommonTests, createChipGetStory, getComponent, LABEL_TEXT, VALUES_LABELS } from './utils/chipChoice';

const getStory = createChipGetStory('multi');

test.describe('ChipChoice.Multi', () => {
  test('should have 0 selected options by default', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ label: LABEL_TEXT, useDefaultValue: false }));
    const { chip, value, label } = getComponent(getByTestId);

    await expect(value).toHaveText('All');
    await expect(label).toHaveText(LABEL_TEXT);

    await chip.click();
  });

  test('should select 2 values by clicking options and click on clear button removes selection', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(getStory({ label: LABEL_TEXT, useDefaultValue: false }));
    const { chip, value, label, getOption, clearButton } = getComponent(getByTestId);

    await chip.click();

    await getOption(VALUES_LABELS[0].value).click();
    await getOption(VALUES_LABELS[1].value).click();

    await expect(value).toHaveText('2/5');
    await expect(label).toHaveText(LABEL_TEXT);

    await clearButton.click();
    await expect(value).toHaveText('All');
  });

  test('should not change value by selecting option and chance by approve click', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(getStory({ useDefaultValue: false, autoApply: false }));
    const { footer, chip, getOption, getOptionCheckbox, value, approveButton, cancelButton } =
      getComponent(getByTestId);

    await chip.click();
    await expect(footer).toBeVisible();

    await getOption(VALUES_LABELS[0].value).click();

    await expect(value).toHaveText('All');

    await cancelButton.click();
    await chip.click();
    await expect(footer).toBeVisible();

    await expect(getOptionCheckbox(VALUES_LABELS[0].value)).not.toBeChecked();

    await getOption(VALUES_LABELS[0].value).click();
    await getOption(VALUES_LABELS[1].value).click();

    await approveButton.click();
    await expect(value).toHaveText('2/5');
  });

  chipChoiceCommonTests(getStory, 'multi');
});
